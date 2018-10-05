---
permalink: RESTar/Administering%20a%20RESTar%20API/Webhooks/
---

# Webhooks

Sometimes it's useful to make a web application send data to a remote computer, not only when the remote computer makes a request for it – for example using a `GET` request – but automatically when certain events occur on the server. We could, for example, have a notification resource in the RESTar application, where we add entities representing new notifications. The client could get the latest notifications using `GET` requests, but the solution is not really a useful unless the application has some way to push new notifications automatically to the client once they are created. For this purpose, we use webhooks.

Webhooks are custom HTTP callback opterations that define automatic outgoing HTTP requests, triggered by [events]() that occur in the RESTar application. Each event carries a payload, which by default is used as the body of the outgoing HTTP request. The webhook can also define the HTTP method and custom headers that are used in the outgoing request. As an advanced feature, RESTar webhooks can even override the payload of the event, and define a [custom request](../../Built-in%20resources/RESTar.Admin/Webhook/#custom-payload-requests) used for fetching the data to include as body of the ougoing request. For more information on how to work with webhooks, see the documentation for the [`RESTar.Admin.Webhook`](../../Built-in%20resources/RESTar.Admin/Webhook) resource.
