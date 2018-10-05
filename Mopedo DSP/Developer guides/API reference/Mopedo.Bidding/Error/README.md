---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/Error/
---

# `Error`

```json
{
    "Name": "Mopedo.Bidding.Error",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

Whenever `Ad` or `Campaign` entities contain semantic errors, for example a missing property, they will be populated with `Error` entities in their corresponding `Errors` array. Whenever `IsValid` is `false` for an `Ad` or `Campaign`, you can find the reason for it being invalid by reading the `Errors` list. `Error` is also an independent resource, so you can enumerate all errors by making a `GET` request directly to it.

## Format

Property name | Type     | Description
------------- | -------- | --------------------------------------------------------------
Code          | `string` | The unique code for this error
Info          | `string` | A description of the error
At            | `string` | The location of the error within the `Ad` or `Campaign` entity
