---
permalink: RESTar/Administering%20a%20RESTar%20API/HTTPS/
---

# HTTPS

To protect the integrity of HTTP requests to the REST API, which is especially important when sending sensitive information like customer information or API keys, it's recommended that an HTTPS compatible web server is set up next to the REST API, which then routes requests to the REST API using reverse proxy. Starcounter 2.3.2, which is the version currently targeted by RESTar, has no native support for HTTPS and SSL, but it's easy to implement a secure solution using tools already included in Windows Server.

Mopedo has [an article](../../../Mopedo%20DSP/Administration%20guides/IIS%20reverse%20proxy%20setup%20guide) on how to create a reverse proxy using Microsoft IIS. All you need is a registered domain and an SSL certificate.

Starcounter also provides the following guides for setting up HTTPS for Starcounter servers:

- [Using HTTPS on IIS](https://docs.starcounter.io/guides/working-with-starcounter/using-https-on-iis)
- [Using HTTPS on NGINX](https://docs.starcounter.io/guides/working-with-starcounter/using-https-on-nginx)
