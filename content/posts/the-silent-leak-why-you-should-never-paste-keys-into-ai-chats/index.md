---
title: "The Silent Leak: Why You Should Never Paste Keys into AI Chats"
description: "What actually happens when you paste an API key or secret into GitHub Copilot, Claude, or Cursor — and why your AI coding assistant might already be reading your .env file."
date: 2026-02-18T16:59:37+10:00
lastmod: 2026-02-18T16:59:37+10:00
draft: true
resources:
- name: "featured-image"
  src: "featured-image.jpg"
- name: "featured-image-preview"
  src: "featured-image-preview.jpg"
tags: ["security", "ai", "copilot", "secrets", "devops", "claude", "cursor"]
categories: ["Security"]
---

You're debugging a failing API call. Frustrated, you paste your key straight into the chat with GitHub Copilot or Claude to get a faster answer. Feels harmless, right? It's not. And the problem goes deeper than you think — your AI assistant might already be reading your `.env` file without you even knowing.

<!--more-->

## The Obvious Risk: Pasting Secrets into Chat

Let's start with the explicit case. You open GitHub Copilot Chat, Claude Code, or Cursor and type something like:

```
Why is this key not working? Here it is: sk-abc123...
```

The moment you hit Enter, a few things happen simultaneously and none of them are great.

**Your chat history stores that prompt locally.** In VS Code, Copilot's chat history is persisted in a local JSON file in your workspace or user data directory. Anyone with access to your machine — or your project directory if synced — can read it. That includes your secret, in plain text, indefinitely until you manually delete the session.

**Your prompt travels to a remote API.** GitHub Copilot, Claude, and similar tools are cloud-backed. Your prompt — including that secret — is sent over HTTPS to their inference infrastructure. For Copilot Business and Enterprise, GitHub's policy states they do not use prompts to train base models, but interaction data *is* collected for telemetry, abuse prevention, and service improvement. That data lives somewhere that isn't your machine.

**Your key might get echoed back.** AI assistants use your conversation context to generate suggestions. If you paste a key in session and later ask "show me how to call this API," the model has that key in its context window and could include it verbatim in a code suggestion — which you might then commit.

## The Non-Obvious Risk: Your AI Already Reads Your Files

This is the part most people miss.

Modern AI coding assistants don't just respond to what you explicitly type. They actively index and read your workspace to provide better context. **GitHub Copilot reads open files, recently viewed files, and in some configurations the entire workspace.** Claude Code explicitly crawls your project directory. Cursor indexes your codebase for its RAG (retrieval-augmented generation) pipeline.

That means if you have a `.env.local`, `.env`, or `config/secrets.yaml` sitting in your project — even if you haven't opened it, even if you haven't mentioned it — there's a good chance your AI assistant has already read it and is using it as context.

Here's what that looks like in practice:

```bash
# .env.local — never added to chat, never mentioned
OPENAI_API_KEY=sk-abc123...
DATABASE_URL=postgresql://admin:password@prod-db.internal/app
```

Copilot sees this file as part of the workspace context. It may use those values when generating code suggestions. The assistant is trying to be helpful — but it's doing so with your production credentials in its context window.

## What Happens Under the Hood

To make this concrete, here's the rough data flow when you use an AI coding assistant:

{{< mermaid >}}
graph LR
    A[Your IDE / Editor] -->|Prompt + workspace context| B[AI Provider API]
    B -->|Completion / suggestion| A
    A -->|Stored locally| C[Chat history]
    B -->|Retained for telemetry| D[Provider logs]
{{< /mermaid >}}

The key point: **workspace context** is bundled with your prompt automatically. Depending on the tool, this includes open files, recently edited files, relevant files detected by the assistant's indexer, and — critically — files that match patterns the tool considers useful, like `.env*`.

Different tools handle this differently:

| Tool | Workspace context behaviour |
|---|---|
| **GitHub Copilot** | Reads open tabs + relevant files from workspace index. Enterprise can configure content exclusions. |
| **Claude Code** | Crawls the full project directory when invoked. Explicit about it in docs. |
| **Cursor** | Indexes the entire codebase for RAG. Respects `.cursorignore`. |
| **Codeium / Continue** | Varies — typically open files + embeddings of the repo. |

