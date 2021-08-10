# Simulate-Activity: Simulate user mouse and keyboard input with PowerShell


If you want to avoid or block coming up your screensaver locally or remotely, take this nice script.

<!--more-->

It will move your mouse cursor and presses space every minute to simulate user activity.
This all happens with the help of `Wscript.Shell` for sending a key press and `System.Windows.Forms.Cursor` for moving the cursor for 1 pixel.

```powershell
Function Simulate-Activity
{
<#
.SYNOPSIS
    Simulates Mouse and Keyboard Activity to avoid Screensaver coming up.

.DESCRIPTION
    Simulates Mouse and Keyboard Activity to avoid Screensaver coming up.

.PARAMETER Minutes
    Commit minutes for simulating activity. If no string given you will be asked.

.PARAMETER Verbose
    Run in Verbose Mode.

.EXAMPLE
    PS C:> Simulate-Activity -Minutes 60

.LINK

Home


.NOTES
    Author:  Sebastian Gräf
    Email:   ps@graef.io
    Date:    September 9, 2017
    PSVer:   3.0/4.0/5.0
#>

	[Cmdletbinding()]
	Param (
		[Parameter(Mandatory = $false)]
		[string]$Minutes
	)

	Begin
	{
		Write-Verbose " [$($MyInvocation.InvocationName)] :: Start Process"
	}

	Process
	{
		Add-Type -AssemblyName System.Windows.Forms
		$shell = New-Object -com "Wscript.Shell"

		$pshost = Get-Host
		$pswindow = $pshost.ui.rawui
		$pswindow.windowtitle = 'Activity-Simulator'

        if(!$minutes)
        {
        $Minutes = Read-Host -Prompt "Enter minutes for simulating activity"
        }

		for ($i = 0; $i -lt $Minutes; $i++)
		{
			cls
			$timeleft = $Minutes - $i
			Write-Host (Get-Date -Format HH:mm:ss) -ForegroundColor Green
			Write-Host 'Time left: ' -NoNewline
			Write-Host "$timeleft" -ForegroundColor Red -NoNewline
			Write-Host ' Minutes'
			$shell.sendkeys(' ')
			for ($j = 0; $j -lt 6; $j++)
			{
				for ($k = 0; $k -lt 10; $k++)
				{
					Write-Progress -Activity 'Simulating activity ..' -PercentComplete ($k * 10) -Status "Please ... don't disturb me."
					Start-Sleep -Seconds 1
				}
			}
			$Pos = [System.Windows.Forms.Cursor]::Position
			$x = ($pos.X % 500) + 1
			$y = ($pos.Y % 500) + 1
			[System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($x, $y)
		}
	}
	End
	{
		Write-Verbose " [$($MyInvocation.InvocationName)] :: End Process"
	}
}
```

If you don't commit a string for the Minutes parameter it will ask you how many minutes you want to simulate activity:

{{< image src="2021-08-10-11-39-27.png" caption="." >}}

After that the activity is running for the given amount of time:

{{< image src="featured-image-preview.png" caption="." >}}

