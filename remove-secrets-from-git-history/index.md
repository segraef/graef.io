# Secrets hide in your Git history, even after you delete them


You committed an API key by accident. You notice, delete the line, commit again, and push. Crisis averted, right? No. That key is still sitting in your git history, one `git log -p` away from anyone who clones the repo. A new commit only adds a layer on top. It never removes the old one.

<!--more-->

## Why deleting the line does nothing

Git is a chain of snapshots. When you "delete" a secret in a later commit, the earlier commit that introduced it stays untouched in the object database. Anyone can check it out:

```bash
git log -p --all -S "sk-" | head
git show <old-commit>:config/secrets.yaml
```

If the repo is public, assume the secret is already harvested. Bots scan every public push within seconds. The line being gone from `HEAD` is irrelevant.

{{< admonition danger "Do this first" >}}
**Rotate the secret before anything else.** Rewriting history is cleanup, not containment. The moment a key hits a remote, treat it as compromised. Revoke it, issue a new one, and only then worry about scrubbing the history.
{{< /admonition >}}

<!-- TODO: optional polished art to replace the mermaid below -->

{{< mermaid >}}
graph LR
    C1[Commit 1: add secret] --> C2[Commit 2: delete the line]
    C2 --> C3["HEAD: secret looks gone"]
    C1 -.->|still readable via git log / checkout| S[("Secret lives in history")]
{{< /mermaid >}}

## The order of operations

There is a sequence here and skipping a step leaves you exposed.

1. **Rotate the credential.** Revoke the leaked one at the provider. This is the only step that protects you.
2. **Remove it from history.** Rewrite the repo so the secret never existed.
3. **Force-push the rewritten history.** Overwrite the remote.
4. **Get collaborators to re-clone.** Old clones still contain the secret.
5. **Ask the host to purge caches.** On GitHub, old commits remain reachable by SHA until garbage collected.

## Removing it: git filter-repo

The old advice was `git filter-branch`. Do not use it. It is slow and the Git project itself recommends `git filter-repo` instead.

Install it:

```bash
# Any platform with Python:
pip install git-filter-repo

# macOS:    brew install git-filter-repo
# Windows:  scoop install git-filter-repo   (or: choco install git-filter-repo)
```

The `git` commands that follow are identical on macOS, Linux (zsh/bash), and Windows (PowerShell).

To strip a file that should never have been committed:

```bash
git filter-repo --path config/secrets.yaml --invert-paths
```

To replace a secret string everywhere it appears across all history, create a `replacements.txt`:

```
sk-abc123myleakedkey==>REMOVED
```

Then run:

```bash
git filter-repo --replace-text replacements.txt
```

Every occurrence of that string in every commit becomes `REMOVED`. The file stays, the secret is gone from the entire history.

{{< admonition warning Note >}}
`git filter-repo` rewrites every commit hash from the first affected commit onward. This is a destructive, history-changing operation. Work on a fresh clone and confirm the result before you force-push.
{{< /admonition >}}

## The alternative: BFG Repo-Cleaner

If you prefer a single command for the common cases, BFG is faster and simpler, though less flexible.

```bash
bfg --replace-text replacements.txt my-repo.git
bfg --delete-files secrets.yaml my-repo.git
```

BFG never touches your latest commit (it assumes `HEAD` is already clean), which is exactly why you must delete the secret in the working tree first.

## Force-push and clean up

After rewriting, overwrite the remote:

```bash
git push --force --all
git push --force --tags
```

Then expire local references and garbage collect so the loose objects go away:

```bash
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

On GitHub, the rewritten commit can still be reachable by its old SHA for a while, and forks keep their own copies. Open a support request to have stale references purged if the secret was sensitive.

<!-- TODO: screenshot of GitHub showing a commit still accessible by SHA after history rewrite, illustrating why support purge / rotation matters -->

## Stop it happening again

Cleanup is the expensive path. Prevention is cheap.

- Add a pre-commit hook with [gitleaks](https://github.com/gitleaks/gitleaks) or [git-secrets](https://github.com/awslabs/git-secrets) to block commits containing key patterns.
- Enable **GitHub Push Protection** and secret scanning on the repo. It rejects pushes that contain known secret formats before they ever land.
- Keep secrets in a `.env` file that is in `.gitignore`, and load them at runtime. Never hardcode.

```bash
# .gitignore
.env
.env.local
*.pem
config/secrets.yaml
```

{{< admonition quote "" >}}
A secret in git history is not gone until you rewrite history and rotate the key. Everything else is theatre.
{{< /admonition >}}

{{< admonition tip "One command for all of this" >}}
[SecKit](../seckit-portable-security-preflight-kit/) does the prevention in one step: `seckit harden` drops in the pre-commit hook and gitleaks config, and `seckit scan` sweeps the repo with gitleaks and trufflehog so a secret already in history surfaces before someone else finds it.
{{< /admonition >}}

{{< admonition info References >}}
- [git filter-repo](https://github.com/newren/git-filter-repo)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [GitHub: Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [The Silent Leak: Why You Should Never Paste Keys into AI Chats](../the-silent-leak-why-you-should-never-paste-keys-into-ai-chats/)
- [SecKit: A Portable Security Pre-flight Kit](../seckit-portable-security-preflight-kit/)
{{< /admonition >}}

