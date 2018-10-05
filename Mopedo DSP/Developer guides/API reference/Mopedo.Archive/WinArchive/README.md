---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Archive/WinArchive/
---

# `Mopedo.Archive.WinArchive`

```json
{
    "Name": "Mopedo.Archive.WinArchive",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

`WinArchive` is the SQLite based archive resource for `Mopedo.Database.Win` entities. To set up an archiving [routine](../Routines) that moves wins to this archive, use `Mopedo.Database.Win` as the value for the `Resource` property of the routine.

## Format

Property name         | Type                         | Description
--------------------- | ---------------------------- | -------------------------------------------------------------------------------------
BidId                 | `string`                     | A unique ID given to this bid by the DSP
ReceiverBidResponseId | `string`                     | A unique ID given to the bid response of this bid by the DSP
BidRequestId          | `string`                     | The ID of the bid request of this bid
UserId                | `string`                     | The `UserId` of the [`User`](../../Mopedo.Database/User) contained in the bid request
IP                    | `string`                     | The `IP` of the [`Device`](../../Mopedo.Database/Device) contained in the bid request
SiteDomain            | `string`                     | The `Domain` of the [`Site`](../../Mopedo.Database/Site) contained in the bid request
AppDomain             | `string`                     | The `Domain` of the [`App`](../../Mopedo.Database/App) contained in the bid request
Time                  | [`datetime`](../../Datetime) | The time when the bid was placed
CampaignId            | `string`                     | The id of the `Campaign` that generated this bid
BuyerId               | `string`                     | The buyer id of the campaign that placed this bid
AdId                  | `string`                     | The id of the `Ad` used for this bid
ClickLandingPage      | `string`                     | The landing page of the ad included in this bid (if any)
Clicked               | `boolean`                    | Was the ad clicked?
WinPriceAmountCPM     | `decimal`                    | The win price amount, as CPM
WinPriceCurrency      | `string`                     | The currency that the win price is expressed in
