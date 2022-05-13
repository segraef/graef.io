# Fresh Development Setup within 10 Minutes using Winget


Sometimes you have to setup your Laptop/Notebook fresh and also prepare your developer environment and tools you need. I noticed this again today when I rebooted my machine and spent almost 2 hours installing the tools I need to work.

I have put together a list of commands you can use to prepare your environment using Windows Package Manager (WinGet) for you which gives you a kick start at the next reset and you can continue working directly after 10 minutes.

<!--more-->

# Prerequisites

Windows 11 (If Windows 10 then [install winget via App Installer](https://docs.microsoft.com/en-us/windows/package-manager/winget/#install-winget) first) 

# Commands

```pwsh
# Azure Tools
winget install Microsoft.AzureStorageExplorer
winget install Microsoft.Bicep
winget install Microsoft.AzureCLI

# PowerShell 7
winget install Microsoft.PowerShell

# Windows Terminal (if on Windows 10)
winget install Microsoft.WindowsTerminal

# Git and GitHub CLI
winget install Git.Git
winget install GitHub.cli
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com

# Azure PowerShell
pwsh (Make sure to start your terminal session with PowerShell 7)
Install-Module Az

# Visual Code Extensions

code --install-extension eamodio.gitlens 
code --install-extension ms-azuretools.vscode-bicep
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode-remote.remote-containers
code --install-extension ms-vscode-remote.remote-ssh
code --install-extension ms-vscode-remote.remote-wsl
code --install-extension ms-vscode.azurecli
code --install-extension ms-vscode.powershell

```

# Other Commands 

```pwsh
# Chocolatey
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Hugo
choco install hugo -confirm

# AzCopy
Invoke-WebRequest -Uri "https://aka.ms/downloadazcopy-v10-windows" -OutFile AzCopy.zip -UseBasicParsing
Expand-Archive ./AzCopy.zip ./AzCopy -Force
mkdir "$home/AzCopy"
Get-ChildItem ./AzCopy/*/azcopy.exe | Move-Item -Destination "$home\AzCopy\AzCopy.exe"
$userenv = [System.Environment]::GetEnvironmentVariable("Path", "User")
[System.Environment]::SetEnvironmentVariable("PATH", $userenv + ";$home\AzCopy", "User")

# Other Visual Code Extensions
code --install-extension AzurePolicy.azurepolicyextension
code --install-extension ms-azuretools.vscode-azureresourcegroups
code --install-extension ms-azuretools.vscode-azurestorage
code --install-extension ms-azuretools.vscode-azurevirtualmachines
code --install-extension ms-dotnettools.vscode-dotnet-runtime
code --install-extension ms-vscode-remote.remote-ssh-edit
code --install-extension ms-vscode-remote.remote-ssh-explorer
code --install-extension ms-vscode-remote.vscode-remote-extensionpack
code --install-extension ms-vscode.azure-account
code --install-extension ms-vscode.vscode-node-azure-pack
code --install-extension ms-vsliveshare.vsliveshare
code --install-extension ms-vsonline.vsonline
code --install-extension msazurermtools.azurerm-vscode-tools

```

<!---
:(far fa-bookmark fa-fw): Bookmark this page for easy future reference!
--->
{{< admonition info References >}}
- [Install winget via App Installer](https://docs.microsoft.com/en-us/windows/package-manager/winget/#install-winget)
- [](https://example.com)
{{< /admonition >}}

