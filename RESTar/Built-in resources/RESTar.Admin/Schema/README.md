---
permalink: RESTar/Built-in%20resources/RESTar.Admin/Schema/
---

# `Schema`

```json
{
    "Name": "RESTar.Admin.Schema",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `Schema` resource lets you print the schema for another resource. The schema contains names for all properties and types (C# namespaces and names) for the types used.

## Example

```
GET https://my-server.com/rest/schema/resource=RESTar.Admin.Resource
Headers: 'Authorization: apikey mykey'
Response body: [{
    "Name": "System.String",
    "Alias": "System.String",
    "Description": "System.String",
    "EnabledMethods": "RESTar.Methods[]",
    "Editable": "System.Boolean",
    "IsInternal": "System.Boolean",
    "Type": "System.String",
    "Views": "RESTar.ViewInfo[]",
    "Provider": "System.String",
    "Kind": "RESTar.ResourceKind",
    "InnerResources": "RESTar.Admin.Resource[]"
}]
```
