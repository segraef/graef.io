---
title: "Continously Deploy Your Github Pages Site With Github Actions"
description: ""
date: 2021-08-16T09:10:44+08:00
lastmod: 2021-08-16T09:10:44+08:00
draft: true
resources:
- name: "featured-image"
  src: "featured-image.jpg"
- name: "featured-image-preview"
  src: "featured-image-preview.jpg"
tags: ["automation", "scripts", "powershell", "posh", "pwsh", "windows"]
categories: ["Other"]
---

Host site on GitHub Pages + GitHub Actions
repo model
- (draft in private > action makes hugo > moves to main in public repo): drafts are not seen and md's are private
- single public repo: draft branch > action makes hugo > moves to main branch

screenshots
show git push and then how action spins up and creates new version

<!--more-->

`brew install hugo`

config.toml

{{< admonition info References >}}
- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
{{< /admonition >}}
