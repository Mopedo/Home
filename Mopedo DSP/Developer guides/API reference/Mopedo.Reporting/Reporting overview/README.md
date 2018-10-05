---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Reporting/Reporting%20overview/
---

# Reporting overview

The purpose of the resources in the `Mopedo.Reporting` namespace is to give access to a set of useful reports that are generated from other DSP resources, for example [bid requests](../../Mopedo.Database/BidRequest), [bids](../../Mopedo.Database/Bid) and [wins](../../Mopedo.Database/Win). The DSP report resources also provide a distinction between [short-term](#short-term-reports) and [long-term](#long-term-reports) reports, and some guidelines on when to use them.

## Short-term reports

Short-term reports refer to reports that are calculated from a data source of relatively recent data, for example the bidding of the last couple of days. Given that the data source is accurate, calculating fast and accurate short-term reports can be done by simply aggregating the content of the data source. Working with the data source directly also allows for flexible reports with no loss in detail.

A good example of a short-term report is [`Mopedo.Database.WinReport`](../WinReport), that is used to calculate win metrics directly from the [`Mopedo.Database.Bid`](../../Mopedo.Database/Bid) and [`Mopedo.Database.Win`](../../Mopedo.Database/Win) data sources. Since we're working with these data sources directly, we can use their properties, and the properties of their properties, in our report parameters for increased flexibility and level of detail. We can, for example, create a `WinReport` for all wins from the third of May 2018, for sites with a domain longer than five characters, and with a device that was located in Sweden.

```
/winreport/time>2018-05-03&time<2018-05-04&bid.site.domain.length>5&bid.device.geo.country=SE
```

As we can see from the example above, short-term reports can be very granular and flexible. Since we're working directly with bids and wins, we can use all their properties and relations in report parameters. This is both the strength and the weakness of short-term reports – we need to keep bids and wins for as long as we want to be able to generate reports. And calculating reports will take longer for each bid and win that is included. If a campaign, for example, places thousands of bids each hour for 60 days, we can easily get millions of bids and wins in our database for that period. Calculating the win rate (the number of wins divided by the number of bids) for the campaign would require iterating over them all, which is a huge operation compared with the kind of calculation we saw in the example above.

Also, keeping millions of bids and wins in the in-memory database is another problem in and of itself, as discussed [here](../../Mopedo.Archive/Archive%20overview). In short, we cannot expect bids and wins to remain in the in-memory database indefinitely, and to delete old bids and wins will also mean that we cannot create reports from them, which is a big problem when calculating campaign performance over time. To solve this, the DSP has a separate long-term reporting system.

## Long-term reports

Long-term reports differ from short-term reports in that they are not calculated from wins and bids, but from [spending snapshots](../../Mopedo.Bidding/CampaignSpendingSnapshot). Spending snapshots are data entities that hold spending data for a campaigns and ads during a given snapshot period. If there is a spending snapshot for a campaign for the 24 hour period 2018-01-01 – 2018-01-02, for example, that means that we can calculate a spending report from this snapshot, without having to find bids and wins for this period. The bids and wins need not even be kept in the database, as long as the spending snapshot exists.

[`BiddingStatistics`](../BiddingStatistics) is the go-to resource for long-term reports that are calculated from spending snapshots. And since spending snapshots are automatically created for current time periods as well, it's great for creating simple short-term reports as well. Creating `BiddingStatistics` reports is very fast for any time period, due to the fact that spending snapshots are aggregated over time. Note, however, that we cannot be as granular as we could in the short-term reports.
