---
permalink: Mopedo%20DSP/Administration%20guides/Google%20Cloud%20setup%20guide/
---

# Google Cloud setup guide

## Introduction

This article explains how to set up a Windows Server instance on the Google Cloud Platform. Having an instance on Google Cloud is the best way to ensure that demand side applications, for example DSPs and DMPs, have the fastest possible response times when listening and responding to bid requests from the Mopedo backend. The article will focus on a basic setup, the kind of setup you are most likely interested in if you want to begin testing and initial trading on the Mopedo platform. Once your volume increases, however, you may want to upgrade your instance to a more powerful setup. You can do a lot of improvements in terms of auto-scaling, load balancing and performance monitoring on Google Cloud. Those aspects will not be covered in this article, but are included in the official [Google Cloud documentation](https://cloud.google.com/docs/).

### Setup guide

#### Creating a Google Cloud account

1. To begin, head over to [cloud.google.com](http://cloud.google.com) and press the **TRY IT FREE** button.
2. The site will then ask you to log in to your regular Google account. If you don't have a Google account, create one.
3. Select your country and read the terms of services.
4. Press the **Agree and continue** button
5. Fill in the required personal or business information
6. Press the **Start my free trial** button

### Creating a Google Cloud Platform Project

Once you have a Google account, head over to the Google Cloud Console at `console.cloud.google.com`. It's from this console that you will control and edit your VM instances.

1. Create a new project by clicking on the **Select a project** button in the top menu, and then pressing the **+** button in the upper right hand corner. Make sure to include your organization name in the project name. By naming the project after your organization, if you ever need to invite someone from Mopedo to your project for some support issue, we can easily distinguish between different Mopedo projects.
2. The **≡** button in the top left corner lets you access common features of the console. Use it to access the **VPC network** and **Compute Engine** sections.

### Creating a VM instance

1. Go to the **VM instances** sub-section in the **Compute Engine** section and press the **CREATE INSTANCE** button in the top menu.

2. Fill in the following information:

  ![image](New%20instance.png)

3. Next, head over to the **Disks** sub-section. We shall add a separate disk to run the Starcounter in-memory database from. Press the **CREATE DISK** button in the top menu. Enter the following information:

  ![image](New%20disk.png)

4. Now head back to the **VM instances** sub-section, click on your newly created instance in the list and then press the **EDIT** button in the top menu.

5. Scroll down to the **Network tags** section.

6. Add a new `mopedo` tag in the **Network tags** text field by writing "mopedo" in the blank field and pressing the return key.

7. About half-way down on the page, find the **Additional disks** section. Press the **+ Add item** button and select your database disk from the drop-down menu. You have now added the database disk to your VM instance.

8. Scroll to the bottom and press the **Save** button.

### Setting up networking

1. Head over to the **VPC network** section via the **≡** button.

2. Start by clicking the **External IP addresses** sub-section. By assigning a static external IP address, you can make sure your app always keeps the same IP even after instance restarts. If this seems like a good idea – press the **RESERVE STATIC ADDRESS** button, fill in the form and attach the static IP to your VM instance.

3. Go to the **Firewall rules** sub-section. Here we create firewall rules to enable networking to and from your VM instance. To enable incoming bid requests from the Mopedo backend, you need to enable incoming UDP traffic over some port – default is `9004` – and incoming TCP traffic over some port – default is `8004`.

4. The Mopedo DSP has a REST API as well as ports for Mopedo Backend communication. If you want to enable communication through the REST API, you must create rules for these ports as well. Default REST API TCP ports are **8282** and **8283**, but you can pick any ports as long as you provide the same ports as settings when configuring the DSP. It's up to you how to restrict traffic to the REST API, our recommendation is to always filter incoming traffic to certain allowed IP addresses if no other means of authorization is used to secure the REST API.

### Setup remote desktop

1. To get login credentials for your instance, go to the **VM instances** sub-section in the **Compute Engine** section and click on your instance in the list. From here, click the **Set Windows password** button and follow the instructions. When done you will have a Windows user account and password. You will use this information when logging in to the instance over Remote Desktop.

2. Click the **RDP** button in the **Remote access** section to read more about remote desktop, or press the downward arrow to open a drop-down menu and select **Download the RDP file** to download the file used to connect over remote desktop.

3. Using a remote desktop client, for example **Microsoft Remote Desktop**, connect to your instance external IP address and use the account credentials to log in to the Windows desktop.

### Configuring Windows

When logged in to Windows, there are two things you need to do:

1. Add firewall rules to the Windows firewall to enable incoming UDP and TCP traffic from the Mopedo backend, as well as TCP traffic to the REST API. Use the same ports as in the Google Cloud firewall rules. To setup the windows firewall, use the **Windows Firewall with Advanced Security** application.
2. Use the Disk Management utility in Windows to initialize your database disk. If you do not do this, Windows will not find the database disk. See this [guide](https://cloud.google.com/compute/docs/disks/add-persistent-disk) for how to add Windows volumes.

### Done

You are now ready to install the software that will run on your server. To install a Mopedo DSP, see [this guide](../Installation%20guide).
