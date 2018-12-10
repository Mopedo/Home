---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Reporting/UnsupportedBannerReport/
---

# `UnsupportedBannerReport`

```json
{
    "Name": "Mopedo.Reporting.UnsupportedBannerReport",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

Use the `UnsupportedBannerReport` resource to create an aggregated view over all the instances where a [bid template](../../Mopedo.Bidding/Campaign#bidtemplate) was matched for a [bid request](../../Mopedo.Database/BidRequest), but did not contain any [`Ad`](../../Mopedo.Bidding/Ad) of proper dimensions. Keeping track of this resource and identifying missing banner dimensions can give you great insight on how to improve your campaigns. The following properties can be used to specify the report parameters:

Property name | Type                         | Description
------------- | ---------------------------- | --------------------------------------------------------------
Domain        | `string`                     | The domain on which the banner ad slot was placed
Info          | `string`                     | Information about the missed bid opportunity
Time          | [`datetime`](../../Datetime) | The time when the missed bid opportunity was registered
Width         | `integer`                    | The width of the unsupported ad slot
Height        | `integer`                    | The height of the unsupported ad slot
Dimensions    | `string`                     | The dimensions expressed as a string, e.g. `"250x300"`
CampaignId    | `string`                     | An optional campaign id to filter against
BuyerId       | `string`                     | An optional buyer id (of campaigns) to filter against
AdId          | `string`                     | An optional [Ad](../../Mopedo.Bidding/Ad) id to filter against

The response contains a list of missing banner dimensions, with the following format:

Property name  | Type                         | Description
-------------- | ---------------------------- | ---------------------------------------------------------
Width          | `integer`                    | The width of the missing banner
Height         | `integer`                    | The height of the missing banner
Count          | `integer`                    | The total number of requests for this banner dimensions
TimeOfEarliest | [`datetime`](../../Datetime) | The time of the first request for this banner dimensions
TimeOfLatest   | [`datetime`](../../Datetime) | The time of the latest request for this banner dimensions
Domains        | array of `string`            | The domains that have requested this banner dimension

## Example

To get the most often requested unsupported banner dimensions:

```
GET https://my-dsp.com:8282/rest/unsupportedbannerreport//order_desc=count&limit=3
Headers: "Authorization: apikey mykey"
Response body:
[
    {
        "Width": 300,
        "Height": 600,
        "Count": 436,
        "TimeOfEarliest": "2017-04-24T13:18:54.4904369Z",
        "TimeOfLatest": "2017-11-10T01:56:21.2845993Z",
        "Domains": [
            "N/A",
            "familjeliv.se",
            "accuweather.com"
        ]
    },
    {
        "Width": 250,
        "Height": 360,
        "Count": 216,
        "TimeOfEarliest": "2017-05-01T23:04:48.4041727Z",
        "TimeOfLatest": "2017-11-28T01:21:41.5974059Z",
        "Domains": [
            "N/A",
            "bonnieradnetwork.se",
            "familjeliv.se",
            "helahalsingland.se",
            "stockholmdirekt.se",
            "allehanda.se",
            "expressen.se"
        ]
    },
    {
        "Width": 480,
        "Height": 280,
        "Count": 208,
        "TimeOfEarliest": "2017-05-01T20:09:52.2500081Z",
        "TimeOfLatest": "2018-01-29T23:07:34.813496Z",
        "Domains": [
            "N/A",
            "dn.se",
            "bonnieradnetwork.se",
            "di.se",
            "expressen.se"
        ]
    }
]
```
