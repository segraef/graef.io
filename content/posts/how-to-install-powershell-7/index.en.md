---
title: "How to install and update Azure PowerShell 7"
description: ""
date: 2021-03-06
lastmod: 2021-03-06
draft: false
resources:
- name: "featured-image-preview"
  src: "2021-08-07_111615.png"
tags: ["TIL", "Azure", "PowerShell", "posh", "pwsh", "winget"]
categories: ["TIL", "Azure"]
toc: true
---

Let's keep it easy with these one-liner's you can use for Windows as well as Linux.

<!--more-->

### One-liner to install or update PowerShell 7 on Windows 10

```powershell
# One-liner to install or update PowerShell 7 on Windows 10

iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI"
```
{{< image src="2021-08-07_111612.png" caption="." >}}

{{< image src="2021-08-07_111613.png" caption="." >}}

### One-liner to install or update PowerShell 7 on Linux

```powershell
# One-liner to install or update PowerShell 7 on Linux
wget https://aka.ms/install-powershell.sh; sudo bash install-powershell.sh; rm install-powershell.sh
```

{{< image src="2021-08-07_111614.png" caption="." >}}

### Install PowerShell 7 using winget

```powershell
# Install PowerShell 7 using winget
winget install PowerShell
```
{{< admonition tip >}}

You can start your PowerShell 7 session with `pwsh`

{{< /admonition >}}

{{< image src="2021-08-07_111615.png" caption="." >}}

{{< admonition list References >}}

- [Installing various versions of PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7)
- [How to install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli)

{{< /admonition >}}
