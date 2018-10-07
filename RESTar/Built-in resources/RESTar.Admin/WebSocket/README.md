---
permalink: RESTar/Built-in%20resources/RESTar.Admin/WebSocket/
---

# `WebSocket`

```json
{
    "Name": "RESTar.Admin.WebSocket",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

The `WebSocket` resource contains all WebSockets currently connected to the RESTar application. The administator can close connected WebSockets by simply running `DELETE` on their corresponding object in this resource.

## Format

Property name | Type      | Description
------------- | --------- | -----------------------------------------------------------------------------------
Id            | `string`  | The unique ID for the connection
TerminalType  | `string`  | The name of the terminal resource type that the WebSocket is currently connected to
Terminal      | `object`  | An object describing the current state of the terminal
Client        | `object`  | An object describing the client connected to the terminal
IsThis        | `boolean` | Is this WebSocket the same as the one currently requesting the resource?
