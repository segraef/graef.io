# Automatically clean up local once remote branch is deleted


Use this nice PowerShell one-liner to automatically clean up (delete) your local branches once your remote branches is deleted (merged).

<!--more-->


```
git checkout main; git pull; git remote update origin --prune; git branch -vv | Select-String -Pattern ": gone]" | % { $_.toString().Trim().Split(" ")[0]} | % { git branch -D $_ }
```

```pwsh
git checkout main
git pull
git remote update origin --prune
git branch -vv | Select-String -Pattern ": gone]" | % { $_.toString().Trim().Split(" ")[0]} | % { git branch -D $_ }
```

{{< admonition info References >}}
- [git-fetch](https://git-scm.com/docs/git-fetch)
- [git prune](https://git-scm.com/docs/git-prune)
- [git checkout](https://git-scm.com/docs/git-checkout)
{{< /admonition >}}

