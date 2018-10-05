---
permalink: RESTar/Built-in%20resources/RESTar.Admin/DatabaseIndex/
---

# `DatabaseIndex`

```json
{
    "Name": "RESTar.Admin.DatabaseIndex",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

The Starcounter in-memory database needs to have proper database indexes set up for queries to work as fast as possible. RESTar uses Starcounter SQL to query database tables, which means that indexes are as important as in other Starcounter applications. Should the administrator need to optimize any queries on large resources for speed – adding and index can greatly improve performance.

## Format

Property name | Type                 | Description
------------- | -------------------- | -----------------------------------------------------------
Name          | `string`             | A name for the index. Needs to be unique.
ResourceName  | `string`             | The name of the resource on which this index is registered.
Provider      | `string` (read-only) | The resource provider that registered this index.
Columns       | array of `Column`    | The column tuple registered in this index.

## Column

Format:

Property name | Type      | Description
------------- | --------- | ------------------------------------------------------------------------
Name          | `string`  | The name of the column (property) to include in the index.
Descending    | `boolean` | Should this index be in decending order? Default is `false` (ascending).

Indexes are registered for a resource on tuple of columns, corresponding with the properties of the resource. For each column, we can decide the direction of the index, which can affect the speed of some query result ordering. For more information about Starcounter database indexes, see the [Starcounter documentation](https://docs.starcounter.io/guides/SQL/indexes).

## Example

This is an example from online advertising. A **bid request** is a trading opportunity where some online advertising inventory is made available for bidding from e.g. advertisers. These opportunities are pushed to a RESTar application, and made available for API consumers in a resource `Mopedo.Database.BidRequest`. It's a large resource, containing millions of entities.

Now we would like to get the 100 latest bid requests every minute, to generate a live view of the current trading opportunities. In this live view we will, for example, display site domains and device information for recent bid requests. For this we would like to use the following `GET` request:

```
GET https://my-dsp.com:8282/rest/bidrequest//order_desc=time&limit=100
Headers: "Authorization: apikey mykey"
```

By making a `GET` request to `/databaseindex` we can see that there is no index for the `Time` column in the `Mopedo.Database.BidRequest` resource. This means that these `GET` requests could greatly benefit from having a new index registered for this database column. To register an appropriate index, we use this request:

```
POST https://my-dsp.com:8282/rest/databaseindex
Body: {
    "Name": "MyBidRequestIndex",
    "ResourceName": "Mopedo.Database.BidRequest",
    "Columns": [
        {
            "Name": "Time",
            "Descending": true
        }
    ]
}
Headers: "Authorization: apikey mykey"
```
