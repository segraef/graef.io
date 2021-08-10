# How to Install KB Hotfixes only if they are not installed


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



