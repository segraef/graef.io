# Set primary IP address order with multiple IP addresses on a NIC


If you’re running a webserver it may be you have to run different services on the same port and need to use multiple IP addresses on the same network interface. This can happen for SMTP or Exchange Servers using several connectors.

<!--more-->

In Windows Server 2008 (don’t ask me why Micrososft did that) and as well as in Windows Server 2012 the source IP address on a network interface will always be the lowest IP address, in this case, the latest you have added.

So what do you have to do now is to set a flag on the particular IP address to say: "***Hey you, please don’t be the primary source address***." and this happens with the help of `netsh.exe` command.

You can view the status of all of your IP address and their status with following command:

`netsh int ipv4 show ipaddresses level=verbose`

The IP address which should not act as a primary source address needs to be flagged with `SkipAsSource=true`. As this command is only working while adding a new address but you want to have this flag enabled at one of your IP addresses, you first have to remove it and then add it again with this command:

`netsh int ipv4 add address "Local Area Connection" 10.0.0.4/24 SkipAsSource=true`

First, with the help of the SkipAsSource flag it instructs Windows not to use this IP as primary source IP and secondly, it prevents its registration in DNS (if dynamic registration is enabled).



