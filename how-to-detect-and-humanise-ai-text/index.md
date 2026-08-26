# How to detect AI text, and how to humanise it (without lying)


You wrote the post yourself. Sunday morning, two coffees, no assistant. On Monday a reader pastes it into an AI detector, it lights up red, and now you are in a comment thread defending your own sentences. Or the reverse: you used an LLM for a first draft and it reads like every other LLM draft, smooth, confident, and dead. Both problems have the same root, and neither is solved by the "undetectable AI humanizer" tools the internet keeps selling you.

<!--more-->

## How detectors work

Detectors do not read your text. They measure its shape.

- **Perplexity.** How surprising each next word is to a language model. An LLM picks the likely word every time, so its output is smooth and predictable. Nobody writes like that.
- **Burstiness.** How much sentence length and rhythm swing. People write a long sentence, then a short one. Models hold a steady beat. GPTZero built its product on this pair (Tian, 2023).
- **Stylometry.** Fingerprints in syntax, punctuation, and word choice. Kobak et al. tracked more than 14 million PubMed abstracts and found that `delves`, `underscores`, `intricate`, and `pivotal` jumped after ChatGPT shipped. At least 10 percent of 2024 abstracts show LLM assistance, from vocabulary alone.
- **Trained classifiers.** A model trained on labelled human and AI samples. OpenAI's own detector was one of these.
- **Watermarking.** The generator biases its own token choices toward a secret list so the text can be checked later. Works only if the vendor watermarks and you hold the key.

| Approach | What it measures | Breaks when |
|---|---|---|
| Perplexity + burstiness (GPTZero, ZeroGPT) | Predictability and rhythm | Text is short, formulaic, or by a non-native writer |
| Probability curvature (DetectGPT) | How the score shifts under small edits | One paraphrase pass |
| Trained classifier (OpenAI, retired) | Whatever the training set taught it | The next model release |
| Excess vocabulary (Kobak et al.) | Word frequency drift across a corpus | A single document; the author edits the words |
| Watermarking (Kirchenbauer, SynthID-Text) | A hidden token bias planted at generation | Paraphrase, or any model that does not watermark |

## Why they fail

Here is the part the vendors leave off the box.

- **One paraphrase breaks them.** Sadasivan et al. (2023) paraphrased AI text once and re-ran DetectGPT. AUROC dropped from 96.5 to 25.2. Worse than a coin flip. The same paper proves a ceiling: as models improve, the best possible detector trends toward random guessing. That is maths, not an engineering gap someone closes next quarter.
- **They punish non-native writers.** Liang et al. (2023) fed 91 TOEFL essays by non-native English speakers to seven popular detectors. On average 61 percent were flagged as AI, and 98 percent were flagged by at least one detector. The same detectors got US eighth-grade essays almost perfectly right. Simpler vocabulary reads as "machine" to a perplexity model.
- **The biggest vendor gave up.** OpenAI shut down its own classifier in July 2023, citing low accuracy.

Microsoft's own explainer says the same thing more politely: detectors "work best with predictable, low-complexity text", they "mislabel human writing as machine-generated, especially when the author is a non-native English speaker", and results are "most helpful when paired with human judgment."

A detector score is a hint. It is never a verdict. Anyone failing a student or firing a writer on the strength of one is flipping a coin and calling it evidence.

## What Microsoft says

Microsoft has two Copilot 101 pages on this. Read fairly, they say:

- **Detectors** look at perplexity, burstiness, lexical diversity, uniform sentence structure, and stylometric "fingerprints" in syntax and punctuation.
- **Humanisers** "add natural tone and variation": emotional language, personal reflections, varied sentence flow, "light imperfections", and "natural pauses".
- **To humanise by hand**, mix long and short sentences, lead with the point, swap `utilize` and `commence` for plain words, replace vague phrases with specifics, cut `in order to`, `basically`, and `just`, read it aloud, and keep paragraphs to three or four sentences.
- **Free humaniser tools** are "not always accurate". Treat their output as a draft and edit it.
- **Humanising "doesn't replace disclosure where it's required."**

Most of that is decent editing advice. The word-level tips miss the point, though. The tell is uniformity, not vocabulary. Even sentence lengths, even hedging, the same shapes resolved the same way, paragraph after paragraph. Swap `delve` for `explore` across a whole document and you get a uniform humaniser dialect, which is a machine fingerprint with a different accent. The signature moved. It did not leave.

{{< admonition info "The one thing to remember" >}}
Detectors key on flat rhythm, predictable words, formulaic structure, and filler. Those are the same things that make writing bad. Fix the writing and the score follows, for the same reason. You never need to game anything.
{{< /admonition >}}

## How to humanise, honestly

A word-swap script on its own gives you text that is clean and still sterile, and sterile is as detectable as slop. The approach that holds up is a hybrid. Every mature open-source tool I looked at converged on it:

1. **Deterministic pass first.** Fix everything with one correct answer. Fast, free, idempotent, no hallucination.
2. **One scoped rewrite.** You, or an LLM under strict rules, fix rhythm and structure. Single pass. It adds no facts. An invented specific reads convincingly human, which makes it more dangerous than the vague phrase it replaced.
3. **Deterministic scan at the end.** Catch anything the rewrite let back in.

{{< mermaid >}}
flowchart LR
    A[Markdown in] --> B[Protect code, shortcodes, front matter]
    B --> C[Auto-fix: typography, dashes, filler, boilerplate]
    C --> D[Score: burstiness, CoV, TTR, slop density]
    D --> E[Single rewrite: rhythm and structure, no new facts]
    E --> F[Final scan: no dashes crept back, re-score]
{{< /mermaid >}}

