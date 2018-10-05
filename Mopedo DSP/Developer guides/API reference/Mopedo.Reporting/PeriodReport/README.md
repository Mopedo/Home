---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Reporting/PeriodReport/
---

# `PeriodReport`

```json
{
    "Name": "Mopedo.Reporting.PeriodReport",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

`PeriodReport` is a [short-term reporting resource](../Reporting%20overview#short-term-reports) that enables flexible aggregated spending reports, grouped by some given time period. Say, for example, that we want to get the daily spending for some campaign's spending during the last 60 days. This could be done with 60 separate requests to the `DailySpendingReport` resource – but with the `PeriodReport` resource we can do it with just one. The following properties can be used to specify the report parameters:

## Report parameters

The following properties can be used in [request URIs](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI) to specify the report parameters:

_Properties marked in **bold** are required_

Property name | Type                         | Description
------------- | ---------------------------- | ----------------------------------------------------------------
**Period**    | `enum`                       | The period to group reports by. Can be: `Day`, `Month` or `Year`
From          | [`datetime`](../../Datetime) | The time of the earliest period report contained in the response
To            | [`datetime`](../../Datetime) | The time of the latest period report contained in the response
CampaignId    | `string`                     | An optional campaign id to filter against
BuyerId       | `string`                     | An optional buyer id (of campaigns) to filter against
AdId          | `string`                     | An optional buyer id to filter against

## Format

The response is a list of reports with the following format:

Property name | Type                         | Description
------------- | ---------------------------- | -------------------------------------------------------------
`Period`      | [`datetime`](../../Datetime) | Name is e.g. `Day`. Value is a datetime describing the period
Campaigns     | `array of strings`           | The IDs of all campaigns contributing to the report
NrOfBids      | `integer`                    | The number of bids generated during the period
NrOfWins      | `integer`                    | The number of wins generated during the period
NrOfClicks    | `integer`                    | The number of clicks generated during the period
WinRate       | `float`                      | The number of wins divided by the number of bids
ClickRate     | `float`                      | The number of clicks divided by the number of wins
TotalBidPrice | [`Price`](../../Price)       | The total amount bidded for during the period
TotalWinPrice | [`Price`](../../Price)       | The total amount spent during the period

## Example

To get montly reports for October and November of 2017 using `PeriodReport`, we make this GET request to the REST API:

```
GET https://my-dsp.com:8282/rest/periodreport/period=month&from=2017-10-01&to=2017-12-01
Headers: "Authorization: apikey mykey"
Response body:
[
    {
        "Month": "2017-10-01T00:00:00Z",
        "Campaigns": [
            "MyCampaign1"
        ],
        "NrOfBids": 51276,
        "NrOfWins": 11258,
        "NrOfClicks": 1211,
        "WinRate": 0.2196,
        "ClickRate": 0.1076,
        "TotalBidPrice": {
            "Amount": 2563.040000,
            "Currency": "USD",
            "CPM": false
        },
        "TotalWinPrice": {
            "Amount": 292.708000,
            "Currency": "USD",
            "CPM": false
        }
    },
    {
        "Month": "2017-11-01T00:00:00Z",
        "Campaigns": [
            "MyCampaign1"
        ],
        "NrOfBids": 801,
        "NrOfWins": 46,
        "NrOfClicks": 5,
        "WinRate": 0.0574,
        "ClickRate": 0.1087,
        "TotalBidPrice": {
            "Amount": 32.040000,
            "Currency": "USD",
            "CPM": false
        },
        "TotalWinPrice": {
            "Amount": 1.316423,
            "Currency": "USD",
            "CPM": false
        }
    }
]
```
