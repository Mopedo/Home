# Introduction

The main purpose of RESTar, as a software framework, is to facilitate a _unified REST interface_ between external HTTP clients and the data that the application wants to expose, and to provide fast and powerful implementations for common tasks like request parsing, request authentication, database querying, data filtering and JSON serialization. By letting the RESTar framework deal with these complex (and boring) tasks, we can increase the level of abstraction, letting the application developer worry about less things and instead focus on the content and functionality of their respective apps.

RESTar encourages a **resource-oriented architecture** (ROA) approach to application design, where the software engineering effort is focused around declaring and defining _what_ is exposed to the REST API, i.e. the **resources**, as opposed to _how_ it's exposed. RESTar is also designed to be easily integrated with new and existing Starcounter applications, but at the same time allow the developer to override some of the functionality to accommodate more advanced use cases.

## RESTar resources

When building RESTar application, developers mainly work with defining resources – i.e. the data that should be available for consumption over the REST API of the RESTar application. There are [four kinds of resources](../../Resource%20kinds) that can be defined in RESTar:

- [Entity resources](../Entity%20resources/Introduction)

> Sets of data entities, for example rows in a database table. These entities can be filtered and serialized to some content type, for example JSON

- [Binary resources](../Binary%20resources)

> Read-only binary data streams that are delivered directly to clients

- [Terminal resources](../Terminal%20resources)

> Small single-purpose console applications that are consumed using WebSocket connections

- [Event resources](../Event%20resources)

> Events are raised by the RESTar application and can be used to trigger actions, for example [webhooks](../../Administering%20a%20RESTar%20API/Webhooks)

Each of these have their own section of the documentation, focused on how to build them. Common to all resource definitions in RESTar is that they are **declarative** in nature, much due to the fact that the concept of a resource in RESTar is closely coupled with a declarative component of .NET – **class declarations**.
