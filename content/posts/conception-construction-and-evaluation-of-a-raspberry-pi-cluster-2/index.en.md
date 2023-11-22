---
# weight: 1
title: "Conception, Construction and Evaluation of a Raspberry Pi Cluster (2/4)"
description: ""
date: 2021-05-11
lastmod: 2021-05-11
draft: false
resources:
- name: "featured-image"
  src: "media/picube2.jpg"
tags: ["Raspberry", "Pi", "cluster", "failover", "Kubernetes",
"k8s", "docker", "HypriotOS", "PiCube", "GPIO", "YAML", "Bash"]
categories: ["Projects"]
---

The goal of this work is to create an affordable, energy efficient and portable mini-supercomputer. Ideally, a cluster computer with little or no carbon footprint, individual elements that are inexpensive to replace, and a portable system that can be easily disassembled and reassembled.

<!--more-->

## Conception and design

In this chapter, we will go into the basic concept of creating a cluster
using Raspberry Pi single-board computers. Here, these mini-computers
form the basis for constructing a cost-effective and energy-efficient
cluster system. Inspired by Joshua Kiepert and his 32-node RPiCluster or
Nick Smith and his first design of a 5-node Raspberry Pi cluster, the
idea of further developing and improving certain components has emerged,
such as increasing the cooling performance by means of an optimized
airflow supply, adding and logically arranging further connection
possibilities and considering a modular expandability of the cluster. [^52]

### Requirements

The main focus in the design of this Raspberry Pi cluster is on the
following requirement criteria:

-   Cost Efficiency.
-   Energy efficiency.
-   Scalability.
-   Resilience.

