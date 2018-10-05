---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Database/Bid/
---

# `Bid`

```json
{
    "Name": "Mopedo.Database.Bid",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

Every time the DSP bidder places a bid on an available ad slot, that bid is saved in the `Bid` resource.

## Format

Property name            | Type                                        | Description
------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------
Id                       | `string`                                    | A unique ID given to this bid by the DSP
AdMarkup                 | `string`                                    | The HTML markup contained in the bid
SampleImageUrl           | `string`                                    | The sample image URL from Campaign
CreativeId               | `string`                                    | The id of the creative contained in the bid
AdvertiserDomain         | `string`                                    | The advertiser domain from Campaign
CreativeAttributes       | `string`                                    | Creative attributes as defined in OpenRTB
Error                    | `string`                                    | Error code if this bid was invalid
ErrorInfo                | `string`                                    | Information about an invalid bid
AutoClickTrackingEnabled | `boolean`                                   | Is [auto click tracking](../../Mopedo.Bidding/Click%20tracking) enabled for the `Ad`?
LandingPage              | `string`                                    | The [landing page](../../Mopedo.Bidding/Ad#format) as defined in `Ad`
SupportsClickTracking    | `boolean`                                   | Is [click tracking](../../Mopedo.Bidding/Click%20tracking) implemented for this bid?
BidderType               | `string`                                    | The type of bidder used to generate this bid
BidRequest               | [`BidRequest`](../BidRequest)               | The bid request on which this bid was placed
User                     | [`User`](../User)                           | The user associated with this bid
Device                   | [`Device`](../Device)                       | The device associated with this bid
Site                     | [`Site`](../Site)                           | The site associated with this bid
App                      | [`User`](../App)                            | The app associated with this bid
AdId                     | `string`                                    | The id of the `Ad` used for this bid
CampaignId               | `string`                                    | The id of the `Campaign` that generated this bid
Time                     | [`datetime`](../../Datetime)                | The time when the bid was placed
HasWin                   | `boolean`                                   | Did this bid win at its auction?
Categories               | array of `string`                           | The content categories of the `Ad`
BidPrice                 | [`Price`](../../Price)                      | The price for the bid, used in the auction
Win (hidden)             | [`Win`](../Win)                             | The win (if any) that this bid generated
Ad (hidden)              | [`Ad`](../../Mopedo.Bidding/Ad)             | The ad used in the bid
Campaign (hidden)        | [`Campaign`](../../Mopedo.Bidding/Campaign) | The campaign that placed the bid
BidResponse (hidden)     | [`BidResponse`](../BidResponse)             | The bid response that this bid belongs to

> Hidden properties can be included in response bodies by using the [`add`](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI/Meta-conditions#add) meta-condition in the [request URI](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI).

## `Bid.Feed`

```json
{
    "Name": "Mopedo.Database.Bid.Feed",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `Bid.Feed` resource is a terminal resource that posts representations of `Bid` entities in real time as they are placed by the DSP application.

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

Property name            | Type                         | Description
------------------------ | ---------------------------- | -------------------------------------------------------------------------------------
BidRequestId             | `string`                     | The ID of the [bid request](../BidRequest) on which this bid was placed
UserId                   | `string`                     | The UserId of the `User` of the bid request
User                     | [`User`](../User)            | The `User` entity of the bid request
DeviceIP                 | `string`                     | The IP of the `Device` of the bid request
Device                   | [`Device`](../Device)        | The `Device` entity of the bid request
SiteDomain               | `string`                     | The domain of the `Site` of the bid request
Site                     | [`Site`](../Site)            | The `Site` entity of the bid request
AppDomain                | `string`                     | The domain of the `App` of the bid request
App                      | [`App`](../App)              | The `App` entity of the bid request
BidPrice                 | [`Price`](../../Price)       | The price for the bid, used in the auction
AdId                     | `string`                     | The id of the `Ad` used for this bid
CampaignId               | `string`                     | The id of the `Campaign` that generated this bid
ClickLandingPage         | `string`                     | The [landing page](../../Mopedo.Bidding/Ad#format) as defined in `Ad`
Time                     | [`datetime`](../../Datetime) | The time when the bid was placed
AdMarkup                 | `string`                     | The HTML markup contained in the bid
SampleImageUrl           | `string`                     | The sample image URL from Campaign
AdvertiserDomain         | `string`                     | The advertiser domain from Campaign
AutoClickTrackingEnabled | `boolean`                    | Is [auto click tracking](../../Mopedo.Bidding/Click%20tracking) enabled for the `Ad`?
Categories               | array of `string`            | The content categories of the `Ad`
ObjectNo                 | `ulong`                      | The object number of the entity, for fast lookup in the entity resource
