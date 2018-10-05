---
permalink: Mopedo%20DSP/Administration%20guides/IIS%20reverse%20proxy%20setup%20guide/
---

# IIS Reverse Proxy setup guide

## Introduction

This article explains how to use Microsoft Internet Information Services (IIS) to create a website on a Windows computer, that will forward requests to a Mopedo DSPs REST API using reverse proxy. The purpose of this setup is to allow SSL secured connections to the REST API.

This is the default setup for your Mopedo DSP networking:

![img](No%20proxy.svg)

The setup we want to achieve is this:

![img](Reverse%20proxy.svg)

We handle incoming HTTPS requests on a web server separate from the DSP (running on the same computer) that can handle HTTPS requests – in this case [Microsoft IIS](https://www.iis.net/). IIS will secure incoming requests with SSL/TLS, and forward the secure requests to the DSP on some internal TCP port used for the REST API (18282 in the example). This setup is called a reverse proxy, and receiving HTTPS requests and forwarding them as HTTP requests to some other server is called SSL offloading.

**IMPORTANT:**

Due to the way IIS handles URIs and query strings, it's required that REST request to IIS with URIs containing certain special characters (for example `<` and `>`) contain a question mark (`?`) directly after the base URI. This is so that IIS will parse the special characters as part of the query string, and not part of the URI. IIS will not accept the URI in the following request:

```
GET https://my-dsp.com/rest/person/age>40
```

The URI will instead have to be:

```
GET https://my-dsp.com/rest?/person/age>40
```

## Setup guide

### Requirements

Before you begin, you need the following:

1. A registered domain that can be pointed to the external IP address of the DSP

2. An SSL certificate

### Installing the web server (IIS) feature

1. In the Server Manager in Windows Server, click **Add roles and features**

2. Click **Next**

3. Click **Next**

4. Click **Next**

5. Select **Web Server (IIS)** and click **Next**

6. Click **Next**

7. Click **Install** and wait until the installation completes

### Installing modules for reverse proxy

1. Download and run **Microsoft Web Platform Installer** from <http://www.microsoft.com/web/downloads/platform.aspx>

2. In the Web Platform Installer, install the following modules:

  - Application Request Routing 3.0
  - URL Rewrite 2.0
  - IIS: Websocket Protocol

### Adding your SSL certificate to IIS

This process is different for different SSL certificate formats. IIS is a commonly used web server, however, so your certificate vendor will likely be able to help. When done, your certificate should be visible in the Server certificates view in the IIS Manager.

### Creating a new website with HTTPS bindings

1. Launch **Internet Information Services (IIS) Manager** by either searching for "IIS" from **Start** or by navigating to `Control Panel\System and Security\Administrative Tools` and double-clicking on **Internet Information Services (IIS) Manager**.

2. Expand the view of your server in the left side panel by double-clicking on it

3. Right-click on **Sites** and click **Add Website**...

4. Give your website a name and as physical path

5. In the **Bindings** section, add an HTTPS binding for your website.

  - Set type to `https`
  - Set IP-address to `All Unassigned`
  - Set port to the TCP port you would like the IIS web server to listen for HTTPS requests from. This cannot be the same port as the one used by the DSP.
  - Set host name to your registered domain
  - Choose your SSL certificate from the list of certificates
  - Click **OK**

### Setting up reverse proxy

You will now have an HTTPS compatible web server listening for incoming requests on some port. The only thing remaining now is to forward those requests to the DSP. This forwarding is called **reverse proxy**. To create a reverse proxy, you need the modules we installed in step 2.

#### Activating the proxy feature

First, lets activate the Application Request Routing proxy feature.

1. Select the server in the left side panel by clicking on it

2. Double click the **Application Request Routing Cache** icon in the server features view

3. Click **Server Proxy Settings...** in the Actions side panel

4. Check the **Enable proxy** checkbox

5. Click **Apply** in the Actions side panel

#### Setting up URL rewrite rules

1. Select your website in the left side panel

2. Double-click on **URL Rewrite**

3. Click **Add rule(s)...** in the right side panel

4. Select **Reverse Proxy** and click **OK**

5. In the text field, enter `127.0.0.1:<port>` where `<port>` is the internal HTTP port you want the REST traffic routed to. If you, for example, want to route incoming HTTPS traffic to the Mopedo REST API, and the REST API is listening on port `18282`, you put `127.0.0.1:18282` in the text field.

6. Make sure that the **Enable SSL Offloading checkbox** is checked

7. Click **OK**

8. Double-click on your newly created URL rewrite rule. In this window, you can add conditions or change the regular expression pattern used to rewrite the URLs of incoming requests. This is useful if you have multiple rewrite rules for different servers, on the same computer. For now, what we want to change is at the bottom of this window, so scroll down to the **Action Properties** section.

  The Rewrite URL will look something like this: `http://127.0.0.1:18282/{R:1}`. The port number may be different depending on what you entered in step 5.

9. Replace the text after the port number (including the forward slash) with `{UNENCODED_URL}` The Rewrite URL should now look like this: `http://127.0.0.1:18282{UNENCODED_URL}`

10. Uncheck the **Append query string** check box

### Setting up IIS to preserve host headers

When redirecting HTTP requests from the IIS proxy to the Starcounter application, IIS will by default change the `Host` header to `127.0.0.1`, which is generally not desirable. To tell IIS to preserve original `Host` headers:

1. Double-click the **server** in the left side panel. It's usually the first item below **Start page** in the side panel.
2. In the **features view**, select **Configuration Editor** by double-clicking on it.
3. In the **Section** drop-down menu, expand the **system.webServer** section and click on the **proxy** menu item.
4. In the list, find the **preserveHostHeader** item.
5. Change the value of the **preserveHostHeader** item from `False` to `True`.

### Disable IIS error pages (optional step)

Disabling IIS error pages makes for a cleaner error handling, especially when receiving errors from the Mopedo REST API.

1. Click on your site in the left side-panel

2. Double-click on **Error Pages**

3. Remove all list items
