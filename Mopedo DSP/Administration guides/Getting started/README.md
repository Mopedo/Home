---
permalink: Mopedo%20DSP/Administration%20guides/Getting%20started/
---

# Getting started

The integration process consists of the following steps:

## 1\. Business agreement

The first step is to sign a business contract with Mopedo, which will give you an account and password for accessing the Mopedo platform. The account and password will ensure that only you can bid using your assigned seat id. For more information about the business agreement, please contact `info@mopedo.com`. When you have your account credentials, you are ready to setup your DSP instance.

## 2\. Choosing a server for the DSP

For bidding to work fast and reliably, it's important that the DSP is located geographically close to the server that broadcasts the bid requests. Usually, the DSP has 100 milliseconds or less to receive the bid request, evaluate it and return a bid response. If the network latency is too high, the DSP will not be able to respond in time, and will therefore not win any auctions. How close is close enough, however, depends on how the DSP is to be used. If you have a server and want to test latency, it's easy to run a latency test and see if the results are adequate for your use case.

The optimal solution, however, is to place the DSP on a **Google Cloud** VM instance in Google's western Europe datacenter (Belgium). That is where the Mopedo backend is located, so DSPs running on the same datacenter have optimal network latency. Mopedo provides a [guide for how to set up a Google Cloud VM instance](../Google%20Cloud%20setup%20guide).

We have also had DSPs set up at Amazon AWS in Frankfurt, which works fine.

### System requirements:

Technical spec.  | Minimum requirement
---------------- | ---------------------------
Operating system | Windows Server 2012 or 2016
Cores            | 2
RAM              | 8 gigabytes
Disks            | 120 gigabytes

This configuration is adequate for most new client DSPs, but as you increase your purchased volume, the server may need to be upgraded as well.

## 3\. Installing the Mopedo DSP

When you have a server on which you would like to run the Mopedo DSP, follow the steps described in the [Mopedo DSP Installation Guide](../Installation%20guide) to install the DSP software.

## 4\. Setting up firewall rules

When installing the DSP you created a [configuration file](../Configuration%20guide) in which, among other things, three network ports were selected. For the DSP to work properly, we need to open these ports in the Windows firewall, as well as any other firewalls active for the DSP server. We need to open the `UdpPort` for incoming and outgoing UDP traffic and the `HttpPort` and `RESTPort` ports for incoming and outgoing TCP traffic. Feel free to change any of these ports in the configuration file – the Mopedo backend will only communicate with the DSP over the `UdpPort` and `HttpPort` ports, and is automatically notified when ports change in the configuration.

## 5\. Securing the REST API

The [REST API](../../Developer%20guides/API%20reference/API%20reference%20overview) of the Mopedo DSP is a powerful interface, so it's important that proper security measures are in place to protect the API from unauthorized use. It's recommended to always:

1. Use [API keys](../../../RESTar/Administering%20a%20RESTar%20API/API%20keys) for authentication
2. Use HTTPS for all requests, by [setting up a reverse proxy](../IIS%20reverse%20proxy%20setup%20guide) on the DSP server

## 6\. Website integration and user matching

Once your DSP instance is up and running, you will begin receiving bid requests from the Mopedo backend. The `User` objects contained within these bid requests may be unknown to you, but you can still bid on them if you want to. To add your own users, you need to set up [user matching](../../Feature%20guides/User%20matching) from one or more websites where you want to record activity.

## 7\. Testing

The final step of the integration is to create a test campaign, match some test users and test the solution from user matching to bidding. One common way to do this is to **(1)** user match a browser you currently use, **(2)** assign some unique segment to the [`UserExtension`](../../Developer%20guides/API%20reference/Mopedo.ClientData/UserExtension) object belonging to the [`User`](../../Developer%20guides/API%20reference/Mopedo.Database/User) that is generated, **(3)** setting up [bid rules](../../Developer%20guides/API%20reference/Mopedo.Bidding/Campaign#bidrule) to target that unique segment only and **(4)** visiting some media sites with the browser to generate bid requests.
