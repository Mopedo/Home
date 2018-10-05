# Resource

Resources can be specified in the URI either by the fully qualified name, a part of the full name or by an assignable [alias](../../../Built-in%20resources/RESTar.Admin/ResourceAlias). The full name is always unique for each resource. The resource `Mopedo.Bidding.Campaign` can be referenced with only `"Campaign"` as long as no other resource name ends with `".Campaign"` or an alias `"Campaign"` is assigned to some other resource.

To find all available resources' names for a RESTar appplication, make the following `GET` request:

```
https://my-server.com/rest/RESTar.AvailableResource//select=Name
```

## Views

Views are optional components of resources, that lets the consumer access different representations of the same resource. A `GET` request to an `Employee` resource will, for example, return representations of all `Employee` entities in the resource. But if a common use case for the resource is to get the ten employees with the highest sales scores and order them by sales score, the developer can choose to implement this as a separate view, making it easier to do this query. The consumer can see what views are available for some resource by making a `GET` request to the `AvailableResource` resource. Views are specified in the URI by adding a dash ("-") and the view name directly after the resource specifier, for example: `https://my-server.com/rest/employee-best`. When writing URIs, all [conditions](../Conditions) that are available for the resource, is also available for the view. The view may also define new properties that can be used only in conditions for that view.

## Macros

Macros are pre-defined syntactic templates for requests that enable advanced use cases, for example integration with clients that cannot send certain REST requests. To call a macro, place the macro name, preceded by a `$`-character, in place of the resource specifier in the URI. For more information, see how to [administer macros](../../../Administering%20a%20RESTar%20API/Macros).
