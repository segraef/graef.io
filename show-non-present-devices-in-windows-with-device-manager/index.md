# Show non-present devices in Windows with Device Manager


Open PowerShell or Commmand Shell, enter the following

```
set devmgr_show_nonpresent_devices=1
devmgmt.msc
```

{{< image src="2021-08-10-11-56-22.png" caption="." >}}

This will open your device manager with the ability to show hidden devices. Click on View and select "Show hidden devices".

{{< image src="2021-08-10-11-56-49.png" caption="." >}}

Select your hidden device you need to remove, right click and select uninstall. That's it!

{{< image src="2021-08-10-11-57-02.png" caption="." >}}

In case you need to remove multiple orphan / hidden / ghosted devices like disks on Windows Failover Cluster Nodes you can use [Ghostbuster](https://graef.io/ghostbuster-remove-all-non-present-hidden-devices-from-windows/) for that. See my other [article about Ghostbuster](https://graef.io/ghostbuster-remove-all-non-present-hidden-devices-from-windows/) as well.



