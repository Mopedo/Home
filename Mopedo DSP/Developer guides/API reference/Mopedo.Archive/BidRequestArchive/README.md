---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Archive/BidRequestArchive/
---

# `Mopedo.Archive.BidRequestArchive`

```json
{
    "Name": "Mopedo.Archive.BidRequestArchive",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

`BidRequestArchive` is the SQLite based archive resource for `Mopedo.Database.BidRequest` entities. To set up an archiving [routine](../Routines) that moves bid requests to this archive, use `Mopedo.Database.BidRequest` as the value for the `Resource` property of the routine.

**Important**: Only bid request entities themselves are archived, not the [`User`](../../Mopedo.Database/User), [`Device`](../../Mopedo.Database/Device),[`Site`](../../Mopedo.Database/Site), [`App`](../../Mopedo.Database/App) or other entities that are referenced from [`BidRequest`](../../Mopedo.Database/BidRequest) entities. These remain in the Starcounter in-memory database.

## Format

Property name | Type                         | Description
------------- | ---------------------------- | -------------------------------------------------------------------------------------
BidRequestId  | `string`                     | The ID of the bid request
UserId        | `string`                     | The `UserId` of the [`User`](../../Mopedo.Database/User) contained in the bid request
IP            | `string`                     | The `IP` of the [`Device`](../../Mopedo.Database/Device) contained in the bid request
SiteDomain    | `string`                     | The `Domain` of the [`Site`](../../Mopedo.Database/Site) contained in the bid request
AppDomain     | `string`                     | The `Domain` of the [`App`](../../Mopedo.Database/App) contained in the bid request
Time          | [`datetime`](../../Datetime) | The date and time when the bid request was received
