---
title: "Configure Cluster Quorum node weight settings"
description: ""
date: 2017-06-23T11:29:53+08:00
lastmod: 2017-06-23T11:29:53+08:00
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

While using SQL AlwaysOn in connection with a third node on a different location as a DR solution, the third node is needed only in case there is a real Disaster Recovery.

<!--more-->

For this purpose in most cases a manual intervention/failover is needed and you need to align your DR Cluster Node Weight for it. You can use following PowerShell snippet:

```powershell
Import-Module FailoverClusters

$node = 'AlwaysOnNode1'
(Get-ClusterNode $node).NodeWeight = 0

$cluster = (Get-ClusterNode $node).Cluster
$nodes = Get-ClusterNode -Cluster $cluster

$nodes | Format-Table -property NodeName, State, NodeWeight
```

{{< admonition info References >}}
- [Configure Cluster Quorum NodeWeight Settings](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/windows/configure-cluster-quorum-nodeweight-settings?view=sql-server-ver15)
{{< /admonition >}}
