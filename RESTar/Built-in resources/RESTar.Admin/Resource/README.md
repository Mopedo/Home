---
permalink: RESTar/Built-in%20resources/RESTar.Admin/Resource/
---

# `Resource`

```json
{
    "Name": "RESTar.Admin.Resource",
    "Kind": "EntityResource",
    "Methods": ["GET", "PATCH", "REPORT", "HEAD"]
}
```

`Resource` is a meta-resource that contains entities that correspond to the resources currently registered in the REST API. All resources have a `Resource` entity describing it.

## Format

Property name  | Type                            | Description
-------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------
Name           | `string` (read-only)            | The name of the resource
Alias          | `string`                        | The alias of the resource, if any
Description    | `string` (read-only)            | The description of the resource
EnabledMethods | array of `Method` (read-only)   | The methods that are enabled for the resource
Editable       | `boolean` (read-only)           | Is this resource editable?
IsInternal     | `boolean` (read-only)           | Is this resource only available internally?
Type           | `string` (read-only)            | The .NET type registered for this resource
Views          | array of `ViewInfo`(read-only)  | The [views](../../../Consuming%20a%20RESTar%20API/URI/Resource#views) registered for this resource
Provider       | `string` (read-only)            | The name of the [`ResourceProvider`](../../../Developing%20a%20RESTar%20API/entity%20resources/Resource%20providers) that generated this resource
Kind           | `ResourceKind` (read-only)      | The [kind](../../Developing%20a%20RESTar%20API/Registering%20resources) of the resource, for example `EntityResource`
InnerResources | array if `Resource` (read-only) | Resources declared within the scope of this resource

**To get all resources currently registered by the server:**

```
GET https://my-server.com/rest/resource
Headers: 'Authorization: apikey mykey'
```

**To list all resource names only:**

```
GET https://my-server.com/rest///select=name
Headers: 'Authorization: apikey mykey'
```

## Adding resources

Resources can be added during runtime by calling any procedural resource controller, for example the built-in [`RESTar.Dynamic.Resource`](../../RESTar.Dynamic) resource.
