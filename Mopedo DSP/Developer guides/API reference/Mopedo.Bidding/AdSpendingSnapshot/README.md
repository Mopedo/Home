---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/AdSpendingSnapshot/
---

# `AdSpendingSnapshot`

```json
{
    "Name": "Mopedo.Bidding.AdSpendingSnapshot",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

The DSP keeps track of [bidding campaign](../../Mopedo.Bidding/Campaign) spending using [campaign spending snapshots](../CampaignSpendingSnapshot). Each such snapshot holds data about the spending of a campaign during a given time period. The actual spending data is stored in [`AdSpendingSnapshot`](../AdSpendingSnapshot) entities, that are connected to the campaign spending snapshot – one for each [ad](../Ad) active for the given campaign during given time period. The bidding statistics of the campaign spending snapshot is calculated from each connected `AdSpendingSnapshot` entity.

This resource exists to allow clients to consume the ad spending snapshots directly, should they – for example – want to download them to an external system for statistical analysis. For more information about how the DSP stores spending data, and how reports can be built from it, see the [reporting overview](../../Mopedo.Reporting/Reporting%20overview).

## Format

_Properties marked in **bold** are required._

Property name                     | Type                                                      | Description
--------------------------------- | --------------------------------------------------------- | -----------------------------------------------------------------------------------------------
CampaignSpendingSnapshot (hidden) | [`CampaignSpendingSnapshot`](../CampaignSpendingSnapshot) | The campaign spending snapshot connected to this ad spending snapshot
AdId (hidden)                     | `string`                                                  | The ID of the [ad](../Ad) that this ad spending snapshot encodes spending for
BuyerId (hidden)                  | `string`                                                  | The buyer id of the [campaign](../Campaign) that this ad spending snapshot encodes spending for
Period (hidden)                   | `string`                                                  | The [period](../CampaignSpendingSnapshot#periods) of the campaign spending snapshot
From (hidden)                     | [`datetime`](../../Datetime)                              | The value of [`From`](../CampaignSpendingSnapshot) of the campaign spending snapshot
To (hidden)                       | [`datetime`](../../Datetime)                              | The value of [`To`](../CampaignSpendingSnapshot) of the campaign spending snapshot
Currency (hidden)                 | `string`                                                  | The [currency](../../Currency) that this ad spending snapshot is encoded in
NrOfBids                          | `integer`                                                 | The number of [bids](../../Mopedo.Database/Bid) during the period
NrOfWins                          | `integer`                                                 | The number of [wins](../../Mopedo.Database/Win) during the period
NrOfClicks                        | `integer`                                                 | The number of [clicks](../Click%20tracking) during the period
TotalBidPrice                     | [`Price`](../../Price)                                    | The total bid price during the period
AverageBidPrice                   | [`Price`](../../Price)                                    | The average bid price during the period
TotalWinPrice                     | [`Price`](../../Price)                                    | The total win price during the period
AverageWinPrice                   | [`Price`](../../Price)                                    | The average win price during the period
WinRate                           | `float`                                                   | `NrOfWins` divided by `NrOfBids` (or `0` if there are no bids)
ClickRate                         | `float`                                                   | `NrOfClicks` divided by `NrOfWins` (or `0` if there are no wins)
IsZero                            | `boolean`                                                 | Was there no bidding events during the period?

> Hidden properties can be included in response bodies by using the [`add`](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI/Meta-conditions#add) meta-condition in the [request URI](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI).
