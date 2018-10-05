---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Archive/BidResponseArchive/
---

# `Mopedo.Archive.BidResponseArchive`

```json
{
    "Name": "Mopedo.Archive.BidResponseArchive",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

`BidResponseArchive` is the SQLite based archive resource for `Mopedo.Database.BidResponse` entities. To set up an archiving [routine](../Routines) that moves bid responses to this archive, use `Mopedo.Database.BidResponse` as the value for the `Resource` property of the routine.

## Format

Property name         | Type                         | Description
--------------------- | ---------------------------- | -------------------------------------------------------------------------------------
ReceiverBidResponseId | `string`                     | A unique ID given to this bid response by the DSP
BidRequestId          | `string`                     | The ID of the bid request
UserId                | `string`                     | The `UserId` of the [`User`](../../Mopedo.Database/User) contained in the bid request
IP                    | `string`                     | The `IP` of the [`Device`](../../Mopedo.Database/Device) contained in the bid request
SiteDomain            | `string`                     | The `Domain` of the [`Site`](../../Mopedo.Database/Site) contained in the bid request
AppDomain             | `string`                     | The `Domain` of the [`App`](../../Mopedo.Database/App) contained in the bid request
Time                  | [`datetime`](../../Datetime) | The date and time when the bid request was received
HasWin                | `bool`                       | Is there a win registered for this bid response?
