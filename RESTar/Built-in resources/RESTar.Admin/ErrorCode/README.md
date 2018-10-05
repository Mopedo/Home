---
permalink: RESTar/Built-in%20resources/RESTar.Admin/ErrorCode/
---

# `ErrorCode`

```json
{
    "Name": "RESTar.Admin.ErrorCode",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The error codes used by RESTar have their own resource, which is useful for administrators wanting to check some error code that appears in [`Error`](../Error) entities.

## Example

```
GET https://my-server.com/rest/errorcode/code<5
Headers: "Authorization: apikey mykey"
Response body:
[
    {
        "Name": "NoError",
        "Code": -1
    },
    {
        "Name": "Unknown",
        "Code": 0
    },
    {
        "Name": "InvalidUriSyntax",
        "Code": 1
    },
    {
        "Name": "InvalidMetaConditionValueType",
        "Code": 2
    },
    {
        "Name": "InvalidMetaConditionOperator",
        "Code": 3
    },
    {
        "Name": "InvalidMetaConditionSyntax",
        "Code": 4
    }
]
```
