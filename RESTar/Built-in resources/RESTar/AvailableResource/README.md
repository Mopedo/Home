---
permalink: RESTar/Built-in%20resources/RESTar/AvailableResource/
---

# `AvailableResource`

```json
{
    "Name": "RESTar.AvailableResource",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

`AvailableResource` is a meta-resource that contains the available resources for the current consumer. The entities contained in the output from a `GET` request to `AvailableResource`, and the values of their `Methods` properties, are decided by the API key used in the request (if keys are required for the service). It's the default resource for HTTP requests, used if no resource locator is provided in the request URI.

## Format

Property name | Type                | Description
:------------ | :------------------ | :--------------------------------------------------------------------------------------------------------------------
Name          | `string`            | The name of the resource
Description   | `string`            | The description of the resource
Methods       | array of `string`   | The methods available for the resource (for the current API key)
Kind          | `string`            | The [kind](../../Developing%20a%20RESTar%20API/Registering%20resources) of the resource, for example `EntityResource`
Views         | `array of ViewInfo` | The [views](../../../Consuming%20a%20RESTar%20API/URI/Resource#views) of the resource (only for entity resources)

## Example

```
GET https://my-server.com/rest
Response body:
[
    {
        "Name": "RESTar.Admin.Console",
        "Description": "The console is a terminal resource that allows a WebSocket client to receive pushed updates when the REST API receives requests and WebSocket events.",
        "Methods": [
            "GET"
        ],
        "Kind": "TerminalResource"
    },
    {
        "Name": "RESTar.Admin.DatabaseIndex",
        "Description": "The DatabaseIndex resource lets an administrator set indexes for Starcounter database resources.",
        "Methods": [
            "GET",
            "POST",
            "PATCH",
            "PUT",
            "DELETE",
            "REPORT",
            "HEAD"
        ],
        "Kind": "EntityResource",
        "Views": []
    },
    {
        "Name": "RESTar.Admin.Error",
        "Description": "The Error resource records instances where an error was encountered while handling a request.",
        "Methods": [
            "GET",
            "DELETE",
            "REPORT",
            "HEAD"
        ],
        "Kind": "EntityResource",
        "Views": []
    } ...
]
```
