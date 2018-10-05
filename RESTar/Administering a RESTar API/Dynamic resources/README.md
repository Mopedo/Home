---
permalink: RESTar/Administering%20a%20RESTar%20API/Dynamic%20resources/
---

# Dynamic resources

Dynamic resources are persistent [entity resources](../../Developing%20a%20RESTar%20API/entity%20resources) that have no pre-defined schemas. They can be changed not only in content, but in structure as well, and even created during runtime. They do, however, have some limitations due to their dynamic nature. This article will cover their basics.

> Dynamic resources in RESTar are [Dynamit](https://github.com/Mopedo/Dynamit) `DDictionary` entities. Dynamit is a free to use and open-source class library for creating dynamic table definitions in Starcounter.

To illustrate the difference between dynamic and non-dynamic – _static_ – resources, consider the object-oriented programming concept object, and its standard implementations in Java and JavaScript respectively. In Java – which is class-based – objects are static with regards to their members, and this structure is defined in compile-time in a class definition. We can change the contents of objects – that is, assign values to instance variables – during runtime, but we cannot change the structure of objects without first recompiling the application. In JavaScript – which is prototype-based - however, both the content and the structure of objects can change during runtime.

Entities of dynamic resources behave like JavaScript objects in this regard. There is no common schema of property names and types that applies to all entities in a dynamic resource, and their members can have any name and data type, regardless of members and types of other entities in the same resource. The advantages and disadvantages of dynamic resources are the same as for the dynamic objects of JavaScript, their biggest advantage being, of course, their runtime flexibility. Dynamic resources can be created and deleted in runtime, and properties and property types can be added, changed or deleted in runtime. This flexibility makes them easy to use while importing data, since entities in the data source can have any structure. Dynamic resources are, however, slower than static resources, and are not type-safe in the same way that static resources are.

Dynamic resources are automatically placed in the `RESTar.Dynamic` namespace, so their access rights can be controlled like any other resources. To restrict a set of dynamic resources to only some consumers, the administrator can either add them separately as access rights to their API keys, or place the resources in a common namespace using naming, for example `RESTar.Dynamic.MyInnerNamespace`, which can then be targeted with API keys.

To manage the dynamic resources of a RESTar application, use the [`RESTar.Dynamic.Resource`](../../Built-in%20resources/RESTar.Dynamic) meta-resource.

## Example

To create a new dynamic resource, insert an entity into [`RESTar.Dynamic.Resource`](../../Built-in%20resources/RESTar.Dynamic):

```
POST https://my-server.com/rest/dynamic.resource
Headers: 'Authorization: apikey mykey'
Body {
    "Name": "MyNewResource", // A name is required for the new resource
    "Description": "My fancy new resource" // Optional: add a description
    "EnabledMethods": ["GET", "POST", "DELETE"] // Optional: restrict methods
}
```

We can now insert whatever we like into our new resource:

```
POST https://my-server.com/rest/mynewresource
Headers: 'Authorization: apikey mykey'
Body {
    "SomeDecimal": 3.141592,
    "SomeNumber": 200,
    "SomeDateTime": "2018-09-15T22:35:00.0000000Z",
    "SomeString": "Lorem ipsum dolor sit amet",
    "SomeBoolean": true
}
```
