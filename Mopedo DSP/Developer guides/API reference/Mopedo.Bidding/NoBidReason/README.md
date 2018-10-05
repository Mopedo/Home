---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/NoBidReason/
---

# `NoBidReason`

```json
{
    "Name": "Mopedo.Bidding.NoBidReason",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

The `NoBidReason` resource, and its child resources - `InvalidBid`, `UnsupportedBanner` and `ClickTrackingNotSupported`, are used to track and give feedback on why some [bid requests](../../Mopedo.Database/BidRequest) are not responded to with bids. Every time the bidder finds some issue while evaluating bid requests, that the advertiser should be made aware of, entities will be created in the above-mentioned resources.

## Format:

Property name | Type                                             | Description
------------- | ------------------------------------------------ | -------------------------------------------------------
BidRequest    | [`BidRequest`](../../Mopedo.Database/BidRequest) | The bid request that was matched by a bid rule
Info          | string                                           | Information about the missed bid opportunity
Time          | [`datetime`](../../Datetime)                     | The time when the missed bid opportunity was registered

## `InvalidBid`

```json
{
    "Name": "Mopedo.Bidding.InvalidBid",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

Entities are created in the `InvalidBid` resource whenever a [bid](../../Mopedo.Database/Bid) generated by a [bid template](../Campaign#bidtemplate) failed validation.

### Format

Excluding the properties inherited from `NoBidReason`.

Property name | Type     | Description
------------- | -------- | ----------------------------------------------
Error         | `string` | The error code describing the validation error

## `UnsupportedBanner`

```json
{
    "Name": "Mopedo.Bidding.UnsupportedBanner",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

The `UnsupportedBanner` resource keeps track of all instances where a [bid request](../../Mopedo.Database/BidRequest) was matched by a [bid rule](../Campaign#bidrule), but there was no [`Ad`](../Ad) of matching dimensions to place in the available ad slot. Finding these instances and calculating the number of missed ad placement opportunities can be useful for optimizing campaigns. To get an aggregated view of unsupported banners, use the [`UnsupportedBannerReport`](../../Mopedo.Reporting/UnsupportedBannerReport) resource.

### Format

Excluding the properties inherited from `NoBidReason`.

Property name | Type      | Description
------------- | --------- | ------------------------------------------------------
Width         | `integer` | The width of the unsupported ad slot
Height        | `integer` | The height of the unsupported ad slot
Dimensions    | `string`  | The dimensions expressed as a string, e.g. `"250x300"`

## `ClickTrackingNotSupported`

```json
{
    "Name": "Mopedo.Bidding.ClickTrackingNotSupported",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

If the [bid request](../../Mopedo.Database/BidRequest) requires bids to contain support for [click tracking](../Click%20tracking), but the matched `Ad` has no click tracking support – a new entity will be created in the `ClickTrackingNotSupported` resource.

### Format

`ClickTrackingNotSupported` has the same format as the parent resource `NoBidReason`.