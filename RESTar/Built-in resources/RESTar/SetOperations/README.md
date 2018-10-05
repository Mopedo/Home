---
permalink: RESTar/Built-in%20resources/RESTar/SetOperations/
---

# `SetOperations`

```json
{
    "Name": "RESTar.SetOperations",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `SetOperations` resource gives access to powerful set operations that work with JSON object arrays as sets of objects and objects as sets of property-value pairs. It lets the client specify a JSON tree of operations and data sources, and then returns the output as a set of objects. Use `SetOperations` for requests that cannot be performed using regular request components like conditions and meta-conditions. There are four operations available:

**Union**

> Returns the set union (all distinct elements) of two or more input sets.

**Intersect**

> Returns all entities that are elements in all input sets (two or more).

**Except**

> Returns all the entities from a first set that are not elements of a second set.

**Map**

> Runs each entity of an input set through a mapping function, and returns the union of all outputs.

`SetOperations` is designed to only work with `GET` requests, and operations are specified in the form of a JSON object tree that is included in the body of the request. This request body must conform to the following grammar (EBNF):

```
request-body = set-expression ;
set-expression = "{", operation-expression, "}" ;
operation-expression = operation, ":", "[", arguments, "]" ;
operation = "union" | "intersect" | "except" | "map" ;
arguments = argument, [",", arguments] ;
argument = set-expression ;
argument = ? relative GET request URI ? ;
argument = map-function ; (* only valid as second argument to map *)
map-function = ? relative GET request URI, optionally containing macro ? ;
macro = "$", "(", property-locator, ")" ;
property-locator = ? The path to a property in an entity ? ;
```

The syntax of request URIs is defined [here](../../../Consuming%20a%20RESTar%20API/URI). See the [examples](#example-1) below, for instances of the above grammar.

A set of objects, unlike a list, cannot contain multiple objects with (1) the same number of properties, (2) the same property names and (3) the same values for the respective properties. These objects are considered duplicates and are dropped.

All the request examples below work with our [demo service](../../../Consuming%20a%20RESTar%20API/Demo%20service), if you want to try things out yourself.

## Example 1:

```
GET https://restarhelp.mopedo-drtb.com:8282/api/setoperations
Headers: 'Authorization: apikey restar'
Body:
{
    "union": [
        "/superhero/gender=Female",
        "/superhero/hassecretidentity=true"
    ]

    // You can put relative URI strings in the arrays to denote sets of JSON objects.
}
```

The request above will find all `Superhero` entities where the `Gender` property has the value `"Female"`, and perform a set union with all `Superhero` entities that has the `HasSecretIdentity` property set to `true`. See the [tutorial repository](https://github.com/Mopedo/RESTar.Tutorial) for the definition of the `Superhero` resource.

## Example 2

Set operations calls can be nested in input JSON object trees. Also note that the order of elements in operation argument arrays is important for the non-symmetric functions `Except` and `Map`.

```
GET https://restarhelp.mopedo-drtb.com:8282/api/setoperations
Headers: 'Authorization: apikey restar'
Body: {
    "except": [
        {
           "union": [
                "/superhero/gender=Female",
                "/superhero/hassecretidentity=true"
            ]
        },
        "/superhero/yearintroduced<1990"
    ]
}
```

In this example, we take the output from the previous example, and then run a set except operation on it with all the `Superhero` entities where the `YearIntroduced` property is less than `1990`. The resulting set is all female superheros together with all superheroes with a secret identity, but excluding all the ones that were introduced prior to 1990.

## Example 3

What we want to do now is to take all superhero names that begin with the letter `D` and collect all the years when such a superhero was introduced. We then want to take this list of years and compile a list of all female super heroes that were introduced these years. Lastly, we want to print the names of all those female superheroes in alphabetical order. OK, let's take that again – in steps:

1. First we get a list of all superheroes with names beginning with the letter `D`. For this, we would use the following URI: `/superhero/name>D&name<E`.
2. Next we want to get only the years when any of those heroes were introduced and filter out any duplicates: `/superhero/name>D&name<E/select=yearintroduced&distinct=true`.
3. Now we need to input this list into a `Map` function that, for each year in the list gets all female super heroes that were introduced at that year, and just puts them all together in a new list. The first argument to `Map` will be our set from step 2\. The second argument will be this mapping function: `/superhero/gender=Female&yearintroduced=$(yearintroduced)`. `SetOperations` will replace `$(yearintroduced)` in the function string with the value of the `YearIntroduced` property, for example `1991`, contained in each entity in the argument set.
4. Now, to exclude properties that are not `Name`, and apply ordering, we can actually use regular URI meta-conditions in the call the `SetOperations`. This is the final request:

```
GET https://restarhelp.mopedo-drtb.com:8282/api/setoperations//select=Name&order_asc=Name
Headers: 'Authorization: apikey restar'
Body: {
    "map": [
        "/superhero/name>D&name<E/select=yearintroduced&distinct=true",
        "/superhero/gender=Female&yearintroduced=$(yearintroduced)"
    ]
}
```
