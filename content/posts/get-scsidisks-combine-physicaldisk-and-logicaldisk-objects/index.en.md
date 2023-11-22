---
title: "Get-ScsiDisks: Combine Physicaldisk and Logicaldisk Objects"
description: ""
date: 2017-08-10T11:48:24+08:00
lastmod: 2017-08-10T11:48:24+08:00
draft: false
resources:
- name: "featured-image-preview"
  src: "featured-image-preview.png"
tags: ["Automation", "scripts", "PowerShell", "posh", "pwsh", "Windows", "SCSI"]
categories: ["Windows", "Windows Server"]
toc: false
---

Hi there, following function `Get-ScsiDisks` retrieves disk details for VMWare Guests or any computer with corresponding SCSI disk details like SCSI ID and SCSI Bus. The function concatenates objects consisting of `Win32_DiskDrive`, `Win32_LogicalDisk` and `Win32_DiskDriveToDiskPartition` using WMI. For WinRM you can use Invoke-Command and inject the script.

```powershell
Function Get-ScsiDisks
{
<#
.SYNOPSIS
    Retrieves disk details for VMWare Guests with corresponding SCSI disk details like SCSI ID
    and SCSI Bus.

.DESCRIPTION
    Retrieves a concatenated object consisting of Win32_DiskDrive, Win32_LogicalDisk and
    Win32_DiskDriveToDiskPartition using WMI. For WinRM you can use Invoke-Command and inject the script.

.PARAMETER ComputerName
    A single Computer or an array of computer names. The default is localhost ($env:COMPUTERNAME).

.PARAMETER Credentials
    Commit Credentials for a different domain.

.PARAMETER Verbose
    Run in Verbose Mode.

.EXAMPLE
    PS C:> Get-ScsiDisks

    ComputerName    Disk               DriveLetter VolumeName  Size FreeSpace DiskModel
    ------------    ----               ----------- ----------  ---- --------- ---------
    SERVER          \.PHYSICALDRIVE1 D:          Data         767       767 VMware Virtual di...
    SERVER          \.PHYSICALDRIVE0 C:          OS            59        39 VMware Virtual di...

.EXAMPLE
	PS C:> Get-ScsiDisks | Out-GridView

.EXAMPLE
	PS C:> Get-ScsiDisks | ft -a

.EXAMPLE
	PS C:> Get-ScsiDisks -ComputerName (gc 'C:VMs.txt') -Credentials Get-Credential

.LINK

Home


.NOTES
    Author:  Sebastian Gräf
    Email:   ps@graef.io
    Date:    September 12, 2017
    PSVer:   3.0/4.0/5.0
#>

	[Cmdletbinding()]
	Param (
		[Parameter(ValueFromPipelineByPropertyName = $true, ValueFromPipeline = $true)]
		$ComputerName = $Env:COMPUTERNAME,
		[Parameter(ValueFromPipelineByPropertyName = $true, ValueFromPipeline = $true)]
		[ValidateNotNull()]
		[System.Management.Automation.PSCredential][System.Management.Automation.Credential()]
		$Credentials = [System.Management.Automation.PSCredential]::Empty
	)

	Begin
	{
		Write-Verbose " [$($MyInvocation.InvocationName)] :: Start Process"
		$result=@()
		$ProgressCounter = 0
	}


	Process
	{
		foreach ($Computer in $ComputerName)
		{
			$ProgressCounter++
			Write-Progress -activity "Running on $Computer" -status "Please wait ..." -PercentComplete (($ProgressCounter / $ComputerName.length) * 100)
			if (Test-Connection $Computer -Count 1 -Quiet)
			{
				Write-Verbose " [$($MyInvocation.InvocationName)] :: Processing $Computer"
				try
				{
					Get-WmiObject -Class Win32_DiskDrive -ComputerName $Computer -Credential $Credentials | % {
						$disk = $_
						$partitions = "ASSOCIATORS OF " +
						"{Win32_DiskDrive.DeviceID='$($disk.DeviceID)'} " +
						"WHERE AssocClass = Win32_DiskDriveToDiskPartition"
						Get-WmiObject -Query $partitions -ComputerName $Computer -Credential $Credentials | % {
							$partition = $_
							$drives = "ASSOCIATORS OF " +
							"{Win32_DiskPartition.DeviceID='$($partition.DeviceID)'} " +
							"WHERE AssocClass = Win32_LogicalDiskToPartition"
							Get-WmiObject -Query $drives -ComputerName $Computer -Credential $Credentials | % {
								$obj = New-Object -Type PSCustomObject -Property @{
									ComputerName = $Computer
									Disk = $disk.DeviceID
									DiskSize = [math]::Truncate($disk.Size / 1GB);
									DiskModel = $disk.Model
									Partition = $partition.Name
									DriveLetter = $_.DeviceID
									VolumeName = $_.VolumeName
									Size = [math]::Truncate($_.Size / 1GB)
									FreeSpace = [math]::Truncate($_.FreeSpace / 1GB)
									SCSIBus = $disk.SCSIBus
									SCSITargetId = $disk.SCSITargetId
								}
								$result += $obj
							}
						}
					}
				}
				catch
				{
					Write-Verbose " Host [$Computer] Failed with Error: $($Error[0])"
				}
			}
			else
			{
				Write-Verbose " Host [$Computer] Failed Connectivity Test"
			}
		}
        $result | select ComputerName,Disk,DriveLetter,VolumeName,Size,FreeSpace,DiskModel,Partition,SCSIBus,SCSITargetId
	}
	End
	{
		Write-Progress -activity "Running on $Computer" -Status "Completed." -Completed
		Write-Verbose " [$($MyInvocation.InvocationName)] :: End Process"
	}
}
```
