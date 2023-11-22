---
title: "GhostBuster: Remove all Non-present and hidden devices in Windows"
description: ""
date: 2017-02-12T11:25:02+08:00
lastmod: 2017-02-12T11:25:02+08:00
draft: false
resources:
- name: "featured-image"
  src: "featured-image.png"
- name: "featured-image-preview"
  src: "featured-image-preview.png"
tags: ["Automation", "scripts", "PowerShell", "posh", "pwsh", "Windows", "ghostbuster", "device manager"]
categories: ["Windows"]
toc: false
---

As described in one of my previous articles [How to show nonpresent devices in Windows with Device Manager](/show-non-present-devices-in-windows-with-device-manager/) you were able to show nonpresent devices in device manager and delete them one bye one.

<!--more-->

Now with GhostBuster which is a free portable tool, it lets you remove multiple or all old, non-present, unused and previous hardware devices from your Windows computer. Non-present devices are those devices that were once installed, but are now no longer attached to the computer. When you use the built-in Windows Device Manager, you can delete the devices one-by-one but not all at once. This is what's possible with this Device Cleanup Tool. You can select one, multiple or all non-present devices and delete them together. This can be helpful in cases you have to clean up ghosted disks from Failover Cluster nodes to avoid disk reservation issues.

Just give it a try, you can download it [here](https://bitbucket.org/wvd-vegt/ghostbuster).

{{< image src="featured-image-preview.png" caption="GhostBuster" >}}

{{< admonition info References >}}
- [GhostBuster](https://bitbucket.org/wvd-vegt/ghostbuster)
{{< /admonition >}}
