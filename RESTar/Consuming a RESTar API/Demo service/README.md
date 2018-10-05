---
permalink: RESTar/Consuming%20a%20RESTar%20API/Demo%20service/
---

# Demo service

While exploring the RESTar documentation, feel free to use this demo server and API key:

```
URI:      https://restarhelp.mopedo-drtb.com:8282/api
API key:  restar
```

## Using a REST client

Using your REST client of choice ([Postman](http://www.getpostman.com) is a good one), send an HTTP GET request to the URI above, and include `"apikey restar"` as the value of the `Authorization` header. The response you see contains a list of all resources made available for the API key `"restar"`. One such resource is the `RESTarTutorial.Superhero` resource, on which only `GET` requests are allowed. To query this particular resource, use the following URI:

```
https://restarhelp.mopedo-drtb.com:8282/api/superhero
```

You will now see the contents of the `RESTarTutorial.Superhero` entity resource – that is – all `Superhero` entities. To only list superheroes with secret identities, use the following URI:

```
https://restarhelp.mopedo-drtb.com:8282/api/superhero/hassecretidentity=true
```

This is the basics of how to consume a RESTar API using HTTP requests. URIs are used to specify what resource and what entities within a resource to operate on, the method specifies what operation to perform (for example `GET`), and headers like `Authorization` are used to pass additional information to the web service.

## Using WebSockets

The most flexible way to explore the web resources of a RESTar service is to plug in to its [`Shell`](../../Built-in%20resources/RESTar/Shell) resource using a WebSocket connection. To connect to the demo service, use a WebSocket client like [`wscat`](https://www.npmjs.com/package/wscat) or [this chrome extension](https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo?hl=en), with this URI:

```
URI:  wss://restarhelp.mopedo-drtb.com:8282/api(restar)
```

An introduction to how to work with WebSockets and connect to the demo service can be found [here](../Consuming%20terminal%20resources).
