---
permalink: RESTar/Administering%20a%20RESTar%20API/CORS/
---

# CORS

If you are unfamiliar with CORS (Cross-Origin Resource Sharing), check out this [excellent introduction](https://www.codecademy.com/articles/what-is-cors)

RESTar has built-in support for handling incoming CORS requests, and allows the administrator to set up a pre-defined list of whitelisted origins that should be allowed to make such request. For applications that accept whitelisting of CORS origins, the administrator can add such origins by including [`<AllowedOrigin>`](../Configuration#allowedorigin) nodes inside the root `<config>` node of the [XML configuration file](../Configuration).
