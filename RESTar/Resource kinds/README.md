---
permalink: RESTar/Resource%20kinds/
---

# RESTar resource kinds

When using a RESTar API, for example our [demo service](../Consuming%20a%20RESTar%20API/Demo%20service), you may notice that there is are multiple **kinds** of resources that are available to you. Let's make a request to the demo API and list some available resources for the API key `restar`. For the sake of brevity, let's include only the `Name` and `Kind` properties:

```
curl "https://restarhelp.mopedo-drtb.com:8282/api/_/_/select=name,kind" -H "Authorization: apikey restar"
```

Response body (abbreviated):

```json
[
    {
        "Name": "RESTarTutorial.Superhero",
        "Kind": "EntityResource"
    },
    {
        "Name": "RESTar.OData.MetadataDocument",
        "Kind": "BinaryResource"
    },
    {
        "Name": "RESTar.Shell",
        "Kind": "TerminalResource"
    },
    {
        "Name": "RESTarTutorial.SuperheroCreated",
        "Kind": "EventResource"
    },
    ...
]
```

As we can see, there are four different values for the `Kind` properties of the listed resources. Let's go through them in order.

## Entity resources

Entity resources are the kind of web resource we should all be familiar with. They are modelled as sets of **entities** that can be represented using various [content types](../Consuming%20a%20RESTar%20API/Headers#content-type) – for example JSON, and that can be manipulated using common REST methods like `POST`, `PATCH` and `DELETE`. The semantics of entity resource interaction is, to a great extent, defined by the [HTTP protocol](https://en.wikipedia.org/wiki/Http). Entity resources are the most common resources in RESTar, and a large part of the documentation is specific to working with them. See also:

- [Consuming a RESTar API](../Consuming%20a%20RESTar%20API/Introduction)
- [Building entity resources](../Developing%20a%20RESTar%20API/entity%20resources)

## Binary resources

Binary resources contain read-only binary data of arbitrary size with a specific pre-defined content type. Just like with entity resources, we use HTTP to interact with binary resources. We can, however, only use the `GET` method. Unlike entity resources, the `Accept` request header is ignored when requesting a binary resource – we cannot request the content of a binary resource in any content type other than its native type.

Binary resources are useful when we have read-only document data – for example an XML document or a text file – that should be exposed over the REST API. A good example is the RESTar.OData [metadata document](https://github.com/Mopedo/RESTar.OData#metadata), which contains XML metadata for all resources in a RESTar application. See also:

- [Consuming a RESTar API](../Consuming%20a%20RESTar%20API/Introduction)
- [Building binary resources](../Developing%20a%20RESTar%20API/binary%20resources)

## Terminal resources

Terminal resources are small, single-purpose console applications that are hosted by a RESTar application, and that can be launched, controlled and terminated by API consumers. Once launched, they establish a two-way communication socket with the client, over which commands and data can be exchanged. While entity resources and binary resources are closely coupled with the HTTP protocol, which is what we use to interact with them, terminal resources have a similar coupling with another TCP protocol – the [WebSocket protocol](https://en.wikipedia.org/wiki/WebSocket).​

Terminal resources are useful when we want to provide high reactivity and interactivity between the server and the client – for example to build a real-time log resource that pushes data to multiple clients, or a command line interpreter. They exist to enable effective data interaction between client and server, whereas entity resources and binary resources are commonly used as sources of said data. See also:

- [Consuming terminal resources](../Consuming%20a%20RESTar%20API/Consuming%20terminal%20resources)
- [Building terminal resources](../Developing%20a%20RESTar%20API/terminal%20resources)

## Event resources

Event resources define transient event objects that are raised (triggered) from within the RESTar application itself, and that can be listened for and used as triggers for various actions. To understand why event resources exist, imagine that we want to build an entity resource holding notifications, with entities inserted from within the RESTar application itself, as well as from other computers that send `POST` requests to our API. It stands to reason that clients would want to be notified once entities are added to the resource, but without event resources the best we can do is to tell the client to make frequent `GET` requests to check for new entities. We could also implement this using a terminal resource, but that would require the client to have an open websocket to the API in order to receive notifications. None of these solutions are favorable.

With entity resources, we can let the application raise a notification event once a notification is created, carrying the notification entity as [payload](#event-payload), that can then trigger actions – for example a [webhook](../Administering%20a%20RESTar%20API/Webhooks) that sends the notification to a remote server. Unlike the other resource kinds, we do not consume event resources by sending requests for them. Instead we listen for them, and interact with their data once they're raised. See also:

- [Webhooks](../Administering%20a%20RESTar%20API/Webhooks)
- [Developing event resources](../Developing%20a%20RESTar%20API/Developing%20event%20resources)

### Event payloads

Each event carries a payload, the data that is associated with the event. The RESTar application developer defines what the payload is for a given event resource a description of the payload should be included in the resource documentation, so that consumers and administrators know what to expect when working with the event resource.
