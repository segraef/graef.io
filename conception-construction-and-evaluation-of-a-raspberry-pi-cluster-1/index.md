# Conception, Construction and Evaluation of a Raspberry Pi Cluster (1/4)


The goal of this work is to create an affordable, energy efficient and portable mini-supercomputer. Ideally, a cluster computer with little or no carbon footprint, individual elements that are inexpensive to replace, and a portable system that can be easily disassembled and reassembled.

<!--more-->

## Introduction

Raspberry Pis are revolutionizing the computer industry. Originally developed to provide low-cost computers to schools, they are expanding far beyond their intended use. This inexpensive technology can be used to accomplish previously unexplored tasks. One such technology is a cluster computer that can run parallel jobs. Many systems built for parallel computing tasks are either expensive or unavailable outside of academia. Supercomputers are expensive to purchase as well as to use, power, and maintain. Although average desktop computers have come down in price, the cost can still become quite high if they require a larger amount of computing power. In today\'s world of information technology (IT), it is not new to be confronted daily with new technologies such as cloud computing, cluster computing or high-performance computing. All these terms are approaches that are intended to simplify people\'s work and lives. Cloud providers such as Microsoft or Amazon make these types of technologies available to customers in the form of services for a fee. Users thus have the opportunity to use the computing power of these technologies without having to buy them at a high price. The advantage here is the almost unlimited scaling of resources. Distributed computing, an infrastructure technology and basis for the provision of cluster computers via the Internet, is used to meet increasing resource demands. By interconnecting and adding remote systems, computing power and performance can be dynamically scaled and provided in theoretically unlimited quantities.

## Motivation and objective of the work

Unlimited computing power implies the solution approach to be able to solve seemingly unsolvable and complex problems, such as the simulation of black holes or the calculation of the Milky Way. Expensive supercomputers are oversized when it comes to testing new applications for high-performance computers or solving complex problems. In this work, we address the question of whether we can create an independent and comparable but also less expensive system with few resources, which allows us to solve complex problems in the same way. 24 years ago, Donald Becker and Thomas Sterling started the Beowulf project to create a low-cost alternative but also a powerful alternative to supercomputers. Based on this example, the idea has arisen to pursue the same principle on a smaller scale. The goal of this work is to create an affordable, energy efficient and portable mini-supercomputer. Ideally, a cluster computer with little or no carbon footprint, individual elements that are inexpensive to replace, and a portable system that can be easily disassembled and reassembled. A Raspberry Pi is ideal for this purpose because of its low price, low power consumption, and small size. At the same time, it still offers decent performance, especially when you consider the computing power offered per watt.

## Procedure

This paper is divided into 5 parts. The first part is dedicated to the terminological clarification of background information on all technologies involved and how they are related to the cluster. Based on this, the second part clarifies the conceptualization, design, and requirements placed on the system. The main part deals with the construction of the Raspberry Pi cluster and thus forms the practical component, in which design decisions are illustrated and the construction is explained. Following this, important factors such as scalability, performance, cost and energy efficiency are discussed and evaluated. Different use cases are addressed and the technical possibilities are considered. Finally, evaluated evaluations are summarized, limitations are pointed out and future extensions are presented.

## Background

This chapter covers the basic technologies that form the basis of parallel and distributed systems. These technologies build on each other, as in a layer system, and are dependent on each other. Architectures and techniques based on this, such as virtualization or cluster computing, in turn provide the basic framework for container virtualization and its management systems.

### Parallel and distributed systems

Until computers evolved into distributed computing systems, there have been fundamental changes in various computing technologies over the past decades, which we will briefly discuss in order to make the basic framework of parallel and distributed systems more understandable.

#### Amdahl\'s and Gustafson\'s law

At the beginning of this work, the theoretically unlimited increase of computing power was mentioned. Amdahl\'s law (named in 1967 after Gene Amdahl) deals exactly with this question, namely whether an unlimited increase in speed can be achieved with an increasing number of processors. It describes, how the parallelization of a software affects the acceleration of this. One divides thereby the software into not parallel, thus sequentially executable and parallel executable portions. Sequential parts are process initializations, communication and the memory management. These parts are necessary for the synchronization of the parallel parts. They form dependencies among themselves and are therefore not able to be executed in parallel. Parallel executable parts are the processors, which are used for computation. It is very important to estimate how much performance gain is achieved by adding a certain number of processing units in parallel working system. Sometimes it happens that adding a larger number of computing units does not necessarily improve the performance, because the expected performance tends to decrease or oversaturate if we blindly add more computing resources. Therefore, it is very important to have a rough estimate of the optimized number of resources to use. Suppose a hypothetical system has only one processor with a normalized runtime of $1$. Now we consider how much time the program needs in the parallelizable portion and denote this portion by $P$. The runtime of the sequential part is thus $(1 - P)$.

The runtime of the sequential part does not change, but the parallelizable part is optimally distributed to all processors and therefore runs N times as fast. This results in the following runtime formula: [^1]

$$\underset{\text{sequential}}{\overset{(1 - P)}{︸}} + \underset{\text{parallel}}{\overset{\frac{P}{N}}{︸}}$$

This is where the time gain comes from:

$$Time\ gain\ according\ to\ Amdahl\$$
$$= \ \frac{original\ duration}{\text{new\ duration}}\$$
$$= \frac{1}{(1 - P) + \frac{P}{N}}$$

