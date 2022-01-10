# How to reload your VSCode Window


Today I learned how to reload/restart my window in Visual Studio Code.

This is especially helpful if you want to restart Visual Studio and leave all your current terminals open.

<!--more-->

Open the command palette (Ctrl + Shift + P) and execute the command `>Reload Window`.

{{< image src="reload-window-vscode.png" caption="**Reload Window**" >}}

{{< admonition info Note >}}
However, it is usually not enough to make newly added environment variables available in your new terminal sessions - this still requires a complete restart of Visual Studio Code.
{{< /admonition >}}

This, by the way, reloads the path variables in the specific terminal instance without restarting VSCode.

```pwsh
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

But I think restarting VSCode is way more faster than typing this command.

