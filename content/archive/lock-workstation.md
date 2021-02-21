---
title: "Function Lock-Workstation locally or remotely"
date: 2021-02-21T13:37:18+08:00
slug: ""
description: ""
keywords: ["automation", "iac", "powershell", "azure", "devops"]
draft: false
tags: ["automation", "iac", "powershell", "azure", "devops"]
math: false
toc: false
---

You can do everything with PowerShell, as well as locking your workstation with one simple function call. Just call the `LockWorkstation()` function in user32.dll and that's it! The fine thing is, it works on a local and a remote session.

```powershell
Function Lock-WorkStation {
    rundll32.exe user32.dll, LockWorkStation
}
```

## Reference

[Locking a Computer](https://docs.microsoft.com/en-us/powershell/scripting/samples/changing-computer-state?view=powershell-7.1#locking-a-computer)