What the deterministic pass fixes safely:

- **Em and en dashes in prose** become a comma, full stop, or parentheses. Numeric ranges (page 12 to 15, the years 2018 to 2026) are protected.
- **Curly quotes** become straight quotes.
- **Zero-width characters**, soft hyphens, and non-breaking spaces are deleted.
- **Chatbot boilerplate.** `Certainly!`, `Great question!`, `I hope this helps`, and knowledge-cutoff disclaimers. Zero legitimate uses in a blog post.
- **Verbose filler with one answer.** `in order to` becomes `to`, `utilize` becomes `use`, `due to the fact that` becomes `because`.

What it only flags, because the right fix depends on meaning:

- **AI vocabulary.** `delve`, `tapestry`, `pivotal`, `crucial`. `robust` is fine in a statistics paper. Frequency is the tell, not the word.
- **Negative parallelism.** `it's not just X, it's Y`. Say what it is.
- **Copula avoidance** and trailing significance clauses. `serves as a testament to` means `shows`. `..., underscoring its importance` gets deleted.
- **Significance inflation.** `marks a pivotal moment`, `plays a crucial role`. State the effect or cut it.

{{< admonition warning "Do not fabricate, do not over-correct" >}}
Never add a fact, number, or quote the source did not contain. And do not sand off real voice: specific details, mixed feelings, dry asides, a sentence that runs long because the thought did. Those swings are the signal you want to keep.
{{< /admonition >}}

## The tool

I put this into a small open-source tool: [segraef/humaniser](https://github.com/segraef/humaniser). Plain Python, no dependencies, 3.9 or newer, macOS, Linux, or Windows. It is markup-aware, so it never touches front matter, code blocks, inline code, shortcodes, HTML tags, links, or URLs.

**macOS / Linux (zsh/bash)**:

```bash
git clone https://github.com/segraef/humaniser.git && cd humaniser
python3 humanise.py path/to/post.md             # report only: fixes it would make, flags, scores
python3 humanise.py path/to/post.md --fix       # apply the safe fixes in place
python3 humanise.py content/posts --check       # whole directory, exit 1 if anything reads as AI
python3 detector.py path/to/post.md             # local rhythm + vocabulary score, 0 to 100
```

**Windows (PowerShell)**:

```powershell
git clone https://github.com/segraef/humaniser.git; cd humaniser
python3 .\humanise.py path\to\post.md --fix
python3 .\humanise.py content\posts --check
python3 .\detector.py path\to\post.md
```

`--latest N` narrows a directory to its newest posts by front-matter date, so `python3 humanise.py --latest 5 content/posts --fix` cleans the five newest instead of your whole archive. `--check` is the one you wire into pre-commit or CI.

The rewrite half is a `SKILL.md` for Claude Code, Copilot, or Cursor. It reads the script's flags, does one scoped pass plus a self-audit, refuses to invent facts, and scans its own output for dashes before it returns.

Here is `detector.py` on this post, the one you are reading:

```
content/posts/how-to-detect-and-humanise-ai-text/index.md
  AI likelihood: 4.4/100  -> likely human
  burstiness 0.75 | CoV 0.88 | TTR 0.47 | trigram-rep 0.01 | slop 1.5/1000w
```

`humanise.py` caught my own filler while I wrote this. Good.

## Do not use it to lie

- **Editing for quality is editing.** Hiding authorship is something else.
- **Disclose where it matters.** School, journalism, legal, anywhere a policy asks. Cleaning up the prose does not cancel that obligation. Microsoft says the same, and they are selling the thing.
- **Skip the evasion tricks.** Homoglyphs, zero-width characters, deliberate typos. Every serious normaliser strips them (the watermarking reference code ships a homoglyph canoniser and a Unicode sanitiser), and they make the text worse for the humans you wrote it for.

## Final Thoughts

An AI detector is a breathalyser that goes off on mouthwash and misses the vodka after one paraphrase. Useful as a hint. Worthless as evidence. Do not let one decide anything that matters.

The fix for AI-sounding text is the fix for bad text: vary the rhythm, cut the filler, say the concrete thing, keep your voice. Do that and the detectors go quiet on their own. Do it to hide who wrote it and you have a smoother lie, which is still a lie.

{{< admonition info References >}}
- [Microsoft Copilot 101: Undetectable AI and humanizers](https://www.microsoft.com/en-us/microsoft-copilot/copilot-101/undetectable-ai-humanizers)
- [Microsoft Copilot 101: How to humanize AI text](https://www.microsoft.com/en-us/microsoft-copilot/copilot-101/humanize-ai-text)
- [Sadasivan et al. 2023, Can AI-Generated Text be Reliably Detected? (arXiv:2303.11156)](https://arxiv.org/abs/2303.11156)
- [Liang et al. 2023, GPT Detectors Are Biased Against Non-Native English Writers (arXiv:2304.02819)](https://arxiv.org/abs/2304.02819)
- [Kobak et al. 2024, Delving into ChatGPT usage in academic writing through excess vocabulary (arXiv:2406.07016)](https://arxiv.org/abs/2406.07016)
- [Tian 2023, GPTZero](https://gptzero.me/)
- [segraef/humaniser](https://github.com/segraef/humaniser)
- [blader/humanizer](https://github.com/blader/humanizer)
- [The Silent Leak: Why You Should Never Paste Keys into AI Chats](../the-silent-leak-why-you-should-never-paste-keys-into-ai-chats/)
{{< /admonition >}}

