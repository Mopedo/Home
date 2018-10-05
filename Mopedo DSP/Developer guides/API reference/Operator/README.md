---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Operator/
---

# `Operator`

```json
{
    "Name": "Mopedo.Operator",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `Operator` resource contains all valid operators for use in [bid rule `Condition`](../Mopedo.Bidding/Campaign/#bidrule) entities.

## Format

Property name | Type     | Description
------------- | -------- | -----------------------------------------------
Op            | `string` | The operator string used in a Condition
Info          | `string` | A description of the operator and how to use it

## Example

```
GET https://my-dsp.com:8282/rest/operator
Headers: "Authorization: apikey mykey"
Response body:
[
    {
        "Op": "EQUALS",
        "Info": "True of two items if and only if they have the same value"
    },
    {
        "Op": "NOT EQUALS",
        "Info": "True of two items if and only if they do not have the same value"
    },
    {
        "Op": "CONTAINS",
        "Info": "True of two items if and only if they are both strings and the second is contained within the first (case sensitive)"
    },
    {
        "Op": "NOT CONTAINS",
        "Info": "True of two items if and only if CONTAINS is false for them"
    },
    {
        "Op": "IN",
        "Info": "True of two items if and only if they are both strings and the first is contained within the second (case sensitive)"
    },
    {
        "Op": "NOT IN",
        "Info": "True of two items if and only if IN is false for them"
    },
    {
        "Op": "GREATER THAN",
        "Info": "True of two items if and only if they are both strings and the first is lexiographically greater than the second (case sensitive) or they are both datetimes and the first is a point in time after the second or they are both numbers and the first is greater than the second"
    },
    {
        "Op": "LESS THAN",
        "Info": "True of two items if and only if they are both strings and the first is lexiographically less than the second (case sensitive) or they are both datetimes and the first is a point in time before the second or they are both numbers and the first is less than the second"
    },
    {
        "Op": "GREATER THAN OR EQUALS",
        "Info": "True of two items if and only if they are both strings and the first is lexiographically greater than or equal to the second (case sensitive) or they are both datetimes and the first is a point in time equal to or after the second or they are both numbers and the first is greater than or equal to the second"
    },
    {
        "Op": "LESS THAN OR EQUALS",
        "Info": "True of two items if and only if they are both strings and the first is lexiographically less than or equal to the second (case sensitive) or they are both datetimes and the first is a point in time equal to or before the second or they are both numbers and the first is less than or equal to the second"
    }
]
```
