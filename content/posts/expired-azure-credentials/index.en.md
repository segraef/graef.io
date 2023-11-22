---
title: "Expired Azure credentials"
description: ""
date: 2017-10-26T15:00:50+08:00
lastmod: 2021-02-13T15:00:50+08:00
draft: false
resources:
- name: "featured-image"
  src: "featured-image.png"
tags: ["Automation", "credentials", "az", "Azure", "PowerShell", "azurerm"]
categories: ["Azure"]
toc: false
---

In case you get this error below, this error is mostly due to outdated Modules or at least in this case the AzureRM module.

<!--more-->

Your Azure credentials have not been set up or have expired, please run Login-AzureRMAccount to set up your Azure credentials.

{{< image src="2017-10-26_13-06-21.png" caption="." >}}

Easily go ahead and update your PowerShell or Azure PowerShell Modules to the latest version 4.4.0 and it should be gone.
You can do this while easily using Update-Module or just go ahead and use Install-Module AzureRm -Force