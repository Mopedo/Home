---
permalink: RESTar/Consuming%20a%20RESTar%20API/Methods/
---

# Methods

RESTar accepts eight common HTTP methods in requests to entity resources.

## `GET`

`GET` requests returns all entities in the selected resource that match a given set of conditions. If no conditions are given, all entities in the resource are returned.

## `POST`

`POST` inserts an entity or a list of entities from a [data source](../Body%20and%20data%20sources) into the selected resource.

## `PATCH`

`PATCH` updates one or more existing entities in the selected resource, identified by a given set of conditions. If no entity is found by matching against conditions, a `404` response is returned. To update multiple entities with a single request, which is a potentially unsafe operation, include `unsafe=true` as [meta-condition](../URI/Meta-conditions#unsafe). Matched entities are updated with the content from a provided entity, from a [data source](../Body%20and%20data%20sources).

## `PUT`

`PUT` is the duplicate-safe way to insert new entities in a resource. `PUT` will find any single existing entity in the selected resource matched by a given set of conditions. If no entity is found, a `POST` will be made to the resource with the entity provided from a [data source](../Body%20and%20data%20sources). If an entity is found, a `PATCH` will be made on that entity with the content from an entity provided from a data source. If more than one entity is found, a `400` response is returned.

## `DELETE`

`DELETE` will find all entities in the selected resource matched by a given set of conditions. If only one entity was found, that entity will be deleted from the resource. If more than one entity was found, a `400` response is returned. To override this behavior and delete all found entities, which is a potentially unsafe operation, include `unsafe=true` as [meta-condition](../URI/Meta-conditions#unsafe).

## `REPORT`

`REPORT` performs a `GET` request, but instead of returning representations of resource entities selected by the request, the number of entities is returned. `REPORT`, as implemented in RESTar, is technically a variant of `GET`, and all resources supporting `GET`, also supports `REPORT`. All API keys that have `GET` access to a resource, also have `REPORT` access. All `REPORT` requests have the same response body format:

_Properties marked in **bold** are required._

Property name | Type      | Description
------------- | --------- | ----------------------------------------------
Count         | `integer` | The number of entities selected by the request

## `HEAD`

`HEAD` performs a `GET` request, but instead of returning representations of resource entities selected by the request, only the response headers are returned. `HEAD` is technically a variant of `GET`, and all resources supporting `GET`, also supports `HEAD`. All API keys that have `GET` access to a resource, also have `HEAD` access.
