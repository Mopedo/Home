---
permalink: RESTar/Built-in%20resources/RESTar/Help/
---

# `Help`

```json
{
    "Name": "RESTar.Help",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `Help` resource contains merely a link to the [Consuming a RESTar API](../../Consuming%20a%20RESTar%20API/Introduction) section of this documentation.

## Example

```
GET https://my-server.com/rest/help
Response body: [
    {
        "DocumentationAvailableAt": "https://develop.mopedo.com/RESTar"
    }
]
```
