---
permalink: RESTar/Built-in%20resources/RESTar.Admin/PropertyCache/
---

# `PropertyCache`

```json
{
    "Name": "RESTar.Admin.PropertyCache",
    "Kind": "EntityResource",
    "Methods": ["GET"]
}
```

The `PropertyCache` resource contains all the types and properties discovered by RESTar while working with the resources of the current RESTar application. It's useful when debugging RESTar applications.

## Format

Property name | Type              | Description
------------- | ----------------- | --------------------------------------------------------------
Type          | `string`          | The name of the type for which the properties have been cached
Properties    | array of `object` | The properties discovered for this type
