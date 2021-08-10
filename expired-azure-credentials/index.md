# Expired Azure credentials


In case you get this error below, this error is mostly due to outdated Modules or at least in this case the AzureRM module.

<!--more-->

Your Azure credentials have not been set up or have expired, please run Login-AzureRMAccount to set up your Azure credentials.

{{< image src="2017-10-26_13-06-21.png" caption="." >}}

Easily go ahead and update your PowerShell or Azure PowerShell Modules to the latest version 4.4.0 and it should be gone.
You can do this while easily using Update-Module or just go ahead and use Install-Module AzureRm -Force
