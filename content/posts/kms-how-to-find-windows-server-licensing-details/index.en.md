---
title: "KMS: How to Find Windows Server Licensing Details"
description: ""
date: 2017-03-10T11:13:41+08:00
lastmod: 2017-03-10T11:13:41+08:00
draft: false
resources:
- name: "featured-image-preview"
  src: "featured-image-preview.png"
tags: ["Automation", "scripts", "PowerShell", "posh", "pwsh", "Windows"]
categories: ["Scripts", "PowerShell", "Windows Server"]
toc: false
---

If you're searching for Windows Server Licensing and Activation Details of your Windows machine you can use following statements

<!--more-->

`slmgr.vbs -dlv`

which will give you following output

{{< image src="2021-08-10-11-53-52.png" caption="." >}}

If you're searching for some other details like your client machine ID (CMID) you can use following statement

`slmgr.vbs -dli`


which will give you following output

{{< image src="featured-image-preview.png" caption="." >}}

Both commands work for KMS and Non-KMS clients. It's always good to have an opportunity to retrieve details like

- License Status
- Volume Activation Expiration
- Client Machine ID (CMID)
- KMS machine IP address
- KMS machine extended PID
- Activation interval
- Renewal interval
- Activation ID
- Application ID
- Extended PID
- Produkt Key Channel Volume
- Installation ID
- Volume activation expiration
- Remaining Windows rearm count
- Remaining SKU rearm count
