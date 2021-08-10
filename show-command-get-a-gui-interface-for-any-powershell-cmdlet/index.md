# Show-Command: Get a GUI-Interface for any Powershell Cmdlet


Have you ever wondered if there’s an opportunity to easily create a GUI out of every PowerShell Cmdlet?

<!--more-->

In many cases this can be very useful for example if your Cmdlet hs too many parameters to list or just to see what’s it offering on Common parameters as well.

Just use the Show-Command cmdlet with any PowerShell cmdlet to bring up a GUI interface.
Let’s try this with the Get-Service Cmdlet and see what’s happening!

```powershell
Show-Command Get-Service
```

{{< image src="2021-08-10-11-38-10.png" caption="." >}}

You will have three options for executing your command: Run, Copy (for the clipboard), or Cancel.

{{< admonition info References >}}
- [Show-Command](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/show-command?view=powershell-7.1#:~:text=Show%2DCommand%20is%20a%20very,commands%20in%20all%20installed%20modules.)
{{< /admonition >}}

