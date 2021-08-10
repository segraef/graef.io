# How to install Azure CLI


Let's keep it easy with these one-liner's you can use for Windows as well as Linux to install or update Azure CLI.

<!--more-->

### One-liner to install or update Azure CLI on Windows 10
```powershell
# One-liner to install or update Azure CLI on Windows 10
iwr https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi; start msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'; rm .\AzureCLI.msi
```

{{< image src="2021-08-07_111616.png" caption="." >}}

Following PowerShell Cmdlet aliases were used
- ***iwr** = [Invoke-WebRequest](https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-WebRequest?view=powershell-7.1)
- ***start** = [Start-Process](https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Start-Process?view=powershell-7.1)
- ***rm** = [Invoke-WebRequest](https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-WebRequest?view=powershell-7.1)

For more details on aliases see [How to get a list of PowerShell Aliases](../get-powershell-aliases/)

{{< admonition tip >}}

You can verify your Azure CLI version with `az --version`

{{< /admonition >}}

{{< image src="2021-08-07_111617.png" caption="." >}}

### One-liner to install or update Azure CLI on Linux
```bash
# One-liner to install or update Azure CLI on Linux
curl -L https://aka.ms/InstallAzureCli | bash
```

{{< image src="2021-08-07_111615.png" caption="." >}}

{{< admonition tip >}}
The script can also be downloaded and run locally. <br>
You may have to restart your shell in order for changes to take effect.
{{< /admonition >}}

{{< admonition info References >}}
<!---
:(far fa-bookmark fa-fw): Bookmark this page for easy future reference!
--->
- [Installing various versions of PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7)
- [How to install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli)
- [Install the Azure CLI on Linux](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt)
{{< /admonition >}}

