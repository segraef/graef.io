# Get and Set Timezones via PowerShell remotely


As published in my Technet Gallery Script Center [here](https://gallery.technet.microsoft.com/scriptcenter/Get-Timezones-PowerShell-24781869), you can get current timezones remotely via PowerShell with Get-Timezones. Get-Timezones is using `WMI` to communicate with your servers.

```powershell
Function Get-Timezones {
    <#
    .SYNOPSIS
    Retrieves timezones of local or remote computers via WMI.

    .DESCRIPTION
    Retrieves timezones of local or remote computers via WMI.

    .PARAMETER ComputerName
    A single Computer or an array of computer names. The default is localhost ($env:COMPUTERNAME).

    .PARAMETER Credentials
    Commit Credentials for a different domain.

    .PARAMETER Verbose
    Run in Verbose Mode.

    .EXAMPLE
    PS C:\&amp;amp;amp;gt; Get-Timezones -ComputerName (gc 'C:\computers.txt') -Credentials Get-Credential

    ComputerName TimezoneName DaylightSaving TimezoneCaption
    ------------ ------------ -------------- ---------------
    SERVER01 W. Europe Standard Time yes (UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
    SERVER02 W. Europe Standard Time yes (UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna

    .NOTES
    Author: Sebastian Gräf
    Website: https://graef.io
    Email: ps@graef.io
    Date: June 27, 2017
    PSVer: 3.0/4.0/5.0
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

    Begin {
        Write-Verbose " [$($MyInvocation.InvocationName)] :: Start Process"
        $Results = @()
        $ProgressCounter = 0
    }

    Process {
        foreach ($Computer in $ComputerName) {
            $ProgressCounter++
            Write-Progress -activity "Running on $Computer" -status "Please wait ..." -PercentComplete (($ProgressCounter / $ComputerName.length) * 100)
            if (Test-Connection $Computer -Count 1 -Quiet) {
                Write-Verbose " [$($MyInvocation.InvocationName)] :: Processing $Computer"
                try {
                    $win32_timezone = Get-WmiObject -Class win32_timezone -ComputerName $Computer -ErrorAction Stop -Credential $Credentials
                    if ($win32_timezone.DaylightBias -eq 0) { $daylightsaving = "no" } else { $daylightsaving = "yes" }
                    $obj = New-Object -Type PSCustomObject -Property @{
                        ComputerName    = $Computer
                        TimezoneCaption = $win32_timezone.Caption
                        TimezoneName    = $win32_timezone.StandardName
                        DaylightSaving  = $daylightsaving
                    }
                    $Results += $obj
                }
                catch {
                    Write-Verbose " Host [$Computer] Failed with Error: $($Error[0])"
                }
            }
            else {
                Write-Verbose " Host [$Computer] Failed Connectivity Test"
            }
        }
        $Results | select ComputerName, TimezoneName, DaylightSaving, TimezoneCaption
    }
    End {
        Write-Progress -activity "Running on $Computer" -Status "Completed." -Completed
        Write-Verbose " [$($MyInvocation.InvocationName)] :: End Process"
    }
}
```

This will give you following output:


{{< image src="2021-02-21-15-32-21.png" caption="." >}}


With Set-Timezone you can set timezones remotely. If you need to disable automatic daylight saving time you can add the additional parameter DSTOff.

```powershell
Function Set-Timezones {
    <#
    .SYNOPSIS
    Sets and retries timezones on local or remote computers via WinRM and
    enables or disables daylight saving.

    .DESCRIPTION
    This PowerShell function sets and retrieves the timezone of a local or remote computer using WinRM (Invoke-Command).
    It also enables or disables dayligt saving times. The function accepts pipeline input and outputs to
    the pipeline as well as credentials if you want to run it for a specific domain. If the remote computer
    won't be accessible the function will catch the error but will continue to work. You can use tzutil /l
    to get a list of available time zone IDs.

    Timezone TimeZoneID
    --------- ----------
    (UTC-06:00) Central Time (US &amp;amp;amp;amp; Canada) Central Standard Time
    (UTC) Coordinated Universal Time UTC
    (UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna W. Europe Standard Time

    .PARAMETER TimezoneID
    A single Computer or an array of computer names. The default is localhost ($env:COMPUTERNAME).

    .PARAMETER DSTOff
    Enables or disables Daylight Saving Time adjustments
    for the time zone (where applicable). Default: ON
    If switch parameter DST committed as true, Daylight saving Time will be disabled.

    .PARAMETER ComputerName
    A single Computer or an array of computer names. The default is localhost ($env:COMPUTERNAME).

    .PARAMETER Credentials
    Commit Credentials for a different domain.

    .PARAMETER Verbose
    Run in Verbose Mode.

    .EXAMPLE
    PS C:\&amp;amp;amp;gt; Set-Timezones -ComputerName (gc 'C:\computers.txt') -TimezoneID "W. Europe Standard Time" -DSTOff

    ComputerName DaylightSaving TimezoneName
    ------------ -------------- ------------
    SERVER01 no W. Europe Standard Time_dstoff
    SERVER02 no W. Europe Standard Time_dstoff

    .NOTES
    Author: Sebastian Gräf
    Website: https://graef.io
    Email: ps@graef.io
    Date: June 27, 2017
    PSVer: 3.0/4.0/5.0

    #>

    [Cmdletbinding()]
    Param (
        [Parameter(ValueFromPipelineByPropertyName = $true, ValueFromPipeline = $true)]
        $ComputerName = $Env:COMPUTERNAME,
        [Parameter(ValueFromPipelineByPropertyName = $true, ValueFromPipeline = $true, Mandatory = $true)]
        $TimezoneID,
        [Parameter(ValueFromPipelineByPropertyName = $true, ValueFromPipeline = $true)]
        [switch]$DSTOff,
        [Parameter(ValueFromPipelineByPropertyName = $true, ValueFromPipeline = $true)]
        [ValidateNotNull()]
        [System.Management.Automation.PSCredential][System.Management.Automation.Credential()]
        $Credentials = [System.Management.Automation.PSCredential]::Empty
    )

    Begin {
        Write-Verbose " [$($MyInvocation.InvocationName)] :: Start Process"
        $Results = @()
        $ProgressCounter = 0
        if (!$DSTOff) {
            $DaylightSaving = ''
        }
        else {
            $DaylightSaving = "_dstoff"
        }
        $TimezoneID += $DaylightSaving
    }

    Process {
        foreach ($Computer in $ComputerName) {
            $ProgressCounter++
            Write-Progress -activity "Running on $Computer" -status "Please wait ..." -PercentComplete (($ProgressCounter / $ComputerName.length) * 100)
            if (Test-Connection $Computer -Count 1 -Quiet) {
                Write-Verbose " [$($MyInvocation.InvocationName)] :: Processing $Computer"
                try {
                    $win32_timezone = Invoke-Command -ComputerName $Computer -Command { param($TimezoneID); tzutil /s $TimezoneID; tzutil /g } -ArgumentList $TimezoneID -Credential $Credentials
                    $win32_timezone = Invoke-Command -ComputerName $Computer -Command { tzutil /g } -ArgumentList $Timezone -Credential $Credentials
                    if ($win32_timezone -like "*dstoff") { $DST = "no" } else { $DST = "yes" }
                    $obj = New-Object -Type PSCustomObject -Property @{
                        ComputerName   = $Computer
                        TimezoneName   = $win32_timezone
                        DaylightSaving = $DST
                    }
                    $Results += $obj
                }
                catch {
                    Write-Verbose " Host [$Computer] Failed with Error: $($Error[0])"
                }
            }
            else {
                Write-Verbose " Host [$Computer] Failed Connectivity Test"
            }
        }
        $Results | select ComputerName, DaylightSaving, TimezoneName
    }
    End {
        Write-Progress -activity "Running on $Computer" -Status "Completed." -Completed
        Write-Verbose " [$($MyInvocation.InvocationName)] :: End Process"
    }
}
```

This will give you following output:

{{< image src="2021-02-21-15-30-27.png" caption="." >}}


To get a full list of all timezone IDs type "tzutil /l” and you will get following list:

```powershell
UTC-12:00) International Date Line West
Dateline Standard Time

(UTC-11:00) Coordinated Universal Time-11
UTC-11

(UTC-10:00) Aleutian Islands
Aleutian Standard Time

(UTC-10:00) Hawaii
Hawaiian Standard Time

(UTC-09:30) Marquesas Islands
Marquesas Standard Time

(UTC-09:00) Alaska
Alaskan Standard Time

(UTC-09:00) Coordinated Universal Time-09
UTC-09

(UTC-08:00) Baja California
Pacific Standard Time (Mexico)

(UTC-08:00) Coordinated Universal Time-08
UTC-08

(UTC-08:00) Pacific Time (US &amp;amp;amp;amp; Canada)
Pacific Standard Time

(UTC-07:00) Arizona
US Mountain Standard Time

(UTC-07:00) Chihuahua, La Paz, Mazatlan
Mountain Standard Time (Mexico)

(UTC-07:00) Mountain Time (US &amp;amp;amp;amp; Canada)
Mountain Standard Time

(UTC-06:00) Central America
Central America Standard Time

(UTC-06:00) Central Time (US &amp;amp;amp;amp; Canada)
Central Standard Time

(UTC-06:00) Easter Island
Easter Island Standard Time

(UTC-06:00) Guadalajara, Mexico City, Monterrey
Central Standard Time (Mexico)

(UTC-06:00) Saskatchewan
Canada Central Standard Time

(UTC-05:00) Bogota, Lima, Quito, Rio Branco
SA Pacific Standard Time

(UTC-05:00) Chetumal
Eastern Standard Time (Mexico)

(UTC-05:00) Eastern Time (US &amp;amp;amp;amp; Canada)
Eastern Standard Time

(UTC-05:00) Haiti
Haiti Standard Time

(UTC-05:00) Havana
Cuba Standard Time

(UTC-05:00) Indiana (East)
US Eastern Standard Time

(UTC-04:00) Asuncion
Paraguay Standard Time

(UTC-04:00) Atlantic Time (Canada)
Atlantic Standard Time

(UTC-04:00) Caracas
Venezuela Standard Time

(UTC-04:00) Cuiaba
Central Brazilian Standard Time

(UTC-04:00) Georgetown, La Paz, Manaus, San Juan
SA Western Standard Time

(UTC-04:00) Santiago
Pacific SA Standard Time

(UTC-04:00) Turks and Caicos
Turks And Caicos Standard Time

(UTC-03:30) Newfoundland
Newfoundland Standard Time

(UTC-03:00) Araguaina
Tocantins Standard Time

(UTC-03:00) Brasilia
E. South America Standard Time

(UTC-03:00) Cayenne, Fortaleza
SA Eastern Standard Time

(UTC-03:00) City of Buenos Aires
Argentina Standard Time

(UTC-03:00) Greenland
Greenland Standard Time

(UTC-03:00) Montevideo
Montevideo Standard Time

(UTC-03:00) Punta Arenas
Magallanes Standard Time

(UTC-03:00) Saint Pierre and Miquelon
Saint Pierre Standard Time

(UTC-03:00) Salvador
Bahia Standard Time

(UTC-02:00) Coordinated Universal Time-02
UTC-02

(UTC-01:00) Azores
Azores Standard Time

(UTC-01:00) Cabo Verde Is.
Cape Verde Standard Time

(UTC) Coordinated Universal Time
UTC

(UTC+00:00) Casablanca
Morocco Standard Time

(UTC+00:00) Dublin, Edinburgh, Lisbon, London
GMT Standard Time

(UTC+00:00) Monrovia, Reykjavik
Greenwich Standard Time

(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
W. Europe Standard Time

(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
Central Europe Standard Time

(UTC+01:00) Brussels, Copenhagen, Madrid, Paris
Romance Standard Time

(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb
Central European Standard Time

(UTC+01:00) West Central Africa
W. Central Africa Standard Time

(UTC+01:00) Windhoek
Namibia Standard Time

(UTC+02:00) Amman
Jordan Standard Time

(UTC+02:00) Athens, Bucharest
GTB Standard Time

(UTC+02:00) Beirut
Middle East Standard Time

(UTC+02:00) Cairo
Egypt Standard Time

(UTC+02:00) Chisinau
E. Europe Standard Time

(UTC+02:00) Damascus
Syria Standard Time

(UTC+02:00) Gaza, Hebron
West Bank Standard Time

(UTC+02:00) Harare, Pretoria
South Africa Standard Time

(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius
FLE Standard Time

(UTC+02:00) Jerusalem
Israel Standard Time

(UTC+02:00) Kaliningrad
Kaliningrad Standard Time

(UTC+02:00) Tripoli
Libya Standard Time

(UTC+03:00) Baghdad
Arabic Standard Time

(UTC+03:00) Istanbul
Turkey Standard Time

(UTC+03:00) Kuwait, Riyadh
Arab Standard Time

(UTC+03:00) Minsk
Belarus Standard Time

(UTC+03:00) Moscow, St. Petersburg, Volgograd
Russian Standard Time

(UTC+03:00) Nairobi
E. Africa Standard Time

(UTC+03:30) Tehran
Iran Standard Time

(UTC+04:00) Abu Dhabi, Muscat
Arabian Standard Time

(UTC+04:00) Astrakhan, Ulyanovsk
Astrakhan Standard Time

(UTC+04:00) Baku
Azerbaijan Standard Time

(UTC+04:00) Izhevsk, Samara
Russia Time Zone 3

(UTC+04:00) Port Louis
Mauritius Standard Time

(UTC+04:00) Saratov
Saratov Standard Time

(UTC+04:00) Tbilisi
Georgian Standard Time

(UTC+04:00) Yerevan
Caucasus Standard Time

(UTC+04:30) Kabul
Afghanistan Standard Time

(UTC+05:00) Ashgabat, Tashkent
West Asia Standard Time

(UTC+05:00) Ekaterinburg
Ekaterinburg Standard Time

(UTC+05:00) Islamabad, Karachi
Pakistan Standard Time

(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
India Standard Time

(UTC+05:30) Sri Jayawardenepura
Sri Lanka Standard Time

(UTC+05:45) Kathmandu
Nepal Standard Time

(UTC+06:00) Astana
Central Asia Standard Time

(UTC+06:00) Dhaka
Bangladesh Standard Time

(UTC+06:00) Omsk
Omsk Standard Time

(UTC+06:30) Yangon (Rangoon)
Myanmar Standard Time

(UTC+07:00) Bangkok, Hanoi, Jakarta
SE Asia Standard Time

(UTC+07:00) Barnaul, Gorno-Altaysk
Altai Standard Time

(UTC+07:00) Hovd
W. Mongolia Standard Time

(UTC+07:00) Krasnoyarsk
North Asia Standard Time

(UTC+07:00) Novosibirsk
N. Central Asia Standard Time

(UTC+07:00) Tomsk
Tomsk Standard Time

(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi
China Standard Time

(UTC+08:00) Irkutsk
North Asia East Standard Time

(UTC+08:00) Kuala Lumpur, Singapore
Singapore Standard Time

(UTC+08:00) Perth
W. Australia Standard Time

(UTC+08:00) Taipei
Taipei Standard Time

(UTC+08:00) Ulaanbaatar
Ulaanbaatar Standard Time

(UTC+08:30) Pyongyang
North Korea Standard Time

(UTC+08:45) Eucla
Aus Central W. Standard Time

(UTC+09:00) Chita
Transbaikal Standard Time

(UTC+09:00) Osaka, Sapporo, Tokyo
Tokyo Standard Time

(UTC+09:00) Seoul
Korea Standard Time

(UTC+09:00) Yakutsk
Yakutsk Standard Time

(UTC+09:30) Adelaide
Cen. Australia Standard Time

(UTC+09:30) Darwin
AUS Central Standard Time

(UTC+10:00) Brisbane
E. Australia Standard Time

(UTC+10:00) Canberra, Melbourne, Sydney
AUS Eastern Standard Time

(UTC+10:00) Guam, Port Moresby
West Pacific Standard Time

(UTC+10:00) Hobart
Tasmania Standard Time

(UTC+10:00) Vladivostok
Vladivostok Standard Time

(UTC+10:30) Lord Howe Island
Lord Howe Standard Time

(UTC+11:00) Bougainville Island
Bougainville Standard Time

(UTC+11:00) Chokurdakh
Russia Time Zone 10

(UTC+11:00) Magadan
Magadan Standard Time

(UTC+11:00) Norfolk Island
Norfolk Standard Time

(UTC+11:00) Sakhalin
Sakhalin Standard Time

(UTC+11:00) Solomon Is., New Caledonia
Central Pacific Standard Time

(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky
Russia Time Zone 11

(UTC+12:00) Auckland, Wellington
New Zealand Standard Time

(UTC+12:00) Coordinated Universal Time+12
UTC+12

(UTC+12:00) Fiji
Fiji Standard Time

(UTC+12:45) Chatham Islands
Chatham Islands Standard Time

(UTC+13:00) Coordinated Universal Time+13
UTC+13

(UTC+13:00) Nuku'alofa
Tonga Standard Time

(UTC+13:00) Samoa
Samoa Standard Time
```

