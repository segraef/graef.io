---
title: "Resolve-DnsNames: Resolve DNS or IP for multiple Computers"
description: ""
date: 2017-09-10T11:47:24+08:00
lastmod: 2017-09-10T11:47:24+08:00
draft: false
resources:
- name: "featured-image"
  src: "featured-image.png"
- name: "featured-image-preview"
  src: "featured-image-preview.png"
tags: ["Automation", "scripts", "PowerShell", "posh", "pwsh", "Windows", "DNS", "IP", "dnsforward", "dnsreverse"]
categories: ["Windows Server", "Windows"]
toc: false
---

Respective Microsoft's Technet article regarding `Resolve-DnsName` I have created a function with the ability to run it against more than only one computer. `Resolve-DnsNames` performs a DNS name query resolution for the specified name.

```powershell
Function Resolve-DnsNames
{
<#
.SYNOPSIS
    Resolves IP or DNS name for one or more computers.

.DESCRIPTION
    Resolves IP or DNS name for one or more computers.

.PARAMETER ComputerName
    A single Computer or an array of computer names. The default is localhost ($env:COMPUTERNAME).

.PARAMETER IPAddress
    Commit IPAddress to resolve.

.PARAMETER Verbose
    Run in Verbose Mode.

.EXAMPLE
    PS C:> Resolve-DnsNames graef.io

    Name                                           Type   TTL   Section    IPAddress
    ----                                           ----   ---   -------    ---------
    graef.io                                       AAAA   86336 Answer     2a01:488:42:1000:50ed:84e8:ff91:1f91
    graef.io                                       A      86336 Answer     80.237.132.232


.EXAMPLE
	PS C:> Resolve-DnsNames 80.237.132.232

    Name                           Type   TTL   Section    NameHost
    ----                           ----   ---   -------    --------
    232.132.237.80.in-addr.arpa    PTR    40292 Answer     graef.io

.EXAMPLE
    PS C:> Resolve-DnsNames -ComputerName (Get-Content C:ServerList.txt)

.LINK

Home


.NOTES
    Author:  Sebastian Gräf
    Email:   sebastian@graef.io
    Date:    September 10, 2017
    PSVer:   2.0/3.0/4.0/5.0
#>

	[Cmdletbinding()]
	Param (
		[Parameter(
				   Mandatory = $false,
				   ValueFromPipeline = $true,
				   ValueFromPipelineByPropertyName = $true)]
		[string[]]$ComputerName = $Env:COMPUTERNAME
	)

	Begin
	{
		Write-Verbose " [$($MyInvocation.InvocationName)] :: Start Process"
        $ProgressCounter = 0
        $array=@()
	}

	Process
	{
        foreach ($Computer in $ComputerName)
		{
            $ProgressCounter++
			Write-Progress -activity "Running on $Computer" -status "Please wait ..." -PercentComplete (($ProgressCounter / $ComputerName.length) * 100)
				Write-Verbose " [$($MyInvocation.InvocationName)] :: Processing $Computer"
				try
				{
                    $Resolution = Resolve-DnsName $Computer -ErrorAction SilentlyContinue
                    $obj = New-Object PSObject
                    $obj | Add-Member NoteProperty ComputerName ($Computer)
                    $obj | Add-Member NoteProperty Name ($Resolution.Name)
                    $obj | Add-Member NoteProperty Type ($Resolution.Type)
                    $obj | Add-Member NoteProperty TTL ($Resolution.TTL)
                    $obj | Add-Member NoteProperty Section ($Resolution.Section)
                    $obj | Add-Member NoteProperty NameHost ($Resolution.NameHost)
                    $obj | Add-Member NoteProperty IPAddress ($Resolution.IPAddress)
                    $array += $obj

				}
				catch
				{
					Write-Verbose " Host [$Computer] Failed with Error: $($Error[0])"
				}
	    }
        $array | ft
    }
	End
	{
		Write-Verbose " [$($MyInvocation.InvocationName)] :: End Process"
	}
}
```

{{< admonition info References >}}
- [Resolve-DnsName](https://docs.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname?view=windowsserver2019-ps)
{{< /admonition >}}
