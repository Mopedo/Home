---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Database/Win/
---

# `Win`

```json
{
    "Name": "Mopedo.Database.Win",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `Win` resource gives access to all individual instances where a [bid](../Bid) won an auction at an ad exchange. For an aggregated report of wins and total spending, use the [`WinReport`](../../Mopedo.Reporting/WinReport) resource instead.

## Format

Property name        | Type                            | Description
-------------------- | ------------------------------- | ------------------------------------------------
User                 | [`User`](../User)               | The user associated with this win
Device               | [`Device`](../Device)           | The device associated with this win
Site                 | [`Site`](../Site)               | The site associated with this win
App                  | [`User`](../App)                | The app associated with this win
Time                 | [`datetime`](../../Datetime)    | The date and time when the win was registered
WinPrice             | [`Price`](../../Price)          | The price paid to show the ad
Clicked              | `boolean`                       | Was the ad clicked?
ClickedAt            | [`datetime`](../../Datetime)    | The date and time when the ad was clicked
ClickLandingPage     | `string`                        | The landing page where clicks were forwarded
CampaignId           | `string`                        | The id of the `Campaign` that generated this win
BidRequest (hidden)  | [`BidRequest`](../BidRequest)   | The bid request associated with this win
BidResponse (hidden) | [`BidResponse`](../BidResponse) | The bid response associated with this win
Bid (hidden)         | [`Bid`](../Bid)                 | The bid that generated this win

> Hidden properties can be included in response bodies by using the [`add`](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI/Meta-conditions#add) meta-condition in the [request URI](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI).

## `Win.Feed`

```json
{
    "Name": "Mopedo.Database.Win.Feed",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `Win.Feed` resource is a terminal resource that posts representations of `Win` entities in real time as they are recorded by the DSP application.

### Terminal Properties

Property name   | Type      | Default value | Description
--------------- | --------- | ------------- | -----------------------------------------------------------------
IncludeUser     | `boolean` | `false`       | Should the `User` property be included in entities in the feed?
IncludeDevice   | `boolean` | `false`       | Should the `Device` property be included in entities in the feed?
IncludeSite     | `boolean` | `false`       | Should the `Site` property be included in entities in the feed?
IncludeApp      | `boolean` | `false`       | Should the `App` property be included in entities in the feed?
Status          | `string`  | `"PAUSED"`    | The current status of the console, can be `"PAUSED"` or `"OPEN"`
ShowWelcomeText | `boolean` | `true`        | Should the terminal print a welcome message on launch?

### Entity format

The format of entities that are sent over the feed is different from the format of the entity resource.

Property name    | Type                         | Description
---------------- | ---------------------------- | ---------------------------------------------------------------------------
BidRequestId     | `string`                     | The ID of the [bid request](../BidRequest) on which this win was made
UserId           | `string`                     | The UserId of the `User` of the bid request
User             | [`User`](../User)            | The `User` entity of the bid request
DeviceIP         | `string`                     | The IP of the `Device` of the bid request
Device           | [`Device`](../Device)        | The `Device` entity of the bid request
SiteDomain       | `string`                     | The domain of the `Site` of the bid request
Site             | [`Site`](../Site)            | The `Site` entity of the bid request
AppDomain        | `string`                     | The domain of the `App` of the bid request
App              | [`App`](../App)              | The `App` entity of the bid request
WinPrice         | [`Price`](../../Price)       | The price paid in the winning bid
AdId             | `string`                     | The id of the `Ad` used for the bid
CampaignId       | `string`                     | The id of the `Campaign` that generated the bid
ClickLandingPage | `string`                     | The [landing page](../../Mopedo.Bidding/Ad#format) used, as defined in `Ad`
Time             | [`datetime`](../../Datetime) | The time when the win was recorded
ObjectNo         | `ulong`                      | The object number of the entity, for fast lookup in the entity resource
