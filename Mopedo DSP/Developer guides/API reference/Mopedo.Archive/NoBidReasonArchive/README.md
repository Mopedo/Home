---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Archive/NoBidReasonArchive/
---

# `Mopedo.Archive.NoBidReasonArchive`

```json
{
    "Name": "Mopedo.Archive.NoBidReasonArchive",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

`NoBidReasonArchive` is the SQLite based archive resource for `Mopedo.Bidding.NoBidReason` entities. To set up an archiving [routine](../Routines) that moves `NoBidReason` entities to this archive, use `Mopedo.Bidding.NoBidReason` as the value for the `Resource` property of the routine.

## Format

Property name | Type                         | Description
------------- | ---------------------------- | ------------------------------------------------------
Type          | `string`                     | The type of this `NoBidReason` entity
Domain        | `string`                     | The domain of the missing bid opportunity
Info          | `string`                     | Information about the missing bid opportunity
Time          | [`datetime`](../../Datetime) | The date and time of the missing bid opportunity
CampaignId    | `string`                     | The ID of the campaign that generated this NoBidReason
BuyerId       | `string`                     | The buyer id of the campaign
AdId          | `string`                     | The ID of the ad that generated this NoBidReason
