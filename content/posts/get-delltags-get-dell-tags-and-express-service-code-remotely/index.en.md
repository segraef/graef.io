---
title: "Get-DellTags: Get Dell Tags and Express Service Code remotely"
description: ""
date: 2017-08-15T11:40:27+08:00
lastmod: 2017-08-15T11:40:27+08:00
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

Get DELL Tag and Express Service Code remotely for more than one computer.

<!--more-->

You can also commit different credentials for a specific domain.
The below function Get-DellTags retrieves serials remotely from your machines. With the help of the function ConvertSerial the serial gets converted into a DELL Express Service Code on the fly.

```powershell
Function Get-DellTags
{
<#
.SYNOPSIS
    Retrieves the serial on a local or remote computer using Invoke-Command and converts into a DELL Express Service Code.

.DESCRIPTION
    Gets the PowerShell version on a local or remote computer using Invoke-Command.

.PARAMETER ComputerName
    A single Computer or an array of computer names. The default is localhost ($env:COMPUTERNAME).

.PARAMETER Credentials
    Commit PSCredential object or using Get-Credentials.

.PARAMETER Verbose
    Run in Verbose Mode.

.EXAMPLE
    PS C:> Get-DellTags -ComputerName Server01

    ComputerName    DellTag ExpressServiceCode URL
    ------------    ------- ------------------ ---
    Server01        FV9SAX4        34542623560 https://www.dell.com/support/home/us/en/19/product-support/servicetag/FV9SAX4/Research

.EXAMPLE
	PS C:> Get-DellTags -ComputerName Server01,Server02 -Credentials Get-Credentials

.EXAMPLE
    PS C:> Get-DellTags -ComputerName (Get-Content C:ServerList.txt)

.LINK

Home


.NOTES
    Author:  Sebastian Gräf
    Email:   sebastian@graef.io
    Date:    September 9, 2017
    PSVer:   2.0/3.0/4.0/5.0
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
					## If you want to use WMI
                    #$DellServiceTag = Get-WmiObject Win32_Bios -Credential $Credentials -ComputerName $Computer

                    ## If you want to use CIM
                    #$DellServiceTag = Get-CimInstance Win32_Bios -Credential $Credentials -ComputerName $Computer

                    $DellServiceTag = Invoke-Command -Computername $Computer -Scriptblock { Get-CimInstance Win32_Bios } -Credential $Credentials
					ConvertDellSerial $DellServiceTag.serialnumber
					$DellTags = @()
					$WMIObject = New-Object PSObject
					$WMIObject | add-member Noteproperty ComputerName $Computer -Force
					$WMIObject | add-member Noteproperty DellTag $DellServiceTag.serialnumber -Force
					$WMIObject | add-member Noteproperty ExpressServiceCode $Serial -Force
					$WMIObject | add-member Noteproperty URL "https://www.dell.com/support/home/us/en/19/product-support/servicetag/$($DellServiceTag.serialnumber)/Research" -Force
					$DellTags += $WMIObject
					$DellTags
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

```powershell
Function ConvertSerial
{
<#
.SYNOPSIS
    Converts DELL Tag Serial into a DELL Express Service Code.

.DESCRIPTION
    Converts DELL Tag Serial into a DELL Express Service Code.

.PARAMETER Serial
    Commit serial string.

.LINK

Home


.NOTES
    Author:  Sebastian Gräf
    Email:   ps@graef.io
    Date:    September 9, 2017
    PSVer:   2.0/3.0/4.0/5.0
#>
	param ($Serial)
	$36Base = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	$SerialLength = $Serial.length
	$Script:DellServiceCode = 0
	for ($x = 0; $x -lt $SerialLength; $x++)
	{
		for ($y = 0; $y -lt 36; $y++)
		{
			if ($Serial.substring($x, 1) -eq $36Base.substring($y, 1))
			{
				$answer = (($y) * ([math]::pow(36, $SerialLength - $x - 1)))
				$Script:DellServiceCode += $answer
			}
		}
	}
}
```
