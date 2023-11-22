---
title: "Function Lock-Workstation locally and remotely"
date: 2019-08-04
lastmod: 2021-02-21
draft: false
resources:
- name: "featured-image"
  src: "lock.png"
tags: ["lock workstation", "PowerShell", "posh", "remote"]
categories: ["Scripts"]
---

You can do everything with PowerShell, as well as locking your workstation with one simple function call.

<!--more-->

Just call the `LockWorkstation()` function in user32.dll and that's it! The fine thing is, it works on a local and a remote session.

```powershell
Function Lock-WorkStation {
    rundll32.exe user32.dll, LockWorkStation
}
```

{{< admonition info References >}}
- [Locking a Computer](https://docs.microsoft.com/en-us/powershell/scripting/samples/changing-computer-state?view=powershell-7.1#locking-a-computer)
{{< /admonition >}}
