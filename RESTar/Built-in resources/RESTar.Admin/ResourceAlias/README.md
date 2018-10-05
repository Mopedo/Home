---
permalink: RESTar/Built-in%20resources/RESTar.Admin/ResourceAlias/
---

# `ResourceAlias`

```json
{
    "Name": "RESTar.Admin.ResourceAlias",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

The `ResourceAlias` resource includes all the aliases that have been assigned to some resource. To add a new alias to some resource, use the `Alias` property of the corresponding [`RESTar.Admin.Resource`](../Resource) entity. Only `GET` and `DELETE` are available for the `ResourceAlias` resource.

## Format

Property name | Type     | Description
------------- | -------- | ---------------------------------------------------
Alias         | `string` | The alias string
Resource      | `string` | The name of the resource for which this is an alias
