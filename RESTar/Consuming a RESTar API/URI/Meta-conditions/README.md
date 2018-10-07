# Meta-conditions

With meta-conditions, we can include meta-information about the request in the URI, and instruct the server to perform certain operations when handling the request. Meta-conditions consist of three parts: a meta-condition name, an equals sign ("="), and a meta-condition value of a predefined type. Meta-condition value literals, like all value literals, are case-sensitive, except when they are property locators – then they are case-insensitive. These are the meta-condition keys:

- [**unsafe**](#unsafe)
- [**limit**](#limit)
- [**offset**](#offset)
- [**order_asc**](#order_asc)
- [**order_desc**](#order_desc)
- [**select**](#select)
- [**add**](#add)
- [**rename**](#rename)
- [**distinct**](#distinct)
- [**search**](#search)
- [**search_regex**](#search)
- [**safepost**](#safepost)
- [**format**](#format)

The subsections below go through each of these in more detail:

## `unsafe`

Type: `boolean`

By default, the REST API protects against unsafe requests that could result in performance issues or serious accidental data loss or corruption if triggered by mistake. Example of such requests could be:

1. ~~`GET` requests that return all entities in very large resources...~~

  > This was previously considered an unsafe operation, but is no longer since the [WebSocket shell](../../../Built-in%20resources/RESTar/Shell), which has its own [streaming mechanism](../../Consuming%20terminal%20resources#streaming) to guard against this, is the new preferred way to debug and test RESTar applications.

2. `PATCH` requests that modify multiple entities. If the wrong [conditions](../Conditions) are used when trying to update a single entity, and the server instead changes many entities, unwanted data loss or corruption could occur.

3. `DELETE` requests that delete many entities, when just one entity was supposed to be deleted.

To prevent this, the API uses a meta-condition `unsafe` to let the consumer confirm all such potentially dangerous requests. For update and delete requests, RESTar will send a `400: Bad request` response whenever multiple entities would be affected by a request and unsafe was not set to `true`.

## `limit`

Type: `integer`

`limit` puts an upper limit on the number of entities selected by a request.

```
GET https://my-server.com/rest/user                        // lists all users
GET https://my-server.com/rest/user//limit=15              // lists first 15 users
GET https://my-server.com/rest/user//limit=2000            // lists first 2000 users
GET https://my-server.com/rest/user//limit=15&unsafe=true  // lists first 15 users
```

## `offset`

Type: `integer`

Offsets are used to offset the enumeration of the output entities from a `GET` request. [RESTar pagination](../../#pagination) is defined in terms of `limit` and `offset`.

```
GET https://my-server.com/rest/user               // lists all users
GET https://my-server.com/rest/user//offset=10    // lists all users except the first 10
```

## `order_asc`

Type: `string`

`order_asc` orders the output entities in ascending order based on the value of some given property. The value is a property locator that selects the property to order by.

```
GET https://my-server.com/rest/customer/segment=A1/order_asc=name // lists first 1000 customers in segment A1, ordered by name in ascending order
```

## `order_desc`

Type: `string`

`order_desc` works like `order_asc` but applies a descending ordering.

```
GET https://my-server.com/rest/user//order_desc=name    // lists first 1000 users, ordered by name in descending order
```

## `select`

Type: `string`

`select` takes a comma-separated list of property locators as arguments, and filters the output so that only the specified properties are included.

```
GET https://my-server.com/rest/customer/cuid=a123
Response body:
[{
    "Cuid": "a123",
    "DateOfRegistration": "2003-11-02T00:00:00Z",
    "Name": "Michael Bluth",
    "Segment": "A1"
}]

GET https://my-server.com/rest/customer/cuid=a123/select=name,cuid
Response body:
[{
    "Cuid": "a123",
    "Name": "Michael Bluth"
}]
```

## `add`

Type: `string`

The `add` meta-condition takes a list of property locators as argument, and adds the denoted properties to the output.

```
GET https://my-server.com/rest/customer/cuid=a123
Response body:
[{
    "Cuid": "a123",
    "DateOfRegistration": "2003-11-02T00:00:00Z",
    "Name": "Michael Bluth",
    "Segment": "A1"
}]

GET https://my-server.com/rest/customer/cuid=a123/add=name.length
Response body:
[{
    "Cuid": "a123",
    "DateOfRegistration": "2003-11-02T00:00:00Z",
    "Name": "Michael Bluth",
    "Segment": "A1",
    "Name.Length": 13
}]
// Length is a public instance property of String (defined in .NET). All public
// instance properties are available for Add.
```

## `rename`

Type: `string`

The `rename` meta-condition instructs the server to give certain properties of entities in output new names. `rename` takes a comma-separated list of strings, where each string has the following syntax (EBNF):

```
rename = property-locator, "->", new-name ;
```

`property-locator` refers to the property in the resource that should be renamed. `new-name` is simply a case sensitive string – the new name for the property. `select` and `rename` can be used in the same request, in which case `rename` is always evaluated before `select`. See the request [evaluation order](../#evaluation-order) for more information.

```
GET https://my-server.com/rest/customer/cuid=a123
Headers: 'Authorization: apikey mykey'
Response body:
[{
    "Cuid": "a123",
    "DateOfRegistration": "2003-11-02T00:00:00Z",
    "Name": "Michael Bluth",
    "Segment": "A1"
}]

GET https://my-server.com/rest/customer/cuid=a123/rename=cuid->customerId,segment->s
Headers: 'Authorization: apikey mykey'
Response body:
[{
    "customerId": "a123",
    "DateOfRegistration": "2003-11-02T00:00:00Z",
    "Name": "Michael Bluth",
    "s": "A1"
}]
```

## `distinct`

Type: `boolean`

If `distinct` is set to `true` in a request, only distinct objects will be included in the output. This operation is performed after `add`, `rename` and `select`, so object properties added or renamed will be taken into account.

## `search`

Type: `string`

`search` applies a search filter on a representation of the output, and returns only entities that included the search pattern.

```
GET https://my-server.com/rest/customer//search=sitw
Headers: 'Authorization: apikey mykey'
Response body:
{
    "Cuid": "a234",
    "DateOfRegistration": "1982-02-05T00:00:00Z",
    "Name": "Stan Sitwell",
    "Segment": "A1"
}
```

### Search settings

There are two search settings that can be included along with the search pattern, to control case sensitivity as well as to limit the search scope to the values of a given entity property. The syntax for this is the following (EBNF):

```
ConditionValue = Pattern ["," , PropertyScope, "," , ["CS" | "CI"]]
PropertyScope = (? Property name ?)
PropertyScope = ""
```

Search settings are optional. If no property scope is included, the whole entity is searched. If no case sensitivity setting is included, the search is case insensitive.

#### Examples

```
/search=John%20Smith
/search=John%20Smith,,CS
/search=John%20Smith,name,CS
```

## `search_regex`

Type: `string`

`search_regex` applies a [regular expression](https://en.wikipedia.org/wiki/Regular_expression) string search filter on a representation of the output, and returns only entities that matched the search pattern. In the example below, we match only against customers with a name beginning with `S` and ending with `l`. Before URI encoding, the regex pattern looked like this: `^S.*l$`. See [this section](#search-settings) for how to include search settings.

```
GET https://my-server.com/rest/customer//search_regex=%5ES.%2Al%24
Headers: 'Authorization: apikey mykey'
Response body:
{
    "Cuid": "a234",
    "DateOfRegistration": "1982-02-05T00:00:00Z",
    "Name": "Stan Sitwell",
    "Segment": "A1"
}
```

## `safepost`

Type: `string`

`safepost` is used to trigger a special type of `POST` request, where the input is matched against existing entities to avoid duplicates. Think of a `safepost` request as a series of repeated `PUT` requests, where all entities in the data source are matched against existing entities, and inserted only if there is no existing entity to update. As parameter, `safepost` takes a comma-separated list of property locators, and returns an aggregated response containing the number of inserted and updated entities. The data source can, just as in regular `POST` requests, be contained in the request body or specified as an external source using the [`Source` header](../../Headers#source). `safepost` is also an important feature when using the [`Destination` header](../../Headers#destination).

```
POST https://my-server.com/rest/customer//safepost=cuid
Headers: 'Authorization: apikey mykey'
Body: [{
    "Cuid": "a123",
    "DateOfRegistration": "2003-11-02T00:00:00Z",
    "Name": "Michael Bluth",
    "Segment": "A1"
},{
    "Cuid": "a234",
    "DateOfRegistration": "1982-02-05T00:00:00Z",
    "Name": "Stan Sitwell",
    "Segment": "A1"
}]
```

The above request is equivalent to running both of the two requests below:

```
PUT https://my-server.com/rest/customer/cuid=a123
Headers: 'Authorization: apikey mykey'
Body: {
    "Cuid": "a123",
    "DateOfRegistration": "2003-11-02T00:00:00Z",
    "Name": "Michael Bluth",
    "Segment": "A1"
}

PUT https://my-server.com/rest/customer/cuid=a234
Headers: 'Authorization: apikey mykey'
Body: {
    "Cuid": "a234",
    "DateOfRegistration": "1982-02-05T00:00:00Z",
    "Name": "Stan Sitwell",
    "Segment": "A1"
}
```

## `format`

Type: `string`

The administrator will enable a set of [output formats](../../../Built-in%20resources/RESTar.Admin/OutputFormat) that should be enabled when serializing JSON output. The `format` meta-condition is used to set the output format for JSON serialization of `GET` response bodies on a per-request basis. The value should be a name of an output format (case insensitive).

```
GET https://my-server.com/rest/customer//format=simple
```
