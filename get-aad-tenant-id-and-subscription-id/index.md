# Get Azure Active Directoy Tenant ID and Subscription ID


## Requirements

### Install the Azure PowerShell

```powershell
Install-Module -Name Az -AllowClobber -Scope CurrentUser
```

## Get Tenant and Subscription Details during Login
To get your Tenant ID / Name and Subscription ID / Name you have several options with PowerShell, one option is using

```powershell
Connect-AzAccount
```

which directly gives you your default Subscription Name as well as your default Tenant ID after logging in.

## Get Tenant and Subscription details from the Context

Another option is using

```powershell
Get-AzContext | Select-Object *
```

which gets the metadata used to authenticate Azure Resource Manager requests.

Some more details you get with

```powershell
Get-Aztenant
```

which gets tenants that are authorized for your current user.

{{< admonition info References >}}
- [Install Azure PowerShell](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps)
- [Connect-AzAccount](https://docs.microsoft.com/en-us/powershell/module/az.accounts/connect-azaccount?view=azps-5.5.0)
- [Get-AzContext](https://docs.microsoft.com/en-us/powershell/module/az.accounts/get-azcontext?view=azps-5.5.0)
- [Get-AzTenant](https://docs.microsoft.com/en-us/powershell/module/az.accounts/get-aztenant?view=azps-5.5.0)
{{< /admonition >}}
