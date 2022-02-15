# Conception, Construction and Evaluation of a Raspberry Pi Cluster (3/4)


The goal of this work is to create an affordable, energy efficient and portable mini-supercomputer. Ideally, a cluster computer with little or no carbon footprint, individual elements that are inexpensive to replace, and a portable system that can be easily disassembled and reassembled.

<!--more-->

## Construction

The practical part of the work, the construction, follows the
step-by-step explanation of how to assemble, install and configure the
Raspberry Pi cluster. The installation instructions and scripts used in
the following are either available from the sources mentioned or from
the GitHub repository http://github.com/segraef/PiCube. All installation
and configuration steps are easy to follow, so that it is easy to build
the cluster on your own.

### Mounting and wiring

Elastic clips (see [Simplicity](#simplicity-elastic-clip-concept)) allow the individual case sides to be easily
plugged together without the use of screws. The pre-milled holes for the
switch, USB charger and LCD display allow the individual components to
be attached using the plastic nuts and screws. Pre-milled holes for the
LCD display, network ports, HDMI port, and power connector provide the
proper slots for the cables to be subsequently connected outside of the
case. The assembly is done according to the steps mentioned below:

1.  Connecting the single board computers together using hex spacers.
2.  Screw on the attached Raspberry Pis on the left inner side.
3.  Attachment of the switch to the base plate.
4.  Attaching the LCD display and USB sockets to the front panel.
5.  Screwing the USB charger to the right side plate.
6.  Mounting the case fan, HDMI and network jacks.

After the entire interior has been assembled, the side panels are
clipped in step by step. To do this, start with the base plate, onto
which the left and right side plates are clipped and clipped together.
Before assembling the front panel, we wire the individual components.
LCD displays only work by being powered and controlled. A total of 4
cable jumpers are used for this purpose. Two of them are for power and
the other two are for control and transmission signals which we connect
to GPIO pins 2, 3, 5 and 6 of one of the Raspberry Pis which acts as a
master node. All mini computers are connected to the switch using RJ45
network cables. Likewise, we connect the cables of the network jacks to
the switch, which serve as network port extensions. Micro-USB cables are
typically used for data transfer, in this scenario they are only used
for powering the individual single-board computers.

We connect the network switch and all Raspberry Pis to the USB charger
using the USB cables. We connect the case fan with its 3-pin connector
to the GPIO ports 2 and 6 of one of the Raspberry Pis to supply it with
power. After all the necessary cables and components are connected, we
move on to the cluster installation. The following two images show the
PiCube in a partially and fully wired state.

{{< image src="media/picube4.jpg" caption="Source: Own representation. <br> **Figure 24**: *Partially wired PiCube without front and bottom panels.*" >}}

{{< image src="media/image26.jpeg" caption="Source: Own representation. <br> **Figure 25**: *Fully wired and closed PiCube.*" >}}

### Installation

#### Operating system

To provide a suitable developer system and, to meet all requirements, we
use the HypriotOS operating system as the base system for the cluster.
The OS provides a Docker-optimized Linux kernel and is therefore ideally
suited for this cluster. It already includes all the required modules
such as Docker Engine, Docker Machine and Docker Compose. HypriotOS is
an operating system specially developed for Raspbery Pi, which is based
on the Linux distribution Debian. Important prerequisites for the
successful operation of a cluster system are identical and redundantly
designed hardware (see [Cluster](#cluster)) and the cluster software that can run on it.
Among other things, this concerns the same software and driver versions
for all participating nodes. To ensure that the cluster system maintains
a homogeneous operating system and version structure on all nodes, we
use operating system images. [^56]

#### Imaging and provisioning

For the installation of Raspberry Pi operating systems, memory images
are used. Images are disk images in a compressed file that contains
files, file system structures, and boot sectors. Simply put, an image
contains an exact disk copy of an operating system. The advantage of
using images is that an operating system does not have to be installed.
In order for this exact disk copy to be deployed in our nodes, we copy
the contents to SD cards and deploy them in our cluster nodes. Using the
Hypriot flash tool, the hostname is passed to the image and is thus
hardcoded for the first boot of the Raspberry Pi. Hardcoded means that
values, such as the hostname in this case, are passed into the startup
configuration of the operating system and are called and used when the
system starts. The following code snippet (see **Listing 1**) shows the
command that sets the hostname rpi1 for the image package
hypriotos-rpi1-v1.6.0.img.zip after downloading the HypriotOS image from
the address https://github.com/hypriot/image-builder-rpi/releases/download/v1.6.0/. [^57]

```
flash \--hostname rpi1 https://github.com/hypriot/image-builder-rpi/releases/download/v1.6.0/hypriotos-rpi-v1.6.0.img.zip
```

**Listing 1**: *The HypriotOS image is downloaded and copied to the SD card using flash.*

YAML Ain\'t Markup Language (YAML) is a markup language and gives us
the possibility to create customized parameters for a startup
configuration. Thus, it is very easy to pass values into a configuration
which will be initialized and applied when each node is started for the
first time. Examples for start parameters, which can be preconfigured:

-   Hostname
-   WLAN -SSID
-   WLAN password
-   Static or dynamic IPaddress

The YAML files for our nodes look like this, with the hostname for the
respective Raspberry Pi adjusted accordingly:

```
hostname: "rpi"
wifi:
    interfaces:
        wlan0:
        ssid: "WLAN"
        password: "2345251344834395"
```

**Listing 2**: *Example of a YAML configuration.*

Fixed WLAN parameters lets individual nodes connect to an existing
wireless network. We copy this configuration to the image in the `/boot/`
directory. The following code snippet shows setting the YAML
configuration using flash. This accesses `/boot/device-init.yaml` on
initial startup and copies the appropriate parameters to the operating
system\'s startup configuration:

```
flash \--config https://github.com/hypriot/image-builder-rpi/releases/download/v1.6.0/hypriotos-rpi-v1.6.0.img.zip
```

**Listing 3**: *The HypriotOS image is downloaded, copied to the SD card using flash and a given YAML configuration.*

Time is precious and, in order to save it, we prepare the respective
image for each individual Raspberry Pi and thus take advantage of the
automatic provisioning. Due to the use of a total of 5 cluster nodes,
the manual installation, configuration and maintenance of each
individual node would be very time-consuming. Therefore, we provision
every single operating system in advance, which means we use a master
image that already contains current driver versions and software
packages. We modify this system image for each individual node by means
of a YAML configuration, so that only the host name has to be entered
and is thus hard-coded or hard-configured. As soon as the system starts,
it takes the hardcoded hostname value from its startup configuration and
boots with it. Flash is used to provision the remaining 4 nodes with the
host names rpi2, rpi3, rpi4 and rpi5 respectively.

#### Commissioning of the cluster

After all SD cards are prefabricated and inserted into the individual
Raspberry Pis, the cluster is put into operation and the system is
connected to the power. After all systems get power, the LCD display and
the individual LED s of the Raspberry Pis light up one after the other,
signaling their operation (see **Figure 26**). The startup process of the
single-board computers happens quite quickly and the systems are ready
for the next step, the actual configuration of the cluster, after about
30 seconds.

{{< image src="media/picube5.jpg" caption="Source: Own representation. <br> **Figure 26**: *All systems signal their readiness for operation.*" >}}

### Cluster configuration

#### Installing and configuring Kubernetes

All five nodes are now configured in the same way as described below,
the order is not decisive here. The connection to the individual
Raspberry Pis is established via Secure Shell (SSH). In order to
establish this secure connection over the network, the terminal program
putty is used. As soon as the connection is established, a \"sudo
update\" is performed to update the current package installation lists
to the latest version. Afterwards, \"sudo upgrade\" is used to update
all the correspondingly required software packages for Docker. The next
step is to install Kubernetes using the following command:

```
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add - && echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list && sudo apt-get update -q && sudo apt-get install -qy kubeadm
```

**Listing 4**: *Command to install
Kubernetes.*

Here, the corresponding Kubernetes installation package is downloaded and installed. Now the node rpi1 is selected and the command `sudo kubedm init` is executed to initialize the cluster. Thus, the cluster is created and rpi1 is set as the master node. All other hosts are added to the cluster as worker nodes using the `kubeadm join` command. After the last node is successfully added, the command `kubectl get nodes` is used to check whether all nodes are ready and added to the computer cluster (see **Figure 27**).

{{< image src="media/image2829.png" caption="Source: Own representation. <br> **Figure 27**: *Status query in the terminal of all nodes.*" >}}

The Kubernetes cluster now has an active master node. If this node ever
fails, the kube-controller-manager (see [Google Kubernetes](#google-kubernetes)) detects this and decides
which of the worker nodes will step in as the new active master.

{{< image src="media/image294.png" caption="Source: Own representation. <br> **Figure 28**: *Schematic structure of Kubernetes on the PiCube cluster.*" >}}

#### Configuration LCD display

In order for the LCD display to show the corresponding values IP
addresses, system time, temperature and status information, a
corresponding Python script is used. This script is executed
automatically at every startup and delivers status values to the LCD
display via I2C. [^58]

{{< image src="media/image305.jpeg" caption="Source: Own representation. <br> **Figure 29a**: *Display of temperature, voltage and load on the LCD display.*" >}}
{{< image src="media/image319.jpeg" caption="Source: Own representation. <br> **Figure 29b**: *Display of temperature, voltage and load on the LCD display.*" >}}

## Evaluation

{{< admonition info Note >}}
Check out the next part
- [Conception, Construction and Evaluation of a Reaspberry Pi Cluster (4/4)](../conception-construction-and-evaluation-of-a-raspberry-pi-cluster-4/)
{{< /admonition >}}

## Bibliography

Adams, J. (September 2017). SFT Guide 14/17 - Raspberry Pi Tips, Tricks & Hacks (No. 1). *Third generation: The innovations of the Raspberry Pi 3*, p. 159.

Baier, J. (2017). *Getting Started with Kubernetes - Harness the power of Kubernetes to manage Docker deployments with ease.* Birmingham: Packt Publishing.

Bauke, H., & Mertens, S. (2006). *Cluster computing - Practical introduction to high performance computing on Linux clusters.* Heidelberg: Springer.

Bedner, M. (2012). *Cloud computing - technology, security and legal design.* Kassel: kassel university press.

Bengel, G., Baun, C., Kunze, M., & Stucky, K.-U. (2008). *Master course parallel and distributed systems - fundamentals and programming of multicore processors, multiprocessors, clusters and grids.* Wiesbaden: Vieweg+Teubner.

*Beowulf Cluster Computing*. (January 12, 2018). Retrieved from MichiganTech - Beowulf Cluster Computing: http://www.cs.mtu.edu/beowulf/

*Beowulf Scalable Mass Storage (T-Racks)*. (January 12, 2018). Retrieved from ESS Project: https://www.hq.nasa.gov/hpcc/reports/annrpt97/accomps/ess/WW80.html

*BOINC - Active Projects Statistics*. (January 31, 2018). Retrieved from Free-DC - Distributed Computing Stats System: http://stats.free-dc.org/stats.php?page=userbycpid&cpid=cfbdd0ffc5596f8c5fed01bbe619679d

*Cache*.(January 14, 2018). Retrieved from Electronics Compendium: https://www.elektronik-kompendium.de/sites/com/0309291.htm

Christl, D.,Riedel, M., & Zelend, M. (2007). *Communication systems / computer networks - Research of tools for the control of a massively parallel cluster computer in the computer center of the West Saxon University of Applied Sciences Zwickau.* Zwickau: Westsächsichen Hochschule Zwickau.

*CISC and RISC*. (January 28, 2018). Retrieved from Electronics Compendium: https://www.elektronik-kompendium.de/sites/com/0412281.htm

*Containersvs. virtual machines*. (December 13, 2017). Retrieved from NetApp Blog: https://blog.netapp.com/blogs/containers-vs-vms/

Coulouris, G.,Dollimore, J., Kindberg, T., & Blair, G. (2012). *Distributed systems - concepts and design.* Boston: Pearson.

Dennis, A. K. (2013). *Raspberry Pi super cluster.* Birmingham: Packt Publishing.

*The science behind SETI\@home*. (January 30, 2018). Retrieved from SETI\@home: https://setiathome.berkeley.edu/sah_about.php

*Docker on the Raspberry Pi with HypriotOS*. (January 24, 2018). Retrieved from Raspberry Pi Geek: http://www.raspberry-pi-geek.de/Magazin/2017/12/Docker-auf-dem-Raspberry-Pi-mit-HypriotOS

Eder,M. (2016). *Hypervisor- vs. container-based virtualization.* Munich: Technical University of Munich.

*Einstein\@Home on Android devices*. (January 23, 2018). Retrieved from GEO600: http://www.geo600.org/1282133/Einstein_Home_on_Android_devices

*Enable I2C Interface on the Raspberry Pi*. (January 28, 2018). Retrieved from Raspberry Pi Spy: https://www.raspberrypi-spy.co.uk/2014/11/enabling-the-i2c-interface-on-the-raspberry-pi/

*Encyclopedia - VAX*. (January 20, 2018). Retrieved from PCmag: https://www.pcmag.com/encyclopedia/term/53678/vax

*Failover Cluster*. (January 20, 2018). Retrieved from Microsoft Developer Network: https://msdn.microsoft.com/en-us/library/ff650328.aspx

Fenner, P. (10. 12 2017). *So What\'s a Practical Laser-Cut Clip Size?* Retrieved from DefProc Engineering: https://www.deferredprocrastination.co.uk/blog/2013/so-whats-a-practical-laser-cut-clip-size/Fey, D. (2010).

*Grid computing - An enabling technology for computational science.* Heidelberg: Springer.

*GitHub - flash*. (January 24, 2018). Retrieved from hypriot / flash: https://github.com/hypriot/flash

Goasguen, S. (2015). *Docker Cookbook - Solutions and Examples for Building Dsitributed Applications.* Sebastopol: O\'Reilly.

Grabsch, V., & Radunz, Y. (2008). *Seminar presentation - Amdahl\'s and Gustafson\'s law.* o.O.: Creative Commons.

Herminghaus, V., & Scriba, A. (2006). *Veritas Storage Foundation - High End Computing for UNIX Design and Implementation of High Availability Solutions with VxVM and VCS.* Heidelberg: Springer.

*Horizontal Pod Autoscaling*. (January 29, 2018). Retrieved from GitHub: https://github.com/kubernetes/kubernetes/blob/8caeec429ee1d2a9df7b7a41b21c626346b456fb/docs/user-guide/horizontal-pod-autoscaling/image/index.php

*How nodes work*. (January 27, 2018). Retrieved from docker docs: https://docs.docker.com/engine/swarm/how-swarm-mode-works/nodes/

*How to setup an I2C LCD on the Raspberry Pi*. (January 28, 2018). Retrieved from Circuit Basics: http://www.circuitbasics.com/raspberry-pi-i2c-lcd-set-up-and-programming/

*If we want to Find Aliens, We Need to Save the Arecibo Telescope*. (January 23, 2018). Retrieved from vice: https://www.vice.com/en_us/article/wdbq74/find-aliens-arecibo-telescope

*Inkscape - Overview*. (January 24, 2018). Retrieved from Inkscape: https://inkscape.org/de/ueber/uebersicht/

Kaiser, R. (2009). *Virtualization of multiprocessor systems with real-time applications.* Koblenz-Landau.Kersken, S. (2015).

*IT handbook for IT specialists.* Bonn: Rheinwerk Verlag GmbH.

Kroeker, K. L. (March 2011). Grid computing\'s future. *Communications of the ACM*, pp. 15-17.

*Kubernetes Components*. (January 10, 2018). Retrieved from kubernetes: https://kubernetes.io/docs/concepts/overview/components/

*Kubernetes vs Docker Swarm*. (January 10, 2018). Retrieved from Platform9: https://platform9.com/blog/kubernetes-docker-swarm-compared/

*Laser-Cut Elastic-Clipped Comb-Joints*. (December 1, 2018). Retrieved from DefProc Engineering: https://www.deferredprocrastination.co.uk/blog/2013/laser-cut-elastic-clipped-comb-joints/

*Laser-Cut Elastic Clips*. (December 1, 2017). Retrieved from Thingiverse: https://www.thingiverse.com/thing:53032

Lee, C. (2014). *Cloud database development and management.* Boca Raton: CRC Press.

Liebel, O. (2011). *Linux high availability - deployment scenarios and practical solutions.* Bonn: Galileo Press.

*Load-Balanced Cluster*. (January 20, 2018). Retrieved from Microsoft Developer Network: https://msdn.microsoft.com/en-us/library/ff648960.aspx

Lobel, L. G., & Boyd, E. D.. (2014). *Microsoft Azure SQL Database step by step.* Redmond: Microsoft Press.

*MAD - Andreas Gregori*. (January 24, 2018). Retrieved from MAD Models Architecture Design: http://mad-modelle.de/kontakt/

Mandl, P. (2010). *Basic course operating systems - architectures, resource management, synchronization, process communication.* Wiesbaden: VIeweg + Teubner.

Matros, R. (2012). *The impact of cloud computing on IT service providers - A case study-based investigation of critical influencing variables.* Bayreuth: Springer

Gabler.Merkert, J. (16 October 2017). c\'t Raspberry Pi - Raspi projects. *Risc OS*, p. 151.

Miell, I., & Sayers, A. H. (2016). *Docker in practice.* New York: Manning Publications.

*Networked computing: fundamentals and applications*. (January 20, 2018). Retrieved from techchannel: https://www.tecchannel.de/a/networked-computing-grundlagen-und-anwendungen,439222,5

Neuenschwander, E. P. (2014). *Cloud computing - A legal thundercloud?* Zurich: University of Zurich.

*New DIY supercomputer saves £1,000s*. (January 8, 2018). Retrieved from University of Westminster: https://www.westminster.ac.uk/news-and-events/news/2011/new-diy-supercomputer-saves-%C2%A31000s

Nickoloff, J. (2016). *Docker in action.* New York: Manning Publications.

*Nodes*. (January 10, 2018). Retrieved from kubernetes: https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/

*Overview of Microsoft HPC Pack and SOA in Failover Cluster*. (January 21, 2018). Retrieved from Microsoft TechNet: https://technet.microsoft.com/en-us/library/gg142067(v=ws.11).aspx

*PaaS or IaaS*. (January 13, 2018). Retrieved from Microsoft Azure: https://docs.microsoft.com/de-de/azure/sql-database/sql-database-paas-vs-sql-server-iaas

*Parallel Linux Operating System - Beowulf Gigaflop/s Workstation Project*. (January 12, 2018). Retrieved from ESS Project: https://www.hq.nasa.gov/hpcc/reports/annrpt97/accomps/ess/WW49.html

Pfister, G. (1997). *In Search of Clusters - The ongoing Battle in lowly Parallel Computing.* New Jersey: Prentice Hall.

*Pods*. (January 10, 2018). Retrieved from kubernetes: https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/

*Pods and Nodes*. (January 10, 2018). Retrieved from kubernetes Bootcamp: https://kubernetesbootcamp.github.io/kubernetes-bootcamp/3-1.html

*Project list*. (January 8, 2018). Retrieved from BOINC: http://boinc.berkeley.edu/wiki/Project_list

*Project to setup Boinc client in Docker for the RaspberryPi*. (January 30, 2018). Retrieved from Docker Hub: https://hub.docker.com/r/bunchc/rpi-boinc/

*projects*. (November 30, 2017). Retrieved from Climbers.net: http://climbers.net/sbc/diy-raspberry-pi-3-cluster/RPiCluster4b.png

*Raspberry Pi 3 - self-heating.* (Dec 20, 2017). Retrieved from mikrocontroller.net: https://www.mikrocontroller.net/topic/393898

*Raspberry Pi 3 GPIO Pin Chart with Pi*. (January 23, 2018). Retrieved from openclipart: https://openclipart.org/detail/280972/raspberry-pi-3-gpio-pin-chart-with-pi

*Raspberry Pi 3: Power consumption and CoreMark comparison*. (January 31, 2018). Retrieved from heise online: https://www.heise.de/ct/artikel/Raspberry-Pi-3-Leistungsaufnahme-und-CoreMark-Vergleich-3121139.html

Ries, C. B. (2012). *BOINC - high performance computing with Berkeley Open Infrastructure for Network Computing.* Heidelberg: Springer Vieweg.

*rkt - A security-minded, standards-based container engine*. (January 27, 2018). Retrieved from CoreOS: https://coreos.com/rkt/

*RPiCluster - Overview*. (January 23, 2018). Retrieved from RPiCluster: https://bitbucket.org/jkiepert/rpicluster

Schill, A., & Springer, T. (2007). *Distributed systems - fundamentals and enabling technologies.* Heidelberg: Springer.

*SETI\@home - Your Computers*. (January 31, 2018). Retrieved from SETI\@home: https://setiathome.berkeley.edu/hosts_user.php

Smith, N. (28. 11 2017). *Climbers.net*. Retrieved from DIY 5 Node Cluster of Raspberry Pi 3s: http://climbers.net/sbc/diy-raspberry-pi-3-cluster/

*Swarm mode key concepts*. (January 27, 2018). Retrieved from docker docs: https://docs.docker.com/engine/swarm/key-concepts/

Tanenbaum, A. S. (2007). *Distributed systems - principles and paradigms.* New Jersey: Pearson Prentice Hall.

*Technet*. (January 13, 2018). Retrieved from Microsoft: https://blogs.technet.microsoft.com/kevinremde/2011/04/03/saas-paas-and-iaas-oh-my-cloudy-april-part-3/

*Top500 List*. (January 8, 2018). Retrieved from Top 500 The List: https://www.top500.org/list/2017/11/

Ulmann, B. (February 6, 2014). *IT basics.* FOM.

*Our home galaxy - the Milky Way*. (January 23, 2018). Retrieved from planet wissen: https://www.planet-wissen.de/technik/weltraumforschung/astronomie/pwieunsereheimatgalaxiediemilchstrasse100.html

*VMS Software, Inc. Named Exclusive Developer of Future Versions of OpenVMS Operating System.* (January 20, 2018). Retrieved from BusinessWire: https://www.businesswire.com/news/home/20140731006118/en/VMS-Software-Named-Exclusive-Developer-Future-Versions

*What is Kubernetes?* (January 10, 2018). Retrieved from kubernetes: https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/


