# Get-LogonHistory: Who was logged on to my server?


Every System Administrator comes into a situation where you want to see who and how many users were logged on to your servers either via Remote Desktop or via script.

<!--more-->

This little function evaluates the System log with the help of Get-EventLog and delivers you the latest logon and logoff events for every user.

I’ve left you the Invoke-Command commented if you want to use PowerShell Remoting (WinRM).

```powershell
Function Get-LogonHistory
{
<#
.SYNOPSIS
    Retrieves history of last logged on users with usernames and respective logoff/logon times.

.DESCRIPTION
    Retrieves history of last logged on users with usernames and respective logoff/logon times.

.PARAMETER Newest
    This command gets the most recent entries from the event log according to its value.

.PARAMETER ComputerName
    A single Computer or an array of computer names. The default is localhost ($env:COMPUTERNAME).

.PARAMETER Credentials
    Commit Credentials for a different domain.

.PARAMETER Verbose
    Run in Verbose Mode.

.EXAMPLE
    PS C:\> Get-LogonHistory -ComputerName SERVER1 -Credentials Get-Credential -Newst

.NOTES
    Author:  Sebastian Gräf
    Email:   ps@graef.io
    Date:    April 15, 2017
    PSVer:   2.0/3.0/4.0/5.0
#>

    [Cmdletbinding()]
    Param (
        [Parameter(ValueFromPipelineByPropertyName = $true, ValueFromPipeline = $true)]
        [string[]]$ComputerName = $Env:COMPUTERNAME,
        [Parameter(ValueFromPipelineByPropertyName = $true, ValueFromPipeline = $true)]
        [string]$Newest = 10,
        [Parameter(ValueFromPipelineByPropertyName = $true, ValueFromPipeline = $true)]
        [ValidateNotNull()]
        [System.Management.Automation.PSCredential][System.Management.Automation.Credential()]
        $Credentials = [System.Management.Automation.PSCredential]::Empty
    )

    Begin
    {
        Write-Verbose " [$($MyInvocation.InvocationName)] :: Start Process"
        $Results = @()
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
                    $ELogs = Get-EventLog System -Source Microsoft-Windows-WinLogon -ComputerName $Computer -Newest $Newest
                    #$ELogs = Invoke-Command { param ($Newest) Get-EventLog System -Source Microsoft-Windows-WinLogon -Newest $Newest } -ArgumentList $Newest -ComputerName $Computer
                    ForEach ($Log in $ELogs)
                    {
                        If ($Log.InstanceId -eq 7001)
                        {
                            $EventType = "Logon"
                        }
                        ElseIf ($Log.InstanceId -eq 7002)
                        {
                            $EventType = "Logoff"
                        }
                        Else
                        {
                            Continue
                        }
                        $Results += New-Object PSObject -Property @{
                            User = (New-Object System.Security.Principal.SecurityIdentifier $Log.ReplacementStrings[1]).Translate([System.Security.Principal.NTAccount])
                            Time = $Log.TimeWritten
                            'Event Type' = $EventType
                        }
                    }
                    $Results
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
        $result | Select User, Time, "Event Type" | Sort Time -Descending
    }
    End
    {
        Write-Progress -activity "Running on $Computer" -Status "Completed." -Completed
        Write-Verbose " [$($MyInvocation.InvocationName)] :: End Process"
    }
}
```

Please keep in mind, it evaluates every event, this means even if a user was doing actions remotely using a powershell script or just logged on, it will be displayed as well. If you want to distinguish between script logons you can easily have a look at the logon and logoff times. If a user account was only logged for some seconds … then this is an indicator for a remote script logon.

The script will give you following output:

While using following command you can also query this function to more than just one server:

{{< image src="featured-image-preview.png" caption="." >}}

```powershell
Get-LogonHistory -ComputerName (gc C:\computers.txt) -Newest 30
```