Further criteria are a visual and easy-to-read status and information
display of current system values, ideal cooling and optimization of the
airflow for the best possible removal of heat. Furthermore, the entire
design concept is fundamentally based on certain design requirements,
which we will discuss in more detail in the design decisions (see [Design decisions](#design-decisions)).

#### Cost and energy efficiency

The factors of cost and energy efficiency are paramount and
predominantly influence the conception and design. In order to keep the
acquisition costs as low as possible but still be able to offer
efficient computing power, Raspberry Pi single-board computers in
version 3 are to be installed. The use of unnecessary cable lengths or
heavy and expensive materials such as sheet steel or aluminum for the
housing should be avoided. In addition, a weight and further cost saving
is to be achieved by using plastic instead of steel screws.

The system should be reproducible at low cost and consume as little
power as possible. Energy consumption of less than 60 kilowatts per hour
is planned, which is comparatively equivalent to the average power
consumption of a commercially available light source such as an
incandescent lamp. Such low power consumption implies the portability
factor, which means that it should also be possible to use this cluster
on a mobile basis.

#### Scaling and resilience

Scaling is to be considered in this system in two respects. On the one
hand, the user should be given the option of connecting the entire
system with other clusters in order to be able to scale cluster-wise at
this level. Here we also speak of horizontal scaling. On the other hand,
it should be possible to scale vertically or node by node within a
cluster by adding or removing individual nodes. This is done either
automatically using cluster software or by physically adding or removing
further single-board computers. Due to the modular structure of the
cluster, the primary goal is to expand individual entire clusters, i.e.
vertical scaling.

In parallel to scaling, failover is an important player when it comes to
keeping the cluster alive. As soon as the cluster system scales on the
software side, all peripheral components must be designed and optimized
accordingly so as not to reach their physical limits, such as maximum
storage capacity or computing power. This also applies to components
such as the network distributor and the power supply unit. With the help
of organizational measures and the creation of technical redundancies,
this fail-safety is to be guaranteed. This is also referred to as system
availability.

#### Status and information display

For a direct perception of current system values such as host name,
system time, processor and case temperature, a visual information
display should be available in the form of a display. These important
and system-critical values should be immediately and directly readable
without the help of technical means, such as a keyboard or the
connection of an external monitor. Furthermore, this display should have
a backlight to be readable even in dark rooms or with little to no
light.

#### Cooling

Passive cooling and optimized case ventilation are important points that
have to be considered in the design. The advantage of passive cooling
should be used to save energy on the one hand and costs on the other.
Active cooling is nevertheless necessary to ensure the supply of cold
air and the removal of warm air. Likewise, a basic law of physics, the
so-called chimney effect, must not be lost sight of during further
planning. This states: warm air rises, cold air remains on the ground.

#### Air flow and heat dissipation

The processors of the individual nodes and integrated circuit modules
(IC) or internal circuit modules of the individual peripheral
components develop a certain amount of heat during operation. For a
correspondingly good removal of this warm air and to avoid heat
accumulation inside the case, this should be done in several stages and
can only be ensured with the help of an active case fan:

1.  Absorption of cold outside air at the front and transport to the
    passive cooling elements inside the housing.

2.  Dissipation of heat from the surface of the components (CPU, IC)

3.  Removal of heated air from the rear of the housing.

The design of the case should be adapted accordingly so that the
supplied air flow can optimally flow into the case, include all
components in its air channel as far as possible and discharge warm air
from the passive cooling elements out of the case again at a suitable
point.

#### Connections

Due to the compact design of the housing, planning and accommodating all
necessary connections poses a certain challenge. It is important to
avoid unnecessary cable lengths within the housing, to save space and to
ensure sufficient room for suitable air circulation. Connections should
therefore be located in the immediate vicinity of the components, as
should the connections of internal components such as power, network or
control cables. In addition, the following connections should be
available externally on the housing:

-   1x current
-   2x network
-   1x HDMI
-   2x USB

#### Modularity

The building block principle, also called modularity, is related to
future extensions or the connection of further cluster systems on a
modular basis. This means that it should be possible to combine several
cluster systems of the same type to form a larger cluster complex. The
prerequisite for this are interfaces. In this case, a second network
connection (see [Connections](#connections)). Modularity is also a prerequisite for the
planned scalability of the overall system and is therefore considered an
important point.

### Design decisions

The basic characteristics of this Raspberry Pi cluster are minimalism,
transparency and simplicity. Minimalism in architecture, be it in
building or model construction, is characterized by the reduction to
simple cubic forms. The goal is the formation of geometric and pure
forms, which is made possible with the help of transparent building
materials such as glass. Whereupon we come to the property transparency.
On the software side, transparency means that the user of this system
knows exactly how the cluster system works, how it scales or what
software is used. On the hardware side, it is clear which physical
components such as cables, network distributors or connectors are
connected to each other or whether systems emit visual signals.
Simplicity, on the other hand, stands for easy understanding of the
system. It should, at first glance, imply the usefulness of this system,
from the point of view of an ignorant as well as affine user.

#### Minimalism and transparency: cube

We decide on a compact and portable design in the form of a cube and
christen the system with the name PiCube. The Pi, as in Rasperry Pi,
stands for Python Interpreter and signals that this system supports the
Python programming language or is generally supported by all common
operating systems like Raspbian or CoreOS. Python convinces with its
minimalistic and easily understandable programming style and also
contributes to the overall concept of this system. The English word Cube
means cube. Another idea for the naming is PiKube, where Kube stands for
the cluster management system used and at the same time comes from
Kubus, the ancient Greek kybos or the Latin cubus for cube. However,
since the design of the cube case does not have exactly equal faces, we
decide to use PiCube, since a cube is a regular hexahedron. A hexahedron
has six faces of equal size.

#### Simplicity: Elastic Clip Concept

In order to allow easy assembly and reassembly, without the use of
additional tools or fastening screws of any kind, the Elastic Clip
concept by Patrick Fenner was used. This concept allows to create a slim
and elegant design. For this purpose, we use acrylic glass, which is
transparent, light and flexible, as the construction material for the
housing. The clips give the possibility to connect the single acrylic
glass sides of the cube in a 90 degree angle. The real highlight here is
the automatic snap-in of the clip connections in the insertion openings
provided for this purpose. Removal or dismantling of the cube walls is
done by bending the clip, so that the connections can be released. [^53]

{{< image src="media/image2023.png" caption="Source: Own representation based on (Laser-Cut Elastic-Clips, 2017) <br> **Figure 19**: *Illustration of clip dimensions with and without force application.*" >}}

$F$ stands for the force applied to the clip. The clip dimensions are:

$a$ = 4mm, $b$ = 2m, $d$ = 2mm, $l$ = 25mm

Depending on the nature, flexibility and material of the acrylic glass
used, the clip may break if too much force is applied. The problem is
that the maximum force is applied to the upper right $F$ on the upper
right end of the clip, which will break if it is too short. $l$ the clip
breaks if it is bent too much or subjected to too much load. To
counteract this, there is a simple way to distribute the load on the
clip at maximum force by widening the cut. This reduces the risk of the
clip breaking. [^54]

{{< image src="media/image213.png" caption="Source: Own representation based on (Laser-Cut Elastic-Clips, 2017) <br> **Figure 20**: *Widening the incision site increases durability.*" >}}

Due to the material nature and flexibility of acrylic glass, the use of
this elastic clip concept is most suitable. If other materials such as
medium-density fiberboard (MDF) or simple wood are considered, it must
be noted here that due to the unidirectional or one-sided wood fibers,
much weaker resistance and thus less flexibility is offered to bend the
clip elastically. Use in conjunction with MDF is an alternative, but the
clip will inevitably break under too much load.

### PiCube

#### 2D model and logo

Inkscape is a professional software for editing two-dimensional (2D)
vector graphics. With the help of this software we create a 2D graphic
of the housing plates. Prior to manufacturing the enclosure, we sketch
and produce a two-dimensional template to determine the exact dimensions
for connections, fasteners, and required air slots. Likewise, we are
able to determine the exact cutting dimensions and positioning for the
elastic clips (see [Design decisions](#design-decisions)) to the millimeter. [^55]

In the following figure, all six sides are shown and marked accordingly.
L for left side, R for right side, F for front, T for top, G for bottom,
and B for back. The back contains the connectors for HDMI, network and
power, as well as the ventilation grilles and mounting holes for the
case fan.

The front has inlets for the double USB socket and the LCD display.
Ventilation grilles are also broadly sketched here. All other sides,
except the top, also have mounting holes for the rest of the components
like the switch, USB charger and the additional side air intakes.

{{< image src="media/image2216.png" caption="Source: Own representation. <br> **Figure 21**: *2D model design of the housing including all connections.*" >}}

#### 3D model and connections

To ensure that all the required connections (see
[Connections](#connections)) can be correctly
attached to the housing, we use the Rhinoceros 3D program to create
three-dimensional graphics. A 3D model helps to better visualize and
represent the housing to be constructed. Physical components can be
inserted, rotated or scaled in size. Due to the exact specification of
the dimensions of the individual components, a correspondingly realistic
model is created before it is manufactured. The rendered graphics (see
**Figures 22 and 23**) show the overall design with all the individual
components installed, marked in different colors for better
representation. Blue marks the USB components and light gray the case
fan. The color dark gray represents network components and red the HDMI
port.

{{< image src="media/picube2.jpg" caption="Source: Own representation. <br> **Figure 22**: *3D model design including components with a view of the front of the housing.*" >}}

{{< image src="media/picube3.jpg" caption="Source: Own representation. <br> **Figure 23**: *3D model design including components with view of the back of the housing.*y" >}}

#### Components and costs

For the construction of this prototype, the individual components are
obtained from various suppliers or mail-order companies such as Amazon
and eBay. The acrylic glass plates are milled in collaboration with
Andreas Gregori from MAD Modelle Architektur Design. For the production
of the case we do not use laser cutting, but normal milling. This has
the advantage that we avoid traces of smoke or sclerosis, which occur
during laser cutting due to high temperatures. Milling has another
advantage and that is the possibility of surface milling. Thus, we are
able to engrave the PiCube logo (see **Figures 21 and 24**) into the upper
and front cube surface.

The five Raspberry Pis and the matching 8 GB SD cards make up the
largest part of the costs, amounting to 246.75 EUR. The middle part of
the costs, which ranges between 13.75 and 22.99 EUR, is taken up by
the Gigabit switch, the USB charger and the USB cables. The rest of the
hardware, such as the LCD display, cables and plastic screws, are in the
price range of 0.65 to 9.80 EUR.

| **Unit(s)** | **Component**                                       | **Unit price**  |
| :---------: | :-------------------------------------------------- | :-------------- |
|      5      | Raspberry Pi 3 Model B                              | 42.70 Euro      |
|      5      | SanDisk Ultra 8 GB microSDHCUHS -I Class 10         | 6.65 Euro       |
|      1      | Edimax ES-5800G V2 Gigabit Switch (8-Port)          | 22.99 Euro      |
|      1      | Anear 60 Watt USB Charger (6-Port)                  | 18.99 Euro      |
|      5      | Micro USB cable (15 cm)                             | 2.75 Euro       |
|      5      | Transparent power cord (15 cm)                      | 0.79 Euro       |
|      2      | RJ45 jack (female-male)                             | 2.74 Euro       |
|      1      | Dual USB 2.0-A female-male connector                | 4.53 Euro       |
|      1      | LCD display module 1602 HD44780 with TWI controller | 4.45 Euro       |
|      1      | AC 250V 2.5A IEC320 C7 socket                       | 1.39 Euro       |
|      1      | C7 power cable 90 degree angled (1 meter)           | 3.26 Euro       |
|      1      | Cable jumpers (female-female. 40 wires. 20 cm)      | 0.65 Euro       |
|     56      | M3 Nylon Hex Spacer Nuts and Bolts White            | 0.05 Euro       |
|      1      | Antec TRICOOL 92mm 4-pin case fan                   | 9.80 Euro       |
|      1      | Milling cut of the acrylic sheets                   | 20 Euro         |
|             | **Total price incl. VAT**                           | **358.79 Euro** |

**Table** **1**: *Listing of individual and total price of all components.*

Enclosed is a list of all purchased components with price status as of
November 30, 2017 (see **Table 1**). According to the list, the price of all
required components for the cluster amounts to a total of 358.79 EUR.

## Construction

{{< admonition info Note >}}
Check out the next part [Conception, Construction and Evaluation of a Reaspberry Pi Cluster (3/4)](../conception-construction-and-evaluation-of-a-raspberry-pi-cluster-3/)
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

