---
permalink: RESTar/Consuming%20a%20RESTar%20API/URI/
---

# URI

Request URIs contain **three parts** that specify three important components of the request. These components are:

1. The **[resource](Resource)** that the request is aimed at, and – optionally – a view registered for that resource. All requests have one and only one resource.
2. The **[conditions](Conditions)**, if any, that are used to filter the entities in the selected resource.
3. The **[meta-conditions](Meta-conditions)**, if any, that provide meta-information about the request.

The [grammar](#grammar) section below gives a formal description of the format of request URIs. Before we dive into that, let's look at an informal one.

URIs begin with a **URL to the API**. For our [demo service](../Demo%20service), this is:

```
https://restarhelp.mopedo-drtb.com:8282/api
```

Now, in order – for each of the three URI parts mentioned above – we add a forward slash `/`, and either an underscore `_` (if the part should be left blank) or the part to include. If we want to include `superhero` as the resource, and `limit=2` as meta-conditions, for example, we can produce the following URI:

```
https://restarhelp.mopedo-drtb.com:8282/api/superhero/_/limit=2
```

See the links in the URI part list above for how they are written in URIs.

## Grammar

RESTar request URIs have the following grammar (EBNF):

```
URI = <scheme>, "://", <authority>, api-root, ["?"], "/", [resource], "/", [conditions], "/", [meta-conditions] ;
api-root = ? Configurable, default is "/rest" ? ;
resource = (resource-name | alias | ("$", macro-name)), ["-", view-name] ;
resource = "_" ;
resource-name = ? Name or partial name of a resource ?
alias = ? An alias assigned to some resource ?
macro-name = ? The name of a RESTar macro ?
view-name = ? The name of a resource view ?
conditions = condition, ["&", conditions] ;
conditions = "_" ;
condition = property-locator, operator, value-literal ;
property-locator = ? A string encoding the path to a property in an entity or entity type ? ;
operator = "=" | "!=" | "<" | ">" | "<=" | ">=" ;
value-literal = ? A string that encodes a value, for example "John" or "123" ;
meta-conditions = meta-condition, ["&", meta-conditions] ;
meta-conditions = "_" ;
meta-condition =
      "Unsafe=", ("true" | "false")
    | "Limit=", integer
    | "Offset=", integer
    | "Order_desc=", property-locator
    | "Order_asc=", property-locator
    | "Select=", property-locator, {",", property-locator}
    | "Add=", property-locator, {",", property-locator}
    | "Rename=", rename-scheme, {",", rename-scheme}
    | "Distinct=", ("true" | "false")
    | "Safepost=", property-locator, {",", property-locator}
    | "Format=", ? Name of output format ? ;
integer = ? Any integer ?
rename-scheme = property-locator, "->", ? A new name for the property (string) ? ;
```

**Notes**

- The `<scheme>` and `<authority>` terms above are left undefined – see [common URI syntax](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax) for their definitions.
- Trailing forward slashes (`/`) may be omitted.

### Instances

```
https://restarhelp.mopedo-drtb.com:8282/api
https://restarhelp.mopedo-drtb.com:8282/api/_
https://restarhelp.mopedo-drtb.com:8282/api/_/_
https://restarhelp.mopedo-drtb.com:8282/api/_/_/_
https://restarhelp.mopedo-drtb.com:8282/api/_/_/limit=2
https://restarhelp.mopedo-drtb.com:8282/api/_/name=Batman/limit=2
https://restarhelp.mopedo-drtb.com:8282/api?/superhero/name=Batman/limit=2
https://restarhelp.mopedo-drtb.com:8282/api?//name=Batman/limit=2
https://restarhelp.mopedo-drtb.com:8282/api?///limit=2
https://restarhelp.mopedo-drtb.com:8282/api?///
```

## Case sensitivity

All components in URIs are case-insensitive, except for value literals. When comparing, for example, the value of a string property in an entity with another value, the REST API makes difference between string values `"steve"` and `"Steve"`. It's, however, always safe to treat all URI components as case sensitive.

## Evaluation order

Each request can contain instructions for several operations, triggered by conditions and meta-conditions, that are carried out in a pre-defined order.

1. <conditions> – Entities are first filtered according to the conditions.</conditions>

2. [`search`](Meta-conditions#search) – Search filters are applied.

3. [`add`](Meta-conditions#add) – Additional properties are added.

4. [`rename`](Meta-conditions#rename) – All rename schemes are applied.

5. [`select`](Meta-conditions#select) – Properties are filtered according to the `select` property locator list.

6. [`distinct`](Meta-conditions#distinct) – Non-distinct entities are skipped.

7. [`order_desc`](Meta-conditions#order_desc) / [`order_asc`](Meta-conditions#order_asc) – The entities are ordered.

8. [`offset`](Meta-conditions#offset) – The offset is applied.

9. [`limit`](Meta-conditions#limit) – The number of entities are limited.

This means that if many of `select`, `rename` or `add` are used in the same request – property locators in `select` cannot make references to properties that have been renamed, but can reference added properties. `rename` can also reference added properties.
