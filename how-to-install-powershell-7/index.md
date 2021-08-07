# How to install and update Azure PowerShell 7


Let's keep it easy with these one-liner's you can use for Windows as well as Linux.

<!--more-->

### One-liner to install or update PowerShell 7 on Windows 10

```powershell
# One-liner to install or update PowerShell 7 on Windows 10

iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI"
```
{{< figure src="2021-08-07_111612.png" >}}

{{< figure src="2021-08-07_111613.png" >}}

### One-liner to install or update PowerShell 7 on Linux

```powershell
# One-liner to install or update PowerShell 7 on Linux
wget https://aka.ms/install-powershell.sh; sudo bash install-powershell.sh; rm install-powershell.sh
```

{{< figure src="2021-08-07_111614.png" >}}

### Install PowerShell 7 using winget

```powershell
# Install PowerShell 7 using winget
winget install PowerShell
```
{{< admonition tip >}}

You can start your PowerShell 7 session with `pwsh`

{{< /admonition >}}

{{< figure src="2021-08-07_111615.png" >}}

{{< admonition list References >}}

- [Installing various versions of PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7)
- [How to install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli)

{{< /admonition >}}

