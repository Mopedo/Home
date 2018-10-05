---
permalink: RESTar/Built-in%20resources/RESTar/Aggregator/
---

# `Aggregator`

```json
{
    "Name": "RESTar.Aggregator",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `Aggregator` resource is used to create custom aggregated datasets from potentially multiple requests to the web resources of a RESTar application. It accepts a [request template](#request-templates) as input – which is included as [body](../../Consuming%20a%20RESTar%20API/Body%20and%20data%20sources) of `GET` requests. It then parses the request template and makes internal API requests for all [request literals](#request-literals) contained in the template. Then the results from these API requests, which is either an object array (for `GET` requests) or an integer (for `REPORT` requests), are substituted for t he request literals in the request template. Finally the populated request template is returned as output and sent back to the client.

## Simple example

For this example, we use the [RESTar demo service](../../Demo%20service).

generate a dynamic object containing the results of a number of other internal requests. It's useful for generating reports of arbitrary format without sending multiple requests and stitching together the responses. The resource expects an object template to be given in `GET` requests. Using simple markup, the template can encode internal requests, that are then substituted for the values they return in the object structure. These internal requests are written as internal URI strings starting with (optionally) an HTTP method (if no method is given, `GET` is used), followed by a forward slash (`'/'`) followed by a resource specifier or macro, conditions and so on. Non-URI values in the template are simply ignored and returned in the output as-is.

## Example

```
GET https://my-server.com/rest/aggregator
Body: {
    "NrOfResources": "REPORT /resource",
    "ResourceNames": "/resource//select=name", // GET is inferred
    "PleaseIgnoreThis": 123
}
Response body: [{
    "NrOfResources": 39,
    "ResourceNames": [
        {
            "Name": "RESTar.Admin.AdminTools"
        },
        {
            "Name": "RESTar.Admin.DatabaseIndex"
        },
        {
            "Name": "RESTar.Admin.Error"
        },
        {
            "Name": "RESTar.Admin.ErrorCode"
        },
        {
            "Name": "RESTar.Admin.Macro"
        }
    ],
    "PleaseIgnoreThis": 123
}]

// REPORT requests are reduced to integers
// GET requests are reduced to JSON arrays of objects
```
