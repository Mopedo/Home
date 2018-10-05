---
permalink: RESTar/Built-in%20resources/RESTar.Admin/ResourceProfile/
---

# `ResourceProfile`

```json
{
    "Name": "RESTar.Admin.ResourceProfile",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `ResourceProfile` resource gives support for profiling memory usage and calculating the sizes of Starcounter database tables, and other resources that support profiling.

In the case of Starcounter database tables, it uses a simple algorithm for estimating table sizes, and should not be considered a valid absolute size calculation. It's, however, useful for determining the relative sizes of tables.

## Format

Property name    | Type           | Description
---------------- | -------------- | -----------------------------------------------------------------------
Resource         | `string`       | The name of the profiled resource
NumberOfEntities | `string`       | The number of entities in the resource
ApproximateSize  | `ResourceSize` | An approximation of the resource size in memory or on disk
SampleSize       | `string`       | The size of the sample used to generate the resource size approximation

## `ResourceSize`

### Format

Property name | Type      | Description
------------- | --------- | ---------------------
Bytes         | `integer` | The size in bytes
KB            | `float`   | The size in kilobytes
MB            | `float`   | The size in megabytes
GB            | `float`   | The size in gigabytes
