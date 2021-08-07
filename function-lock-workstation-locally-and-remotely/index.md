# Function Lock-Workstation locally and remotely


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

