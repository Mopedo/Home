---
permalink: RESTar/
---

# What is RESTar?

RESTar is a .NET REST API framework for Starcounter applications, that is free to use and easy to set up in new or existing applications. Its purpose is to provide a set of high-quality tools for developers to build great REST APIs, without having to deal with the complexities (and sometimes utter boringness) associated with client authentication, request processing, data integrations, performance optimizations, URI conventions and documentation.

> If the term "REST API" is unfamiliar to you, we recommend that you read this [excellent tutorial](http://www.restapitutorial.com), that covers all you need to know.

Using RESTar tools, developers can quickly build powerful REST APIs that, among other things:

1. Authenticate and authorize clients using [role-based access control](Administering%20a%20RESTar%20API/API%20keys) and API keys
2. [Create web resources](Developing%20a%20RESTar%20API/Registering%20resources) from Starcounter database tables or any other persistent or transient data
3. Allow external clients to [interact with the resources](Consuming%20a%20RESTar%20API/Introduction) using standard HTTP methods like `GET` and `POST`, and content types like JSON and XML
4. Allow [advanced queries](Consuming%20a%20RESTar%20API/Request%20overview/#examples) like filtering, renaming, searching and ordering of resource representations before they are returned to the client
5. Handle and categorize errors during request evaluation for easy [remote debugging](Built-in%20resources/RESTar.Admin/Error)
6. Allow clients to [set up database indexes](Built-in%20resources/RESTar.Admin/DatabaseIndex) to optimize database queries
7. Can save any data to an [Excel file](Consuming%20a%20RESTar%20API/Headers#accept)
8. Allow clients to set up HTTP callbacks using [webhooks](Administering%20a%20RESTar%20API/Webhooks) that listen for [custom events](Resource%20kinds/Event%20resources)
9. Has a built-in [WebSocket shell](Built-in%20resources/RESTar/Shell) that clients can use to explore and consume the REST API, as well as support for [custom websocket resources](Developing%20a%20RESTar%20API/Terminal%20resources)

## Terminology

A _RESTar application_ is any Starcounter application that uses the tools of RESTar to establish a REST API. We will refer to the _REST API_ as simply the web services provided by a RESTar application. _RESTar web service_ and _RESTar API_ are also used interchangeably in these articles to refer to the web services of a RESTar application. A _web resource_, or just _resource_, is – in [common terminology](https://en.wikipedia.org/wiki/Representational_state_transfer) – anything that can be named, addressed or interacted with using, for example, a REST API.
