---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Database/IabCode/
---

# `IabCode`

```json
{
    "Name": "Mopedo.Database.IABCode",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `IabCode` resource gives access to all valid [IAB](https://www.iab.com) content category codes used in the `Ad` resource. You can also view the content category codes [here](https://support.aerserv.com/hc/en-us/articles/207148516-List-of-IAB-Categories).

## Format

Property name | Type     | Description
------------- | -------- | --------------------------------------------------------------------------
Code          | `enum`   | The IAB content category code. Use this in the `Categories` array of `Ad`.
Description   | `string` | A description of the IAB category
