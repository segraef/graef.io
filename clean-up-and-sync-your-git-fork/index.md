# Clean Up and Sync Your Git Fork


If you want to start with your fork from scratch while remaining the current upstream/main as your base use this.

<!--more-->

> There is a difference between *Syncing a fork* and *Cleaning up a fork*.


## Clean up your fork from the command line

```
git remote add upstream /url/to/original/repo
git fetch upstream
git checkout main
git reset --hard upstream/main
git push -f
```

> You can also just delete your fork on the web UI and create a new fork.

## Syncing a fork from the command line

```
git remote add upstream /url/to/original/repo
git fetch upstream
git checkout main
git merge upstream/main
```

GitHub You gives you also the opportunity to [sync a fork from the web UI](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-from-the-web-ui).


{{< admonition info References >}}
- [Git Basics - Working with Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)
- [Syncing a fork](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)
- [Syncing a fork from the web UI](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-from-the-web-ui)
{{< /admonition >}}

