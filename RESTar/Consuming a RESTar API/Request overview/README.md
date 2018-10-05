---
permalink: RESTar/Consuming%20a%20RESTar%20API/Request%20overview/
---

# Request overview

Requests to the REST API of a RESTar application are standard HTTP requests. Encoded in a request is all information necessary to perform a certain operation on a given resource. RESTar has [multiple resource kinds](), that have slightly different methods of interaction, but let's stick with [entity resources]() for now, since they are the ones most commonly used. To further explore the components of HTTP requests to a RESTar application, use the links below:

## [Method](../Methods)

> Methods define the operation to perform on the selected resource

## [URI](../URI)

> URIs select the resource to operate on, and contain additional instructions for how the request should be processed.

## [Headers](../Headers)

> Headers define high-level request parameters like [authorization](../Headers/#authorization) and [content types](../Headers/#content-type).

## [Body](../Body%20and%20data%20sources)

> The body of the request is used to communicate content, for example a JSON representation of an entity, to the REST API.

## Examples

The easiest way to familiarize oneself with how to consume a RESTar API, is to make real requests to an actual RESTar API. For this purpose, feel free to use our test API. The URI examples below are written as relative URIs for the sake of brevity, but you can generate an absolute URI from them by pasting them directly after the root URI of the remote test service. The relative uri `/superhero` would generate the absolute URI `https://restarhelp.mopedo-drtb.com:8282/api/superhero`. Note that the test service only supports `GET`, `REPORT` and `HEAD` requests.

For all requests, the `Authorization` header has the value `apikey restar`.

Some example URIs:

```
List the first 10 superheroes:              /superhero//limit=10
Superheroes 15 to 20 (exclusive):           /superhero//limit=5&offset=14
All female superheroes:                     /superhero/gender=Female
5 male heroes with secret identities:       /superhero/gender=Male&hassecretidentity=true/limit=5
Female heroes introduced since 1990:        /superhero/gender=Female&yearintroduced>=1990
All male superhereoes' names:               /superhero/gender=Male/select=Name
  | + length of the name:                   /superhero/gender=Male/add=name.length&select=name,name.length
  | Ordered by name length:                 /superhero/gender=Male/add=name.length&select=name,name.length&order_asc=name.length
Years when a superhero was introduced:      /superhero//select=yearintroduced&distinct=true&order_asc=yearintroduced
Make a superhero report:                    /superheroreport
  | + weekday of first inserted as "Day"    /superheroreport//add=firstsuperheroinserted.insertedat.dayofweek&rename=firstsuperheroinserted.insertedat.dayofweek->Day
```
