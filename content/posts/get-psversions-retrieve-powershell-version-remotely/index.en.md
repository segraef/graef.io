---
title: "Get-PSVersions: Retrieve Powershell version remotely"
description: ""
date: 2017-09-22T11:51:06+08:00
lastmod: 2017-09-22T11:51:06+08:00
draft: false
resources:
- name: "featured-image"
  src: "featured-image.png"
- name: "featured-image-preview"
  src: "featured-image-preview.png"
tags: ["Automation", "scripts", "PowerShell", "posh", "pwsh", "Windows"]
categories: ["Scripts", "PowerShell", "Windows Server", "Windows"]
toc: false
---

Okay at the end it’s a simple `$PSVersion` wrapped in an `Invoke-Command` but hey these simple things are needful in case you need to run it against of 100s of servers and not just locally. With the help of `Invoke-Command` via WinRM and `$PSVersionTable.psversion` wrapped in a foreach you can retrieve PowerShell version of your remote computers indifferent if you need to use credentials to run it against a different domain than you currently reside. Just use the below function `Get-PSVersions`, simple but good.

```powershell
Function Get-PSVersions
{
<#
.SYNOPSIS
    Gets the PowerShell version on a local or remote computer using Invoke-Command.

.DESCRIPTION
    Gets the PowerShell version on a local or remote computer using Invoke-Command.

.PARAMETER ComputerName
    A single Computer or an array of computer names. The default is localhost ($env:COMPUTERNAME).

.PARAMETER Credentials
    Commit PSCredential object or using Get-Credentials.

.PARAMETER Verbose
    Run in Verbose Mode.

.EXAMPLE
    PS C:> Get-PSVersions -ComputerName Server01,Server02

    Major  Minor  Build  Revision PSComputerName
    -----  -----  -----  -------- --------------
    5      1      14393  1066     Server01
    5      1      14393  1066     Server02

.EXAMPLE
    PS C:> Get-PSVersions -ComputerName Server01,Server02 -Credentials Get-Credentials

.EXAMPLE
    PS C:> Get-PSVersions -ComputerName (Get-Content C:ServerList.txt)

.LINK
    <blockquote class="wp-embedded-content" data-secret="55AoiBUWnd"><a href="https://graef.io/">Home</a></blockquote><iframe title="“Home” — Sebastian Gräf" class="wp-embedded-content" sandbox="allow-scripts" security="restricted" style="position: absolute; clip: rect(1px, 1px, 1px, 1px);" src="https://graef.io/embed/#?secret=55AoiBUWnd" data-secret="55AoiBUWnd" width="600" height="338" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>

.NOTES
    Author:  Sebastian Gräf
    Email:   ps@graef.io
    Date:    September 9, 2017
    PSVer:   3.0/4.0/5.0
#>

    [Cmdletbinding()]
    Param (
        [Parameter(
                   Mandatory = $false,
                   ValueFromPipeline = $true,
                   ValueFromPipelineByPropertyName = $true)]
        [string[]]$ComputerName = $Env:COMPUTERNAME,
        [Parameter(
                   ValueFromPipelineByPropertyName = $true,
                   Mandatory = $false,
                   ValueFromPipeline = $true)]
        [Alias(
               'PSCredential'
               )]
        [ValidateNotNull()]
        [System.Management.Automation.PSCredential]
        [System.Management.Automation.Credential()]
        $Credentials = [System.Management.Automation.PSCredential]::Empty
    )

    Begin
    {
        Write-Verbose " [$($MyInvocation.InvocationName)] :: Start Process"
        $ProgressCounter = 0
    }

    Process
    {
        foreach ($Computer in $ComputerName)
        {
            $ProgressCounter++
            Write-Progress -activity "Running on $Computer" -status "Please wait ..." -PercentComplete (($ProgressCounter / $ComputerName.length) * 100)
            if (Test-Connection $Computer)
            {
                Write-Verbose " [$($MyInvocation.InvocationName)] :: Processing $Computer"
                try
                {
                    $PSVersion = Invoke-Command -Computername $Computer -Scriptblock { $PSVersionTable.psversion } -Credential $Credentials
                    $PSVersion
                }
                catch
                {
                    Write-Verbose " Host [$Computer] Failed with Error: $($Error[0])"
                }
            }
            else
            {
                Write-Verbose " Host [$Computer] Failed Connectivity Test "
            }
        }
    }
    End
    {
        Write-Verbose " [$($MyInvocation.InvocationName)] :: End Process"
    }
}
```

While processing your list of computers a nice Write-Progress will give you some details about the status:

{{< image src="2021-08-10-11-52-04.png" caption="." >}}

Once finished your output will look like this:

{{< image src="featured-image-preview.png" caption="." >}}


