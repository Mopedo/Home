---
permalink: Mopedo%20DSP/Developer%20guides/REST%20API%20introduction/
---

# REST API introduction

The **REST API** is a web interface established by a Mopedo DSP, over which its [web resources](../API%20reference/API%20reference%20overview) are published so that external clients can interact with the DSP and its data. By sending and receiving messages through this interface, client systems, for example an advertiser's CRM system or a web site backend, can communicate with and update the content of the Mopedo DSP.

> If the term "REST API" is unfamiliar to you, we recommend that you read this [excellent tutorial](http://www.restapitutorial.com), that covers all you need to know.

The REST API is implemented using [RESTar](../../../RESTar) – a REST API framework for the Starcounter platform, which has a [separate documentation](../../../RESTar). Here are the essential sections in that documentation, useful for working with a Mopedo DSP:

[• **Consuming a RESTar API**](../../../RESTar/Consuming%20a%20RESTar%20API/Introduction)

> Learn how to make requests to a RESTar API, for example a Mopedo DSP, and what to expect in responses.

[• **Administering a RESTar API**](../../../RESTar/Administering%20a%20RESTar%20API/Introduction)

> Set up role-based access control and deploy features that make it simple and secure for consumers to interact with the RESTar API.

The Mopedo DSP has a number of available web resources, that can be read and manipulated using the REST API. Each resource has a unique name, and we can get the content of the resource, the **entities**, by using the following request URI schema:

```
<scheme>://<authority>/<root_uri>/<resource_name>
```

A concrete instance of the above schema, a `GET` request listing all `Mopedo.Bidding.Campaign` entities of a given DSP, could have the following syntax:

```
GET https://my-dsp.com:8282/rest/mopedo.bidding.campaign
Headers: "Authorization: apikey mykey"
```

By substituting `GET` with another [HTTP method](http://www.restapitutorial.com/lessons/httpmethods.html) in the request above, we can perform other operations, for example insert new campaigns or delete an existing campaign. Different resources have different read and write permissions, which limits which REST methods are available.
