---
title: "How to Install KB Hotfixes only if they are not installed"
description: ""
date: 2017-04-02T11:20:43+08:00
lastmod: 2017-04-02T11:20:43+08:00
draft: false
resources:
- name: "featured-image"
  src: "featured-image.png"
- name: "featured-image-preview"
  src: "featured-image-preview.png"
tags: ["Automation", "scripts", "PowerShell", "posh", "pwsh", "Windows"]
categories: ["Scripts", "PowerShell", "Windows Server"]
toc: false
---

 I just wanted to share you a tiny snippet if you’re looking for a simple PowerShell liner to simply get a KB Hotfix installed. It also verifies if the KB is installed already.

 <!--more-->

```powershell
$SourceFolder = "C:\Software"
$KB = "KB2999226"

if (-not (Get-Hotfix -Id $KB)) {
    Start-Process -FilePath "wusa.exe" -ArgumentList "$SourceFolder\Windows8.1-KB2999226-x64.msu /quiet /norestart" -Wait
} else {
    Write-Host "$KB already installed."
}
```

Okay this is a small one for you guys but trust me I will wrap it for you into a big function if you want to use it with more than one server or even Credentials.