## The Real Risks, Summarised

- **Local exposure**: Chat history stored unencrypted in your workspace directory, readable by anyone with filesystem access.
- **Cloud telemetry**: Prompts sent to vendor APIs; retention policies vary and are often opaque.
- **Implicit context leakage**: `.env` files read silently as workspace context, their values potentially embedded in generated code.
- **Commit exposure**: Secrets that make it into AI-suggested code snippets can get committed and pushed — at which point GitHub secret scanning is your last line of defence.
- **Supply chain risk**: If AI-generated code containing a secret ends up in a shared library, Docker image, or CI pipeline, the blast radius grows significantly.

## How to Protect Yourself

**Never paste secrets into chat.** Full stop. If you need to debug an auth issue, redact the key (`sk-abc1...` or `<REDACTED>`) and describe the structure instead. The AI doesn't need the actual value to help you.

**Use a `.gitignore` that actually covers your secret files.**

```gitignore
.env
.env.*
.env.local
*.pem
*_rsa
secrets/
```

**Add a `.copilotignore` or `.cursorignore`** to your repo root to prevent your AI assistant from indexing sensitive files:

```
# .copilotignore / .cursorignore
.env
.env.*
secrets/
infra/credentials/
```

**For Claude Code**, there's no ignore file — instead, add `permissions.deny` rules to `.claude/settings.json` in your project. Commit this file so the whole team gets the same protection:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)"
    ]
  }
}
```

**Enable GitHub secret scanning and push protection** on every repository — personal and organisational. Push protection blocks commits containing known secret patterns before they ever hit the remote.

```shell
# Via GitHub CLI — enable push protection on a repo
gh api repos/{owner}/{repo} --method PATCH \
  -f security_and_analysis.secret_scanning_push_protection.status=enabled
```

**Use pre-commit hooks** to catch secrets before they even reach Git:

```shell
pip install detect-secrets
detect-secrets scan > .secrets.baseline
```

Then add this to your `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
```

**Revoke immediately if you slipped.** If you pasted a key into chat, treat it as compromised. Rotate it now, before finishing reading this post.

## How Your Tools Already Help (If You Let Them)

GitHub has built several layers of protection that are opt-in or need configuration:

- **Secret scanning**: Scans every push for 200+ secret patterns (API keys, tokens, connection strings). Free for public repos, available for private repos on Advanced Security.
- **Push protection**: Blocks the push entirely if a secret is detected. No second chances needed.
- **Copilot content exclusions**: In Copilot Business/Enterprise, admins can exclude specific files or paths from being sent as context to the Copilot API. Configure it in your organisation's Copilot policy settings.
- **`.copilotignore`**: Works like `.gitignore` but tells Copilot which files to skip during workspace indexing.

Claude Code uses `permissions.deny` in `.claude/settings.json` to block file reads — no separate ignore file. Cursor respects `.cursorignore`. Use them.

## Final Thoughts

AI coding assistants are genuinely useful — but they're also deeply integrated into your development environment in ways that aren't always visible. They read files you haven't opened, they send context you haven't consciously composed, and they store conversations you'll forget about in a week.

Secrets don't belong in chat. They don't belong in files your AI assistant can read without restriction. And if one slips through, your tools can catch it — but only if you've set them up to do so.

Treat every AI chat session the same way you'd treat a public Slack channel. Because in terms of where that data goes, it's not that different.


{{< admonition info References >}}
- [GitHub Copilot data privacy](https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features/responsible-use-of-github-copilot-chat-in-your-ide)
- [GitHub secret scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- [GitHub push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection)
- [Claude Code security](https://code.claude.com/docs/en/security)
- [Claude Code settings & excluding sensitive files](https://code.claude.com/docs/en/settings)
- [Cursor privacy & indexing](https://docs.cursor.com/context/codebase-indexing)
- [detect-secrets](https://github.com/Yelp/detect-secrets)
- [GitGuardian: Secrets in AI-generated code](https://blog.gitguardian.com/secrets-in-ai-generated-code/)
{{< /admonition >}}
