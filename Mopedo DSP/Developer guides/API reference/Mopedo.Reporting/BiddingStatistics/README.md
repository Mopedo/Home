---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Reporting/BiddingStatistics/
---

# `BiddingStatistics`

```json
{
    "Name": "Mopedo.Reporting.BiddingStatistics",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

`BiddingStatistics` is the best way to generate simple [short-term](../Reporting%20overview#short-term-reports) and [long-term](../Reporting%20overview#short-term-reports) spending reports for [campaigns](../Campaign) and [ads](../Ad). These statistics are generated for campaigns and ads, or groups of campaigns and ads based on their buyer ids, and for a given time period. Statistics can also be grouped into periods, much like [`PeriodReport`](../PeriodReport) reports.

Unlike the other reporting resources, `BiddingStatistics` uses [`CampaignSpendingSnapshot`](../../Mopedo.Bidding/CampaignSpendingSnapshot) and [`AdSpendingSnapshot`](../../Mopedo.Bidding/AdSpendingSnapshot) entities to generate statistics, which is much faster than working with individual [bids](../../Mopedo.Database/Bid) and [wins](../../Mopedo.Database/Win) over time. It's also indifferent to whether bids and wins are kept in the database, which makes it ideal for long-term reports. It does not, however, support the creation of more fine-grained reports, like calculating win rates for bidding on a given site or user. For these kinds of reports, use one of the dedicated [short-term report resources](../Reporting%20overview#short-term-reports).

For a general overview of DSP reporting, see the [reporting overview](../Reporting%20overview).

## Report parameters

The following properties can be used in [request URIs](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI) to specify the report parameters:

Property name | Type                         | Description
------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
From          | [`datetime`](../../Datetime) | The date and time to start reporting from
To            | [`datetime`](../../Datetime) | The date and time when the report should end
CampaignId    | `string`                     | An optional [campaign](../Campaign) ID to limit the report to
BuyerId       | `string`                     | An optional buyer ID (of campaigns) to limit the report to
AdId          | `string`                     | An optional [ad](../Ad) ID to limit the report to
GroupBy       | `string`                     | An optional [grouping](#grouping) parameter
Currency      | `string`                     | A currency to use in the generated report(s). If omitted, the default currency (as set in the [configuration](../../../../Administration%20guides/Configuration%20guide)) is used

## Format

The response is a list of reports with the following format:

Property name | Type                                            | Description
------------- | ----------------------------------------------- | ---------------------------------------------------
From          | [`datetime`](../../Datetime)                    | The date and time of the start of the report period
To            | [`datetime`](../../Datetime)                    | The date and time of the end of the report period
Statistics    | [`Statistics`](../../Mopedo.Bidding/Statistics) | The statistics for the given time period

## Grouping

`BiddingStatistics` supports grouping bidding statistics by a time period given in the `GroupBy` parameter. Using `GroupBy` we can, for example, order a day's spending into 8 "chunks", each representing a 3 hour periods of the day. Each allowed value of `GroupBy` has a certain spending snapshot period that it uses for generating the report(s). If we want to group spending by 20 minute periods, for example, we set `GroupBy` to `"20min"`, which would also mean we're using [`_20min`]() [campaign spending snapshots](../../Mopedo.Bidding/CampaignSpendingSnapshot) for the report. Some `GroupBy` values, like `"12h"` for example, does not have a dedicated snapshot period, and instead uses 4 `_3h` snapshots to generate each report.

For each period `P`, where `P` is any of the values listed below, `GroupBy` groups the ouput into periods with `P` as length, starting with the `P` period that the `From` parameter is included in. If no `From` parameter is included, the first ever `P` period where there were bidding events is the first period included in the report. If the `To` time parameter does not refer to an even `P` period end, the `P` period to which it belongs will be included. If the `To` parameter is omitted, the current date and time is used as the end for the report period.

`GroupBy` conditions may have any of the following seven values:

- **`"20min"`** – groups the output into 20 minute periods.
- **`"1h"`** - groups the output into 1 hour periods.
- **`"3h"`** - groups the output into 3 hour periods.
- **`"12h"`** - groups the output into 12 hour periods.
- **`"24h"`** - groups the output into 24 hour periods.
- **`"7d"`** - groups the output into 7 day periods.
- **`"14d"`** - groups the output into 14 day periods.

### Important

The DSP does not store spending snapshots of all periods indefinetely. `_20min` snapshots, for example, are usually trimmed after 60 days. For more information, see the section on [snapshot trimming](../../Mopedo.Bidding/CampaignSpendingSnapshot#snapshot-trimming).
