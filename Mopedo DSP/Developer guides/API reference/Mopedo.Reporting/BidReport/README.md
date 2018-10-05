---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Reporting/BidReport/
---

# `BidReport`

```json
{
    "Name": "Mopedo.Reporting.BidReport",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

`BidReport` is a [short-term reporting resource](../Reporting%20overview#short-term-reports) that works like the [`WinReport`](../WinReport) resource, but for [`Bid`](../../Mopedo.Database/Bid) entities instead of `Win` entities.

## Report parameters

The following properties can be used in [request URIs](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI) to specify the report parameters:

Property name            | Type                                     | Description
------------------------ | ---------------------------------------- | -----------------------------------------------------
User                     | [`User`](../../Mopedo.Database/User)     | The user on which the bid(s) was placed
Device                   | [`Device`](../../Mopedo.Database/Device) | The device on which the bid(s) was placed
Site                     | [`Site`](../../Mopedo.Database/Site)     | The site on which the bid(s) was placed
App                      | [`User`](../../Mopedo.Database/App)      | The app on which the bid(s) was placed
Id                       | `string`                                 | The unique ID for the bid
AdMarkup                 | `string`                                 | The HTML markup contained in the bid
SampleImageUrl           | `string`                                 | The sample image URL from the `Campaign`
CreativeId               | `string`                                 | The id of the creative contained in the bid
AdvertiserDomain         | `string`                                 | The advertiser domain from the `Campaign`
CreativeAttributes       | `string`                                 | Creative attributes as defined in OpenRTB
Error                    | `string`                                 | Error code if this bid was invalid
ErrorInfo                | `string`                                 | Information about an invalid bid
Test                     | `string`                                 | Is this a test bid?
AutoClickTrackingEnabled | `boolean`                                | Is auto click tracking enabled for this ad?
LandingPage              | `string`                                 | The landing page as defined in Ad
SupportsClickTracking    | `boolean`                                | Is click tracking implemented for this bid?
BidderType               | `string`                                 | The type of bidder used to generate this bid
CampaignId               | `string`                                 | The id of the Campaign used for this bid
BuyerId                  | `string`                                 | An optional buyer id (of campaigns) to filter against
AdId                     | `string`                                 | The id of the Ad used for this bid
Time                     | [`datetime`](../../Datetime)             | The time when the bid was placed
Price                    | `Price`                                  | The price for the bid

## Format

The response then has the following format:

Property name   | Type                         | Description
--------------- | ---------------------------- | ---------------------------------------------------------
From            | [`datetime`](../../Datetime) | The report start time
To              | [`datetime`](../../Datetime) | The report end time
NrOfBids        | `integer`                    | The total number of bids in the report
TotalBidPrice   | [`Price`](../../Price)       | The total price sum for all bids in the report
HighestBidPrice | [`Price`](../../Price)       | The highest bid price for all bids in the report
LowestBidPrice  | [`Price`](../../Price)       | The lowest bid price for all bids in the report
AverageBidPrice | [`Price`](../../Price)       | The average bid price for all bids in the report
MedianBidPrice  | [`Price`](../../Price)       | The median bid price for all bids in the report
FirstBidAt      | [`datetime`](../../Datetime) | The date and time of the first bid included in the report
LastBidAt       | [`datetime`](../../Datetime) | The date and time of the last bid included in the report
~~BidCount~~    | ~~`integer`~~                | _Obsolete: use_ `NrOfBids` _instead_
