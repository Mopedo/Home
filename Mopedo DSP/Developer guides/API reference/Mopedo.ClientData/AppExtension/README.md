---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.ClientData/AppExtension/
---

# `AppExtension`

```json
{
    "Name": "Mopedo.ClientData.AppExtension",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

The `AppExtension` resource works just like [`SiteExtension`](../SiteExtension), but for [`User`](../../Mopedo.Database/App) entities instead of `Site` entities. It indivuduates its `App` entity by means of the `Domain` property and is also useful for creating whitelists and blacklists. `Domain` and all case variations of it, are reserved property names and cannot be used for client-defined data points.