Here N is the number of processors and P the runtime portion of the parallelizable program. Gene Amdahl called the time or also speed gain Speedup. With the help of a massive parallelism the time of the parallelizable portion can be reduced arbitrarily, the sequential portion remains unaffected thereby however. As the number of processors increases, the communication overhead between the processors also increases, so that above a certain number, they tend to be busy communicating rather than processing the problem. This reduces the performance and refers to this as an overhead in the task distribution. A program cannot be completely parallelized, so that all processors are always busy with work at the same time. No matter how many processor units are used and the proportion of applications that cannot be parallelized is, for example, one percent, the speedup can be a maximum of 100. Gene Amdahl thus concluded that it makes no sense to keep increasing the computing units in order to generate unlimited computing
power. [^2]

Amdahl\'s model remains valid until the total number of computing operations remains the same while the number of computing units continues to increase. However, if in our hypothetical simulation the job size increases while the number of computational units continues to increase, then Gustafson\'s law must be invoked. John Gustafson established this law in 1988, which states that as long as the problem being addressed is large enough it can be efficiently parallelized. Unlike Amdahl, Gustafson shows that massive parallelization is nevertheless worthwhile. A parallel system cannot become arbitrarily fast, but it can solve arbitrarily large problems in the same amount of
time. [^3]

#### Client-server model

Client-server models are the basic techniques for operating distributed systems. They describe the principle of how tasks and services, such as sending e-mail or providing web applications, are distributed within a network. The corresponding service is centralized on a specific computer, called a server, and the other machines (clients) can use this service. [^4]

{{< image src="media/image226.png" caption="Source: Own representation based on (Schill & Springer, 2007, p. 31) <br> **Figure 1**: *Illustration of the client-server model.*" >}}

Operating systems (OS) such as Red Hat Enterprise Linux or Windows Server use the above concept and thus provide a client-server system. This is done by establishing the connection to the server on the client side and providing access to services and resources on the server side. Within these operating systems servers are simple programs, which are usually started automatically and run passively in the background. In the Linux environment these programs are called \"daemon\", under Windows Server they are called \"service\". In practice, however, different types of these server services are usually encountered. Examples of this are: [^5]

-   **Mail server**: Communication service for electronic mail (e-mail).
-   **Web server**: Transmitting web pages to clients.
-   **File server**: A file server makes files available on a network.

####  Peer-to-peer

Peer-to-peer (P2P) systems are the opposite of client-server systems. In client-server networks, a server is not necessarily a specific computer. Server and client are referred to as roles in this context, since a computer can also act as a server and a client at the same time. In a P2P system, this distribution of roles does not exist; all computers have equal rights. A computer in a network is a peer because it can be a client and a server at the same time. It can both use and provide services. The functionality, the provision of a service, is therefore provided decentrally in a P2P system. [^6]

{{< image src="media/image37.png" caption="Source: Own representation based on (Schill & Springer, 2007, p. 31) <br> **Figure 2**: *Illustration of the peer-to-peer model.*" >}}

In contrast to the client-server concept, parallel and distributed systems are not based on P2P systems, but they have been part of the development process of grid and distributed computing and are therefore worth mentioning. [^7]

#### Grid Computing

