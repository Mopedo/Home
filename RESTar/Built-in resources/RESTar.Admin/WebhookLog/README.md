---
permalink: RESTar/Built-in%20resources/RESTar.Admin/WebhookLog/
---

# `WebhookLog`

```json
{
    "Name": "RESTar.Admin.WebhookLog",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

The `WebhookLog` resource contains log items for instances when [webhooks](../Webhook) were triggered by [events](../../../Resource%20kinds#event-resources).

## Format

Property name    | Type                                                      | Description
---------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------
WebhookId        | `string`                                                  | The ID of the webhook of this log item
Method           | [`Method`](../../../Consuming%20a%20RESTar%20API/Methods) | The method of the webhook of this log item
Destination      | `string`                                                  | The destination of the webhook of this log item
Time             | [`datetime`](../../DateTine)                              | The time when the log item was created
IsSuccess        | `boolean`                                                 | Does this log item encode a successful operation?
ResponseStatus   | `string`                                                  | The response status for the outgoing HTTP request of the webhook
BodyByteCount    | `integer`                                                 | The number of bytes contained in the body of the outgoing HTTP request of the webhook
Webhook (hidden) | [`Webhook`](../Webhook)                                   | The webhook of this log item

> Hidden properties can be included in response bodies by using the [`add`](../../../Consuming%20a%20RESTar%20API/URI/Meta-conditions#add) meta-condition in the [request URI](../../../Consuming%20a%20RESTar%20API/URI).
