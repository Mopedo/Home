---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Reporting/WinReport/
---

# `WinReport`

```json
{
    "Name": "Mopedo.Reporting.WinReport",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

`WinReport` is a [short-term reporting resource](../Reporting%20overview#short-term-reports) that finds all wins with certain properties, and creates an aggregated report for them, including the number of wins, total price paid and more.

By providing conditions that describe the properties of the wins we want to match against, we can, for example, get all winning bids that resulted in an ad showing on a certain website, for a certain user or on a certain device.

## Report parameters

The following properties can be used in [request URIs](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI) to specify the report parameters:

Property name    | Type                                     | Description
---------------- | ---------------------------------------- | -----------------------------------------------------
User             | [`User`](../../Mopedo.Database/User)     | The user associated with this win
Device           | [`Device`](../../Mopedo.Database/Device) | The device associated with this win
Site             | [`Site`](../../Mopedo.Database/Site)     | The site associated with this win
App              | [`User`](../../Mopedo.Database/App)      | The app associated with this win
WinningBid       | [`Bid`](../../Mopedo.Database/Bid)       | The bid associated with this win
Time             | [`datetime`](../../Datetime)             | The date and time when the win was registered
WinPrice         | [`Price`](../../Price)                   | The price paid to show the ad
Clicked          | `Boolean`                                | Was the ad clicked?
ClickedAt        | [`datetime`](../../Datetime)             | The date and time when the ad was clicked
ClickLandingPage | `string`                                 | The LandingPage of the winning bid
CampaignId       | `string`                                 | The id of the Campaign that generated this win
BuyerId          | `string`                                 | An optional buyer id (of campaigns) to filter against
AdId             | `string`                                 | The id of the Ad that generated this win
Time             | [`datetime`](../../Datetime)             | The time when the bid was placed

## Format

The response then has the following format:

Property name         | Type                         | Description
--------------------- | ---------------------------- | ---------------------------------------------------------
From                  | [`datetime`](../../Datetime) | The report start time
To                    | [`datetime`](../../Datetime) | The report end time
NumberOfWins          | `integer`                    | The total number of winning bids in the report
NumberOfClicks        | `integer`                    | The total number of clicks for the selected wins
TotalWinPrice         | `Price`                      | The total price sum for all winning bids in the report
HighestWinPrice       | `Price`                      | The highest win price for all wins in the report
LowestWinPrice        | `Price`                      | The lowest win price for all wins in the report
AverageWinPrice       | `Price`                      | The average win price for all wins in the report
MedianWinPrice        | `Price`                      | The median win price for all wins in the report
UniqueIdentifiedUsers | `integer`                    | The total number of unique users for the wins
FirstWinAt            | [`datetime`](../../Datetime) | The date and time of the first win included in the report
LastWinAt             | [`datetime`](../../Datetime) | The date and time of the last win included in the report
~~WinCount~~          | ~~`integer`~~                | _Obsolete: use_ `NumberOfWins` _instead_
~~TotalNrOfClicks~~   | ~~`integer`~~                | _Obsolete: use_ `NumberOfClicks` _instead_

## Examples

**1\. Make a win report for a certain user segment**

Let's get a win report for all wins where the `User` that the ad was shown to (same as the `User` of the [bid request](../../Mopedo.Database/BidRequest) on which the winning bid was placed) had a `UserExtension` object with a `Group` property set to `"Group1"`. This type of win report is useful if we want to summarize the spendings for a given user segment.

```
GET https://my-dsp.com:8282/rest/winreport/user.extension.group=Group01
Headers: 'Authorization: apikey mykey'
```

**2\. Make a win report for the trading on a certain site**

```
GET https://my-dsp.com:8282/rest/winreport/site.domain=dn.se
Headers: 'Authorization: apikey mykey'
```

**3\. Make a win report for all trading in February of 2018**

```
GET https://my-dsp.com:8282/rest/winreport/time>2018-02-01&time<2018-03-01
Headers: "Authorization: apikey mykey"
```

### Example response

```json
[{
    "From": "2018-02-01T00:00:00Z",
    "To": "2018-02-20T00:00:00Z",
    "NrOfWins": 1373,
    "NrOfClicks": 31,
    "TotalWinPrice": {
        "Amount": 35.286539,
        "Currency": "USD",
        "CPM": false
    },
    "HighestWinPrice": {
        "Amount": 89.404000,
        "Currency": "USD",
        "CPM": true
    },
    "LowestWinPrice": {
        "Amount": 0.085000,
        "Currency": "USD",
        "CPM": true
    },
    "AverageWinPrice": {
        "Amount": 25.70032,
        "Currency": "USD",
        "CPM": true
    },
    "MedianWinPrice": {
        "Amount": 25.577,
        "Currency": "USD",
        "CPM": true
    },
    "UniqueIdentifiedUsers": 40,
    "FirstWinAt": "2018-02-01T15:31:40.9558099Z",
    "LastWinAt": "2018-02-19T23:07:38.3281232Z",
    "WinCount": 1373,
    "TotalNrOfClicks": 31,
}]
```
