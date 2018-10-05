---
permalink: RESTar/Built-in%20resources/RESTar.Dynamic/Resource/
---

# `RESTar.Dynamic.Resource`

```json
{
    "Name": "RESTar.Dynamic.Resource",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

The `RESTar.Dynamic` namespace contains all the procedurally generated resources that have been created for the current RESTar application. By default, the namespace contains a single resource, `RESTar.Dynamic.Resource`, a meta-resource that is used to create additional resources in the namespace. For an overview of dynamic resources, see [this section](../../../Administering%20a%20RESTar%20API/Dynamic%20resources).

`RESTar.Dynamic.Resource` is a meta-resource that contains entities representing all procedurally created resources (runtime resources) for the current RESTar application. Each entity in the resource corresponds with a dynamic Starcounter table created using the [Dynamit](https://github.com/Mopedo/Dynamit) library.

## Format

The format of `RESTar.Dynamic.Resource` is the same as for [`RESTar.Admin.Resource`](../../RESTar.Admin/Resource)
