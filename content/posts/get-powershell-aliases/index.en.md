---
# weight: 1
title: "How to get a list of PowerShell Aliases"
description: ""
date: 2021-08-01T09:33:25+08:00
lastmod: 2021-08-01T09:33:25+08:00
draft: false
resources:
- name: "featured-image-preview"
  src: "featured-image-preview.png"
tags: ["TIL", "PowerShell", "scripts", "get-alias", "alias"]
categories: ["TIL", "PowerShell"]
toc: false
---

> **Today I learned** How to get a list of PowerShell Aliases.

An alias is an alternate name for a cmdlet, function, executable file, including scripts. PowerShell includes a set of built-in aliases. You can add your own aliases to the current session and to your PowerShell profile.

<!--more-->

```powershell
# Cmdlet
Get-Alias

# Display Alias names
(Get-Alias).DisplayName

# Display Alias name and definition
Get-Alias | select Name, Definition
```

Which gives you the following Outputs

{{< image src="featured-image-preview.png" caption="Output" >}}

```powershell
Name               Definition
----               ----------
?                  Where-Object
%                  ForEach-Object
ac                 Add-Content
cat                Get-Content
cd                 Set-Location
chdir              Set-Location
clc                Clear-Content
clear              Clear-Host
clhy               Clear-History
cli                Clear-Item
clp                Clear-ItemProperty
cls                Clear-Host
clv                Clear-Variable
cnsn               Connect-PSSession
compare            Compare-Object
copy               Copy-Item
cp                 Copy-Item
cpi                Copy-Item
cpp                Copy-ItemProperty
cvpa               Convert-Path
dbp                Disable-PSBreakpoint
del                Remove-Item
diff               Compare-Object
dir                Get-ChildItem
dnsn               Disconnect-PSSession
ebp                Enable-PSBreakpoint
echo               Write-Output
epal               Export-Alias
epcsv              Export-Csv
erase              Remove-Item
etsn               Enter-PSSession
exsn               Exit-PSSession
fc                 Format-Custom
fhx                Format-Hex
fl                 Format-List
foreach            ForEach-Object
ft                 Format-Table
fw                 Format-Wide
gal                Get-Alias
gbp                Get-PSBreakpoint
gc                 Get-Content
gcb                Get-Clipboard
gci                Get-ChildItem
gcm                Get-Command
gcs                Get-PSCallStack
gdr                Get-PSDrive
gerr               Get-Error
ghy                Get-History
gi                 Get-Item
gin                Get-ComputerInfo
gjb                Get-Job
gl                 Get-Location
gm                 Get-Member
gmo                Get-Module
gp                 Get-ItemProperty
gps                Get-Process
gpv                Get-ItemPropertyValue
group              Group-Object
gsn                Get-PSSession
gsv                Get-Service
gtz                Get-TimeZone
gu                 Get-Unique
gv                 Get-Variable
h                  Get-History
history            Get-History
icm                Invoke-Command
iex                Invoke-Expression
ihy                Invoke-History
ii                 Invoke-Item
ipal               Import-Alias
ipcsv              Import-Csv
ipmo               Import-Module
irm                Invoke-RestMethod
iwr                Invoke-WebRequest
kill               Stop-Process
ls                 Get-ChildItem
man                help
md                 mkdir
measure            Measure-Object
mi                 Move-Item
mount              New-PSDrive
move               Move-Item
mp                 Move-ItemProperty
mv                 Move-Item
nal                New-Alias
ndr                New-PSDrive
ni                 New-Item
nmo                New-Module
nsn                New-PSSession
nv                 New-Variable
ogv                Out-GridView
oh                 Out-Host
popd               Pop-Location
ps                 Get-Process
pushd              Push-Location
pwd                Get-Location
r                  Invoke-History
rbp                Remove-PSBreakpoint
rcjb               Receive-Job
rcsn               Receive-PSSession
rd                 Remove-Item
rdr                Remove-PSDrive
ren                Rename-Item
ri                 Remove-Item
rjb                Remove-Job
rm                 Remove-Item
rmdir              Remove-Item
rmo                Remove-Module
rni                Rename-Item
rnp                Rename-ItemProperty
rp                 Remove-ItemProperty
rsn                Remove-PSSession
rv                 Remove-Variable
rvpa               Resolve-Path
sajb               Start-Job
sal                Set-Alias
saps               Start-Process
sasv               Start-Service
sbp                Set-PSBreakpoint
scb                Set-Clipboard
select             Select-Object
set                Set-Variable
shcm               Show-Command
si                 Set-Item
sl                 Set-Location
sleep              Start-Sleep
sls                Select-String
sort               Sort-Object
sp                 Set-ItemProperty
spjb               Stop-Job
spps               Stop-Process
spsv               Stop-Service
start              Start-Process
stz                Set-TimeZone
sv                 Set-Variable
tee                Tee-Object
type               Get-Content
where              Where-Object
wjb                Wait-Job
write              Write-Output
```

{{< admonition info References >}}
<!---
:(far fa-bookmark fa-fw): Bookmark this page for easy future reference!
--->
- [Get-Alias](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-alias?view=powershell-7.1)
- [about_Alias_Provider](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_alias_provider?view=powershell-7.1)
{{< /admonition >}}
