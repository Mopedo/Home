---
permalink: RESTar/Consuming%20a%20RESTar%20API/Introduction/
---

# Introduction

This part of the documentation provides a technical specification of the RESTar protocol, used to consume the web services provided by a RESTar application, for example a Mopedo DSP. RESTar can be setup to support [additional protocols](../../Developing%20a%20RESTar%20API/Protocol%20providers), for example [OData](https://github.com/Mopedo/RESTar.OData), but for now, let's focus on the default protocol.

We will only describe the _format_ of REST requests and responses here. For a description of the actual web resources of a specific application – for example the `User` and `Site` resources of the Mopedo DSP application, see the [documentation provided for that application](../../../Mopedo%20DSP/Developer%20guides/API%20reference/API%20reference%20overview).

As an API consumer, the application administrator will make resources available for you by creating API keys, and binding certain web resources and methods to them. Different API keys can have different access rights, so make sure to keep your API key secure. When you know the location of the web service – that is – its URI, and your assigned API key, you are ready to begin sending requests to the service.
