---
title: "Resolve DNS and IP addresses with PowerShell"
description: ""
date: 2017-07-10T11:12:17+08:00
lastmod: 2017-07-10T11:12:17+08:00
draft: false
resources:
- name: "featured-image-preview"
  src: "featured-image-preview.png"
tags: ["Automation", "scripts", "PowerShell", "posh", "pwsh", "Windows", "DNS", "IP"]
categories: ["Scripts", "PowerShell", "Windows Server"]
toc: false
---

In this case we’re going to use the method GetHostAddresses of the Dns class of the Sytem.Net namespace.
For PowerShell 2.0 you can use following Windows PowerShell One Liners:

### Name to IP Address (DNS Forward)

```powershell
[System.Net.Dns]::GetHostAddresses('graef.io')
[System.Net.Dns]::GetHostAddresses('graef.io').IPAddressToString
```

### IP Address to Name (DNS Reverse)

```powershell
[System.Net.Dns]::GetHostbyAddress('85.13.135.42')

HostName              Aliases AddressList
--------              ------- -----------
graef.io {}      {85.13.135.42}
```

As of PowerShell 4.0 you can use the Cmdlet Resolve-DnsName as well as for both Forward and Reverse:

```powershell
Resolve-DnsName graef.io

Name      Type   TTL   Section    IPAddress
----      ----   ---   -------    ---------
graef.io  AAAA   72711 Answer     2a01:488:42:1000:50ed:84e8:ff91:1f91
graef.io  A      72711 Answer     80.237.132.232

Resolve-DnsName 80.237.132.232

Name                           Type   TTL   Section    NameHost
----                           ----   ---   -------    --------
232.132.237.80.in-addr.arpa    PTR    32738 Answer     graef.io
```

{{< admonition info References >}}
- [System.Net.Dns](https://docs.microsoft.com/en-us/dotnet/api/system.net.dns.gethostaddresses?view=net-5.0)
{{< /admonition >}}
