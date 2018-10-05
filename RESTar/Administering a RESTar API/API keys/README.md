---
permalink: RESTar/Administering%20a%20RESTar%20API/API%20keys/
---

# API keys

API keys are character strings that are used for authenticating and authorizing RESTar API consumers in a role-based fashion. Whether API keys are required for a specific RESTar web service or not is decided by the application developer, but for services that require them, the consumer is expected to include a valid key in the `Authorization` header in HTTP requests. Failure to do so will result in a `403: Forbidden` response. The administrator will set up and manage these API keys for web services that require them. It's best practice to set up an admin key with a wide scope and more restricted consumer keys with well-defined roles.

For applications that use API keys, the developer will have defined a location for an [XML configuration file](../Configuration). To add an API to this file, we insert an [`<ApiKey>`](../Configuration#apikey) node inside the root `<config>` node.
