---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/CampaignSpendingSnapshot/
---

# `CampaignSpendingSnapshot`

```json
{
    "Name": "Mopedo.Bidding.CampaignSpendingSnapshot",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

The DSP keeps track of [bidding campaign](../../Mopedo.Bidding/Campaign) spending using [campaign spending snapshots](../CampaignSpendingSnapshot). Each such snapshot holds data about the spending of a campaign during a given time period. The actual spending data is stored in [`AdSpendingSnapshot`](../AdSpendingSnapshot) entities, that are connected to the campaign spending snapshot – one for each [ad](../Ad) active for the given campaign during given time period. The bidding statistics of the campaign spending snapshot is calculated from each connected `AdSpendingSnapshot` entity.

This resource exists to allow clients to consume the campaign spending snapshots directly, should they – for example – want to download them to an external system for statistical analysis. For more information about how the DSP stores spending data, and how reports can be built from it, see the [reporting overview](../../Mopedo.Reporting/Reporting%20overview).

## Format

Property name       | Type                                                   | Description
------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------
CampaignId          | `string`                                               | The ID of the campaign that this snapshot was created for
BuyerId             | `string`                                               | The buyer ID of the campaign that this snapshot was created for
Campaign (hidden)   | [`Campaign`](../../Mopedo.Bidding/Campaign)            | The campaign that this snapshot was created for
Currency (hidden)   | `string`                                               | The currency that the prices in this snapshot is stored using
Period              | `string`                                               | The [period](#periods) of this snapshot
From                | [`datetime`](../../Datetime)                           | The date and time of the start of the period of this snapshot
To                  | [`datetime`](../../Datetime)                           | The date and time of the end of the period of this snapshot
Total               | [`Statistics`](,,/Statistics)                          | The total statistics for the given period and campaign
IsZero              | `boolean`                                              | Did this campaign not produce any bidding events during the given time period?
AdSpendingSnapshots | array of [`AdSpendingSnapshot`](../AdSpendingSnapshot) | The ad spending snapshot entities that hold the spending data for this campaign spending snapshot

> Hidden properties can be included in response bodies by using the [`add`](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI/Meta-conditions#add) meta-condition in the [request URI](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI).

## Periods

The data model for campaign spending snapshots and ad spending snapshots is nested into multiple levels of granularity, with more granular snapshots being created more often, for example every 20 minutes, and more general snapshots being created with wider time intervals, for example 14 days. The value of the `Period` property determines the length of the time interval during which the snapshot contains recorded spending information. Spending snapshots are automatically aggregated to more general periods over time, to enable more fine-grained spending information for recent time periods, as well as to make it fast to create reports for long-term spending. For details on how spending snapshots are aggregated over time, see the [reporting overview](../../Mopedo.Reporting/Reporting%20overview).

There are four snapshot periods:

### `_20min`

Encodes the spending of a campaign during a 20 minute period. These snapshots are created for all active campaigns at most three times an hour, at minutes `00`, `20` and `40`, whenever the DSP places a bid. If there, for example, is no bidding for a given campaign between 12 and 3 PM, there will be no `_20min` snapshots for that campaign within that timeframe. `_20min` snapshots provide the most granular bidding data of all snapshots, and are also the ones that are deleted first. For more information about snapshot deletion, see the [reporting overview](../../Mopedo.Reporting/Reporting%20overview).

### `_3h`

Encodes the spending of a campaign during a 3 hour period. These snapshots are created automatically eight times a day, at hours `00:00`, `03:00`, `06:00`, `09:00`, `12:00`, `15:00`, `18:00` and `21:00`, with data summed from all `_20min` snapshots within that 3 hour period.

### `_24h`

Encodes the spending of a campaign during a 24 hour period. These snapshots are created automatically every day, at `00:00` with data summed from all `_3h` snapshots from the previous day.

### `_14d`

Encodes the spending of a campaign during a 14 day period. These snapshots are created automatically every 14 days, at `00:00` with data summed from all `_24h` snapshots from the previous 14 days.

### Retroactive snapshots

The spending snapshot creation and aggregation logic is idempotent and retroactive, which means it keeps track of all snapshots that have been created, never creating duplicate snapshots, and creates snapshots retroactively for old bids and time campaigns. Since snapshots hold only IDs of ads and campaigns, they are not affected by the deletion of campaigns or ads.

### Debugging snapshots

The debug resource [`Mopedo.Debug.SnapshotControls`](../../Mopedo.Debug/SnapshotControls) can be used to debug, recreate and reload spending snapshots from the underlying [bid](../../Mopedo.Database/Bid) and [win](../../Mopedo.Database.Win) objects.

### Snapshot trimming

The DSP will automatically create and manage spending snapshots, to make sure that all periods with bidding are accounted for. Long periods with no bidding, for a given campaign, are simply kept empty to reduce the number of created snapshots. There is, however, a decision to be made regarding how long to keep the shortest snapshots, for example `_20min` and `_3h`, given that they have already been aggregated by some more more general snapshot. Trimming these snapshots would not result in data corruption, but we would no longer be able to create granular reports for old 20 minute and 3 hour periods. To deal with this, the DSP has a `SpendingSnapshotStoragePeriod` setting in [`Mopedo.Settings`](../../Settings) that allows the administrator to control when old snapshots are trimmed. If the DSP runs many campaigns and snapshots are filling up the RAM memory, use `"Short"`. If you want to be able to make granular reports, for example targeting individual 20 minute periods, on historic spending data older than 60 days, use `"Long"` or `"NoTrimming"`.

There are 4 possible values for `SpendingSnapshotStoragePeriod`, where `"Medium"` is the default value.

#### `"Short"`

- `_20min` snapshots are deleted after 14 days
- `_3h` snapshots are deleted after 60 days
- `_24h` snapshots are deleted after 365 days
- `_14d` snapshots are never deleted

#### `"Medium"`

- `_20min` snapshots are deleted after 60 days
- `_3h` snapshots are deleted after 365 days
- `_24h` snapshots are deleted after 1825 days (~5 years)
- `_14d` snapshots are never deleted

#### `"Long"`

- `_20min` snapshots are deleted after 365 days
- `_3h` snapshots are deleted after 1825 days (~5 years)
- `_24h` snapshots are deleted after 3650 days (~10 years)
- `_14d` snapshots are never deleted

#### `"NoTrimming"`

- No snapshots are deleted