The volume of data records in databases is increasing and will continue to increase in the coming years. Cluster systems (see [Cluster](#cluster)) were developed to handle the complex processing involved and have since become established. However, the demand for computing power and storage capacity is becoming ever greater, especially in scientific areas such as medicine and research or in commercial areas such as e-commerce or financial management. Due to global networking of scientific working methods and international cooperation, more and more information technologies and infrastructures are being interconnected to create collaborative working environments. [^8]

Grid computing is a distributed computing technique that aims to connect loosely coupled computers and clusters and combine the computing power of all distributed resources into a virtual supercomputer. The basis for integrating these location-independent, cross-institutional, and autonomous resources is the use of existing network infrastructures such as the Internet. The major advantage over cluster systems is the aggregation and sharing of resources such as computers or databases across geographical boundaries. [^9]

Grid computing can be divided into the following classifications:

-   **Computing Grid**: access to distributed computing resources.
-   **Data Grid**: Access to distributed data volumes and storage capacity.
-   **Service Grid**: Access to distributed applications and services.

A computing grid is comparable to a power grid. For the consumer, everything that happens behind a socket is hidden, but he can conveniently use the power offered, the electricity. A computing grid is similar in comparison, it connects to the computing network and uses the computing power offered. High costs or lack of financial resources pose solving complex problems as a difficulty for scientific and economic institutions. But due to the possibility like, the bundling of resources of different organizations, it is possible to solve computationally intensive problems cost-efficiently. [^10]

#### Public Resource Computing

As an analogous counterpart to grid computing, public resource computing (PRC) and volunteer computing have emerged to harness hidden computing power using distributed computing.

The idea and background of this type of distributed computing are that the use of supercomputers is very cost-intensive, on the other hand processors of many computers, such as those of personal computers (PC), servers or smartphones are not fully utilized. Many users work on their PCs with programs that use only part of the total processor power. To make these unused computing resources usable, a corresponding software client is installed on the respective PCs or servers, which establishes the connection to a computing grid, takes over task distribution and makes unused computing power available. [^11]

The software platform Berkeley Open Infrastructure for Network Computing (BOINC) enables the use of this unused computing power of thousands of computers. Examples of computationally intensive PRC projects and complex problems include creating an accurate three-dimensional (3D) model of the Milky Way, searching for extraterrestrial radio waves, and calculating gravitational waves. An example of a special research project that exploits the benefits of grid computing, and can only be realized using it, is grid-based computer simulations of gravitational waves generated by the merger of two singularities (black holes) (see **Figure 3**). [^12]

Other well-known RPC projects using BOINC are: [^13]

-   **SETI** **\@home** (Search for Extra-Terrestrial Intelligence at home): study of radio signal data from the Arecibo Observatory radio telescope in Puerto Rico used as evidence of extraterrestrial technology.
-   **MilkyWay\@home**: research in modeling and determining the evolution of the Milky Way Galaxy.
-   **Einstein\@home**: The project examines data collected by the LIGO and GEO600 gravitational wave detectors for evidence of periodic sources, such as rapidly rotating neutron stars, which are the gravitational equivalent of pulsars (pulsating radio sources).

{{< image src="media/image46.jpeg" caption="Source: (Kroeker, 2011, p. 15) <br> **Figure 3**: *Grid-based simulation of gravitational waves generated by the merger of two black holes.*" >}}

It is worth mentioning the successes and cost savings achieved through the use of public resource or volunteer computing. Certainly it is possible to solve complex problems through high performance and supercomputers but not with such a small part of costs. For example, the University of Westminster, based in London, has been able to show savings of around £500,000 by using a BOINC supercomputer. [^14]

#### Distributed Computing

Distributed computing or distributed systems, as defined by Andrew S. Tanenbaum, is a collection of independent computers that appear to their users as a single unified system. Distributed computing resource processing deals with the coordination of these distributed computers. In contrast to cluster systems, most computers have different hardware and operating systems. In some cases, resources and programming languages vary greatly. The basic requirement for these machines to work together and exchange data is that they are connected via a network. [^15]

The computing technologies mentioned so far fall under the umbrella term distributed computing. **Figure 4** shows how these technologies are classified collectively into distributed computing and, among others, into client-server computing and peer-to-peer.

{{< image src="media/image5.png" caption="Source: Own representation based on (Bengel, Baun, Kunze, & Stucky, 2008, p. 4). <br> **Figure 4**: *Schematic representation of computing technologies.*" >}}

Communication networks such as the Internet form the basis for distributed systems and give the opportunity to connect geographically distant computers. The following prerequisites must be observed to prevent problems: [^16]

- **Concurrency**: Concurrency in the execution of programs must be ensured. As soon as services and applications are executed in a network of computers, this usually happens at different times and independently of other computers. To ensure this concurrency of applications, it must be possible to scale the system, which means that additional computers can be added to the network as the demand for resources increases.
- **Time synchronization**: As soon as systems act together, messages must be exchanged so that appropriate coordination is possible. Messages such as \"System A is performing this action\" and \"System B is performing this action\". For proper coordination of these messages, timestamps are needed to enable proper sequencing of these messages within the distributed system. One method of synchronizing system time is to synchronize with external atomic clocks outside of distributed systems or to use a shared time server that uses the Network Time Protocol (NTP), a standard protocol for synchronizing clocks on the Internet.
- **Partial failure**: Any system, no matter how well secured, can fail, even if it has an availability of 99.9%. The probability of a failure is still 0.1%, which is already a very large amount for a high number of systems. Care must therefore be taken to ensure that there is no single point of failure (SPOF), the failure of which would result in the failure of the entire system. Other prerequisites, especially in terms of security, that must be taken into account are the use of firewalls and virtual private networks (VPNs). As soon as sensitive data and information are transferred from services on the Internet via distributed resources, these can fall victim to network attacks. Without appropriate security mechanisms, information can be stolen or even falsified. With the help of firewalls, only certain resources can be granted access by means of defined security policies. Using a VPN, entire segments of distributed systems can be isolated and compartmentalized by encrypting the entire network data transmission. [^17]

#### Cloud computing

Cloud computing is used as a term to represent this vision of computing as a service. A cloud is defined as a set of Internet-based application and computing services so that local data storage and application software can be largely or completely dispensed with. From a technical perspective, cloud computing describes the approach of making IT infrastructures, such as physical or virtual hardware, available via a computer network without the user or cloud user having to install anything on their own computer. Cloud providers such as Microsoft or Amazon make these types of technologies available to customers in the form of services for a fee. Users thus have the option of using the computing power of these technologies without having to buy them at a high price. By providing and managing the cloud infrastructure through the provider, the overall costs are reduced and optimized to a minimum.

The main advantages of using cloud computing are the almost unlimited scaling of resources, such as computing units or storage capacities. If, for example, a user wants to use a very large quantity of cloud services, it is only a question of cost. The higher a service scales, the higher the costs borne by the customer. [^18]

Grid computing is seen as the forerunner of cloud computing, although the focus is more on scientific projects and the system is decentralized, i.e. shared. In contrast to grid computing, cloud computing is, from a first perspective, a centralized solution. From a technical point of view, however, and depending on how a cloud service is used by the user, cloud resources can be globally distributed and must communicate with each other in a network for this purpose. This in turn is similar to the approach of grid computing, since a corresponding coordination of these distributed resources is necessary. The most important providers of cloud computing services are currently Amazon Web Services (AWS), Microsoft with its Azure cloud platform, and Rackspace. [^19]

In practice, the following three abstraction or business models have become established for the provision of cloud services: [^20]

- **On-premise**: On-premise means on the customer\'s own premises or locally on site. The customer is responsible for managing its own IT infrastructure, which it usually administers in its own data center and on its own hardware.
-   **PaaS** **- Platform as a Service**: The maintenance and management of hardware, operating systems and runtime environments for computer programs is taken over by the cloud provider. The user focuses only on his applications. A typical example of PaaS is scalable SQL databases (structured query language).
-   **IaaS** **- Infrastructure as a Service**: The entire infrastructure consisting of network, storage, server hardware and virtualization layer (see [Container Management Systems](#container-management-systems)) is provided by the cloud provider. The user assumes responsibility for the upper layers such as the operating system and applications.
-   **SaaS** **- Software as a Service:** In this model, the entire hardware and software infrastructure is offered and managed. The user thus has the option of directly using software services, such as web servers or e-mail, without any effort.

The figure below shows a breakdown of the business models mentioned. Here, blue denotes the company\'s own share of the administration effort. Neutral stands for the segments which the cloud provider manages and administers.

{{< image src="media/image614.png" caption="Source: Own representation based on (Technet, 2018) <br> **Figure 5**: *Comparison of the different cloud computing models.*" >}}

As soon as the term cloud is mentioned, it predominantly refers to a specific usage model of cloud computing. The various types of these usage models are defined below: [^21]

- **Private cloud**: The English term \"private\" translates into German as \"privat\" and, in the context of cloud, stands for \"not for the public\". A company uses a private cloud in a secure environment such as its own internal network. This does not necessarily mean that the IT infrastructure used is the property of the company, as it can also be provided by third parties. Private merely clarifies that a company is the sole user of this model. This has the advantage that it retains control in terms of data protection, even if third-party providers such as Amazon or Microsoft manage private cloud environments.
- **Public cloud**: A public cloud provides access to abstracted IT infrastructures and services for a large number of users. Customers can use services and infrastructures via the Internet. Examples are file hosting services such as Google Drive from Google Inc. or Dropbox from Dropbox Inc.
- **Hybrid cloud**: A hybrid form of the two variants mentioned above is the hybrid cloud. Users are offered the option of processing business-critical data with a focus on data protection in private cloud environments. Non-sensitive data is made available in the public cloud using cloud services such as IaaS or PaaS on the Internet. Hybrid clouds offer a further advantage in that performance peaks occurring at short notice are compensated for by shifting services from the private to the public cloud. Hybrid clouds enable the gradual merging of public and private cloud services in order to be able to utilize existing infrastructure hardware for as long as possible.

**Figure 6** shows an overview of private, public and hybrid cloud environments and illustrates the relationship between a private and public network. For example, a private network is a VPN, while the Internet belongs to the public network segment.

{{< image src="media/image727.png" caption="Source: Own representation based on (Bedner, 2012, p. 37); (Matros, 2012, p. 67) <br> **Figure 6**: *Relationship between public, private and hybrid cloud models.*" >}}

Other noteworthy business models in which cloud computing is subdivided are community cloud, virtual private cloud and multi-cloud, which we will not discuss in detail in this paper.

### Cluster

A cluster is a computer network and usually refers to a group of at
least 2-n servers, also called nodes. All nodes are connected to each
other via a local area network (LAN) and form a logical unit of a
supercomputer. Gregory Pfister defines a cluster as follows: [^22]

*\"A cluster is a type of parallel system that consists of
interconnected whole computers and is used as a single, unified
resource. "* [^23]

Clusters are the approach to achieving high performance, high
reliability, or high throughput by using a collection of interconnected
computer systems. Depending on the type of setup, either all nodes are
active at the same time to increase computing power, or at least 1-n
node is passive so that it can stand in for a failed node in case of
failure. For data transmission, all servers are connected to each other
via at least two network connections to a network switch. Two network
connections are typical, since on the one hand the switch is excluded as
SPOF, and on the other hand to be able to realize a higher data
transfer. [^24]

With reference to the current Top 500 list of the world\'s fastest
computers, the term supercomputer is absolutely appropriate. It is clear
that several cluster systems are among the ten fastest computers in the
world. Computer clusters are used for three different tasks: providing
high availability, high performance computing and load balancing. [^25]

#### Shared and distributed storage

According to the von Neumann architecture, a computer has a shared
memory that contains both computer program instructions and data.
Parallel computers are divided into two variants in this respect,
systems with shared or distributed memory. Regardless of which variant
is used, all processors must always be able to exchange data and
instructions with each other. The memory access takes place via a
so-called interconnect, a connection network for the transfer of data
and commands. The interconnect in clusters is an important component for
exchanging and communicating data between management and load
distribution processes. [^26]

In systems with shared memory, all processors share a memory. The memory
is divided into fixed memory modules that form a uniform address space
that can be accessed by all processors. The von Neumann bottleneck comes
into play here, which means that the interconnect, in this case the data
and instruction bus, becomes the bottleneck between memory and
processor. Due to the sequential or step-by-step processing of program
instructions, only as many actions can be performed as the bus is
capable of. As soon as the speed of the bus is significantly lower than
the speed of the processors, the processors repeatedly have to wait. In
practice, the waiting time is circumvented by the use of buffer memories
(cache), which is located between the processor and the memory. This
ensures that program commands are available to the processor quickly and
directly. [^27]

{{< image src="media/image86.png" caption="Source: Own representation based on (Bauke & Mertens, 2006, p. 22); Cf. (Christl, Riedel, & Zelend, 2007, p. 5) <br> **Figure 7**: *Parallel computers with shared memory connected via the data and instruction bus.*" >}}


**Figure 7** shows the representation of memory (M) and processors (P)
connected via the interconnect.

Computer systems with distributed memory, on the other hand, have a
separate memory for each processor. In this case, a connection network
is required. As soon as a shared memory is dispensed with, the number of
processors can be increased without any problems. By using a distributed
memory, each processor gains the upper hand over its address space,
since it is allocated its own local memory. Similar to distributed
memory, communication takes place via an interconnect, which in this
case is a local network. The advantage of computer systems with
distributed memory is the increase in the number of processors, but the
disadvantage lies in the disproportion between computing and
communication performance, since the transport of data between CPU
(Central Processing Unit) and memory is much slower. The bottleneck is
not in the bus as with distributed memory, but in the local network.
[^28]

{{< image src="media/image915.png" caption="Source: Own representation based on. (Bauke & Mertens, 2006, p. 23); (Christl, Riedel, & Zelend, 2007, p. 5) <br> **Figure 8**: *Parallel computers with distributed memory, connected via a local area* network." >}}

As soon as processor systems are operated with shared memory, through
the use of multi-core processors, the complexity and expense of the
electronics to be implemented increases. This consequently entails
higher costs. A single system with, for example, 128 multicore
processors is very expensive and is therefore out of the question for
massively parallel applications. It is far more cost-effective to
operate 128 PCs, for example, with the same hardware, each with one
processor and distributed memory.

#### Message Passing Interface

Message Passing Interfaces (MPI) is a standardized and portable message
passing standard for message transmission between cluster nodes with
distributed memory (see **Figure 9**). This concept was developed by a
group of researchers from academia and industry to enable the
development of a variety of parallel computing architectures. The
standard defines syntax and semantics that are useful to a wide variety
of users. It is not a standardized protocol, but acts as a programming
interface for serial code used by the C and Fortran programming
languages. MPI is the most widely used model for parallel and concurrent
programming today. Currently used MPI implementations are MPI/Pro and
Local Area Multiprocessor (LAM) MPI. Both implementations are now fixed
components of Linux distributions. Another message-based model is the
Parallel Virtual Machine (PVM) platform. This allows several computers
with a Windows or Linux operating system to be combined to form a
parallel system with distributed memory. [^29]

{{< image src="media/image1031.png" caption="Source: Own representation based on (Bauke & Mertens, 2006, p. 45) <br> **Figure 9**: *Message transmission between cluster nodes via the interconnect.*" >}}

#### High-Availibility Cluster

There are many different application scenarios for clusters. The most
popular uses are high-availability (HA), high-performance computing
(HPC) and load balancing (LB). These types of computer networks are
subdivided as follows in the diagram below.

{{< image src="media/image118.png" caption="Source: Own representation based on. (Networked Computing: Fundamentals and Applications, 2018) <br> **Figure 10**: *Subordination of the different cluster types.*" >}}

High availability cluster or failover cluster pursues the goal of
avoiding one or more single points of failure. In a cluster, a specific
system component is defined as SPOF as soon as it is designed as
non-redundant. A failover cluster is a group of servers configured so
that if one or more servers fail, another server automatically takes
over their service and continues processing. Each server in the cluster
has at least one other teammate, which functions as a so-called standby
server or partner server. The simplest variant of an HA cluster is
usually found in the 2-node solution, which is either symmetrically or
asymmetrically structured, depending on the architecture. An
asymmetrically structured cluster is an active/passive cluster, i.e. as
soon as one of the nodes has a fault, its passive partner node steps in
and takes over its services and function. A symmetrical active/active
cluster, on the other hand, keeps both server nodes active. In this
case, various services are shared between the two nodes for load
balancing. In this case, high availability and load balancing are
provided at the same time.

If one of the nodes fails, the active partner takes over its services
and the cluster remains available, not highly available but still in a
running mode. [^30]

For a standby server to be able to step in as an active server at all,
it must use a certain technique to determine that its active partner
server is no longer functioning. This is usually done by a so-called
heartbeat mechanism. This typically runs as a service on both server
nodes. The communication between the services runs over a local,
dedicated as well as redundant network. They communicate with each other
and check each other for signs of life - their heartbeat. As soon as
there are more than 2 nodes in a cluster, they also monitor each other
using various heartbeat techniques. Using push heartbeat, active servers
send signals to their respective standby servers at a fixed interval. If
one of the standby servers no longer receives a signal, it assumes that
its partner has failed and takes over the active role. Based on a pull
heartbeat, the standby server sends a certain number of requests to its
active partner. If the limit of these requests is reached without a
valid response from its partner, the partner takes over its services and
thus assumes the active part. [^31]

#### High-Performance Computing Cluster

The goal of HPC clusters is to process complex computing tasks or
simulation applications, in parallel on all cluster nodes. The
combination of all cluster nodes thus results in immensely high
computing power. All nodes must consist of homogeneous or similar
hardware components in order to simplify the administration effort and
maintenance and to be able to handle error sources more easily.
Furthermore, all nodes are connected to each other via a local network
and usually access a common data storage. As soon as an application
falls into one of the following categories, increased requirements are
placed on memory, network and processors:

-   computing-intensive applications
-   memory-intensive applications
-   communication-intensive applications

Because of this, these types of clusters must provide high resilience,
high availability, and high redundancy.

The use of high-performance clusters, takes place in particularly
computationally intensive applications, which are often used in the
scientific field. [^32]

**Figure 11** shows a typical architecture of an HPC cluster. All compute
nodes, also called working nodes, are connected via a local network by
means of a switch. In addition, there is a so-called shared storage.
This should not be confused with shared memory, which is only used in
processor systems (see [Shared and distributed Storage](#shared-and-distributed-storage)). Shared storage is used for the joint and simultaneous access and exchange or intermediate storage of data, such as specially required application data or databases. Master nodes or front-end nodes form the central work platform for users, on which they can log in via a console terminal and interact with the cluster. Computing jobs are initiated and applications installed via this platform. [^33]

{{< image src="media/image1220.png" caption="Source: Own representation based on (Bauke & Mertens, 2006, p. 52) <br>  **Figure 11**: *Typical construct of an HPC cluster.*" >}}

The first multiprocessor clusters trimmed to high-performance computing,
such as the VAX-11/780, came onto the market in 1977 under the name
VAXCluster or VMSCluster. The technology pioneer at that time was
Hewlett-Packard (HP), then under the company name Digital Equipment
Corporation (DEC). VAX stands for Virtual Address eXtension and, in
conjunction with the OpenVMS(virtual memory system) operating system
specially developed for this purpose, was a powerful tool in terms of
security, stability and low downtimes. Another notable example of an HPC
cluster that focuses more on low-cost high-performance computing is a
Beowulf cluster, which we will discuss in more detail in section [High-Performance Computing Cluster](#high-performance-computing-cluster). [^34]

#### Load-Balanced Cluster

Processing large amounts of data can lead to high loads on individual
nodes and must be managed. Server nodes have limited CPU, memory or
network capacity and cannot handle all loads on their own. Furthermore,
certain applications can only use or rely on a certain number of
processors. A load-balanced cluster is a computer network optimized for
load distribution. By distributing the data volumes over several
identical computers, the system is protected against total failures.
Likewise, the function of uniform performance availability is maintained
as capacity or computational requirements change during operation.
**Figure 12** shows a cluster-internal load balancer that distributes client
requests evenly across all servers. [^35]

{{< image src="media/image132.png" caption="Source: Own representation based on (Load-Balanced Cluster, 2018) <br> **Figure 12**: *A cluster-internal load balancer distributes client requests evenly to all servers.*" >}}

Management for intelligent distribution of data streams is handled by
these various distribution algorithms:

-   **Round-Robin algorithm**: All computational requests and loads are
    distributed evenly to each server, regardless of the current number
    of connections or response times. Round-robin is best suited when
    the servers in the cluster have equal processing capabilities based
    on hardware. Otherwise, some servers will receive more requests than
    they can handle, while others will consume only a portion of their
    resources.

-   **Weighted Round-Robin**: A weighted round-robin algorithm takes
    into account the different processing capabilities of each server.
    Users manually assign a performance weight to each server, and a
    scheduling sequence is automatically generated depending on the
    server weight. Requests are then routed to the different servers
    according to a round-robin scheduling sequence. This algorithm makes
    sense as soon as one or more servers have different performance
    strengths and maintain a performance equilibrium according to their
    weightings.

-   **Least-Connection Algorithm**: Only requests are sent to the server
    in a cluster based on which currently serves the fewest connections.

-   **Load-Based Algorithm**: Similar to Least-Connection, only certain
    requests are sent to the cluster; in a load-balanced algorithm, only
    requests are sent to servers that currently have the lowest load.

#### Beowulf Cluster

A Beowulf Cluster is a computer design that provides parallel processing
across multiple computers to create a low-cost, high-performance
supercomputer. The name Beowulf, translated into German, means werewolf
and, in this context, comes from an Old English heroic poem and has
since stood as a meaningful emblem of the power such a cluster can
deliver. The first clusters of this type were developed in 1994 by
scientists Thomas Sterling, Donald Becker and Phil Merkey to support the
Earth and Space Sciences Project (ESS) at the National Aeronautics and
Space Administration (NASA). [^36]

A Beowulf Cluster in practice is typically a collection of generic
computers, either commodity PCs or larger server systems, that are
independently procured, assembled, and connected via an internal
network. A Beowulf cluster consists of two types of computers, a main
(master) computer and multiple computer nodes. When a complex problem or
large data set is given to a Beowulf cluster, the master computer first
runs a program that breaks the problem into small pieces and sends one
piece at a time to each node to compute. When the nodes finish their
tasks, the master continuously sends more pieces to them until the
entire problem is solved. [^37]

When Thomas Sterling and Donald J. Becker started up their cluster in
1994, it consisted of sixteen Linux PCs, each with 100 MHz Intel DX4
processors. The individual computers were connected via Ethernet for the
required data exchange. Several benchmark tests were performed, which
test the performance of computers by measuring the number of floating
point number calculations possible per second. The measurement is given
in Floating Point Operations Per Second (FLOPS). The results of the
tests were surprising with 4.5 MegaFLOPS per node and 60 MegaFLOPS in
total. This corresponds to a speedup of 13.33 or an efficiency of 83%.
These results are impressive for the reason that this performance was
comparable to the supercomputers from IBM and Co. at the time. The
remarkable thing, however, is that this cluster was operated at only a
fraction of the cost of supercomputers. [^38]

The following figure shows a Beowulf cluster with 64 PC nodes, which was
developed by Phil Merkey at Michigan Technological University, also for
the ESS project.

{{< image src="media/image143.jpeg" caption="Source: Own representation based on (Beowulf Cluster Computing, 2018). <br> **Figure 13**: *A 64-node Beowulf cluster from Michigan Technological University.*" >}}

### Virtualization

Before we delve a little deeper into the chapter Container Management
Systems (see [Container Management Systems](#container-management-systems)), we will look at the basic technology of
virtualization. This foundational technology is necessary for the
operation of container technologies like Docker. In computer science,
virtualization refers to the creation of a virtual, rather than actual,
version of something, such as an operating system, server, storage
device, or network resources. Virtualization refers to a technology in
which an application or an entire operating system is abstracted from
the actual underlying hardware. In connection with container
technologies, a well-known type of virtualization, we distinguish here
between two techniques of virtualization, hypervisor-based and
container-based virtualization. [^39]

#### Hypervisor-based virtualization

A key application of virtualization technology is server virtualization,
which uses a software layer called a hypervisor to emulate hardware such
as memory, CPU, and networking. The guest OS, which normally interacts
with real hardware, implements this with a software emulation of that
hardware, and often the guest OS has no idea it is running on
virtualized hardware. The hypervisor decides which guest OS gets how
much memory, processor time and other resources from the host machine.
In this case, the host machine runs the host OS and the hypervisor. This
means each OS appears to have direct access to the processor and memory,
but the hypervisor actually controls the host processor and resources by
allocating what is needed by each OS. While the performance of this
virtual machine does not match the performance of the OS running on real
hardware, the concept of hypervisor-based virtualization works quite
well because most OSes and applications do not require full use of the
underlying hardware. This allows for greater flexibility, control and
isolation by eliminating dependency on a specific hardware platform.
Originally intended for server virtualization, the concept of
virtualization has expanded to applications, which is implemented using
isolated containers. [^40]

#### Container-based virtualization

Container virtualization or container-based virtualization is a method
of virtualizing applications but also entire operating systems.
Containers in this sense are isolated partitions that are integrated
into the kernel of a host machine. In these isolated partitions,
multiple instances of applications can run without the need for an OS.
This means that the OS is virtualized, while the containers that run
inside the system have processes that have their own identity and are
thus isolated from another process in another container. Software
running in containers communicates directly with the host kernel and
must be executable on the operating system and CPU architecture on which
the host is running. By not emulating hardware and booting a complete
operating system, containers can be started in a few milliseconds and
are more efficient than traditional virtual machines. Container images
are typically smaller than virtual machine images because container
images do not need to contain device drivers or a core to run an
operating system. Because of the compactness of these application
containers, they find their predominant use in software development.
Developers do not have to set up their development machines by hand;
instead, they use pre-built container images. These images are memory
maps of entire application structures that can be arbitrarily moved back
and forth between different host machines, also called shipping. This is
one of the reasons why container-based virtualization has become
increasingly popular in recent years. [^41]

Examples of container platforms are Docker from Docker Inc. and rkt from
the developers of the CoreOS operating system, with Docker enjoying
increasing popularity in recent years. Compared to virtual machines,
Docker represents a simplified solution to virtualization. [^42]

**Figure 14** shows the key difference between container-based and hypervisor-based virtualization.

{{< image src="media/image1528.png" caption="Source: Own representation based on (Containers vs. virtual machines) <br> **Figure 14**: *Comparison between hypervisor and container.*" >}}

### Container Management Systems

As soon as several containers are to be distributed and run on a
parallel system such as a cluster, it is necessary to use a container
management system. Such a system manages, scales and automates the
deployment of application containers. Well-known open source systems are
Kubernetes from Google or Docker Swarm. Another very well-known
container manager worth mentioning is the OpenShift software from
Redhat, but we will not discuss it further in this paper. These cluster
management tools play an important role as soon as a cluster has to take
care of tasks such as load balancing and scaling. In the following, we
will introduce the first two container managers mentioned and explain
their structure and use with containers.

#### Docker Swarm

Docker is an open standards platform for developing, packaging, and
running portable distributed applications. With Docker, developers and
system administrators can create, deliver, and run applications on any
platform, such as a PC, the cloud, or a virtual machine. Obtaining all
the necessary dependencies for a software application, including code,
runtime libraries, and system tools and libraries, is often a challenge
when developing and running an application.

Docker simplifies application development and execution by consolidating
all the required software for an application, including dependencies,
into a single software unit called a Docker image that can run on any
platform and environment. The Docker software, based on the Docker image
runs in an isolated environment called a Docker container, which
contains its own file system and environment variables. Docker
containers are isolated from each other and from the underlying
operating system. [^43]

One solution already integrated into Docker is Docker Swarm Mode. Docker
Swarm is a cluster manager for Docker containers. Swarm allows
administrators and developers to set up and manage a cluster consisting
of multiple Docker nodes as a single virtual system. Swarm mode is based
on Docker Engine, the layer between the operating system and container
images. Clustering is an important feature for container technology
because it creates a cooperative group of systems that provides
redundancy and enables failover when one or more nodes experience a
failure. A Docker Swarm Cluster provides users and developers the
ability to add or remove containers as compute requirements change. A
user or administrator controls a swarm through a swarm manager, which
orchestrates and deploys containers. **Figure 15** shows the schematic
structure and relationship between instances. [^44]

{{< image src="media/image169.png" caption="Source: Own representation. <br> **Figure 15**: *Structure and communication of the manager and worker instances.*" >}}

The Swarm Manager allows a user to create a primary manager instance and
multiple replica instances in case the primary instance fails, similar
to an active/passive cluster. In Docker Engine\'s swarm mode, the user
can provision so-called master nodes and worker nodes at runtime. [^45]

#### Google Kubernetes

The name Kubernetes comes from the Greek and means helmsman or pilot.
Kubernetes is known in specialist circles by the acronym K8s. K8s is an
acronym where the eight letters \"ubernete\" are replaced by \"8\".
Kubernetes provides a platform for scaling, automatically deploying and
managing container applications on distributed machines. It is an
orchestration tool and supports container tools such as Apache Mesos,
Packer, and including Docker. [^46]

A Kubernetes system consists of master and worker nodes, the same system
principle as Docker Engine, with manager instances named master. The
smallest unit in a Kubernetes cluster is a pod and runs in the worker
nodes. This pod consists of at least one or more containers. A worker
node can in turn run multiple pods. A pod is a worker process that
shares virtual resources such as network and volume among its
containers. [^47]

{{< image src="media/image1721.png" caption="Source: Own representation based on (Pods and Nodes, 2018) <br> **Figure 16**: *Granular representation of node, pod and container.*" >}}

The following services run on the individual worker nodes: [^48]

-   **Docker**: providing the container engine.
-   **kubelet**: Agent, which takes over the management of the
    containers.
-   **kube-proxy**: Service that handles network management and port
    forwarding to and from containers.

The main nodes take care of the management and controlling of all nodes.
The following services are divided here: [^49]

-   **kube-apiserver**: User interface to the nodes.
-   **etcd**: Storage location of the cluster configurations, the
    so-called key-value store.
-   **kube-scheduler**: The scheduler determines, depending on the
    available resources, which worker nodes are assigned which pods.
-   **kube-controller-manager**: This manager service takes over the
    controlling functions and monitors if all nodes are working, which
    pods are assigned to which service and manages port forwarding.

### Raspberry Pi

Credit-card-sized single-board computers (SBCs) such as the Raspberry
Pi, developed in the UK by the Raspberry Pi Foundation, were originally
intended to promote computer science education in schools. Acronyms like
\"RPi\" or the abbreviation \"RasPi\" or \"Pi\" for the Raspberry Pi are
mostly common here. Like smartphones, single-board computers are
equipped with ARM processors (Advanced RISC Machines). Before the
development of ARM in 1983, there were mainly CISC and RISC processors
on the market. CISC stands for Complex Instruction Set Computer.
Processors with this architecture are characterized by extremely complex
instruction sets. Processors with RISC (Reduced Instruction Set
Computer) architectures, on the other hand, have a restricted
instruction set and therefore also operate with low power requirements.
The Pi\'s board is equipped with a system-on-a-chip (SoC, i.e.
single-chip system), which has the identifier BCM2837 from Broadcom. The
SoC consists of a 1.2 GHz ARM Cortex-A53 Quad Core CPU, a VideoCore IV
GPU (Graphics Processing Unit) and 512 MB of RAM. It does not include a
built-in hard drive, but uses an SD card for booting and permanent data
storage. It has an Ethernet port based on the RJ45 standard for
connecting to a network, an HDMI port for connecting to a monitor or TV,
USB (Universal Serial Bus) ports for connecting a keyboard and mouse,
and a 3.5 mm jack for audio and video output. [^50]

{{< image src="media/image1833.png" caption="Source: Own representation based on (Merkert, 2017, p. 12) <br> **Figure 17**: *Illustration of a Raspberry Pi 3 Model B and its components.*" >}}

An average of 35 EUR is the price one pays for a Raspberry Pi, which
makes it economically suitable for use and integration into a cluster
system, since the unit costs for individual nodes are low. [^51]

General Purpose Input Output (GPIO) is the name for programmable inputs
and outputs for general purposes. A Raspberry Pi has a total of 40 GPIO
pins, twelve of which are for power supply and 28 of which serve as an
interface to other systems in order to communicate with or control them.
GPIO pins 3 and 5 (see **Figure 18**) enable devices such as an LCD display
to be addressed by means of an Inter-Integrated Circuit (I2C), a serial
data bus.

{{< image src="media/image1910.png" caption="Source: Own representation based on (Raspberry Pi 3 GPIO Pin Chart with Pi, 2018) <br> **Figure 18**: Illustration of the different *GPIO pins of the Raspberry Pi.*" >}}

## Conception and design

{{< admonition info Note >}}
Check out the next part [Conception, Construction and Evaluation of a Reaspberry Pi Cluster (2/4)](../conception-construction-and-evaluation-of-a-raspberry-pi-cluster-2/)
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


