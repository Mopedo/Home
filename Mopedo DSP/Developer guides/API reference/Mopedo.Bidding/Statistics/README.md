---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/Statistics/
---

# `Statistics`

`Statistics` is an object that is present as property value in multiple bidding resources. It encodes bidding statistics, most commonly used to describe [campaign](../Campaign) performance during some time period.

## Format

Property name   | Type                   | Description
--------------- | ---------------------- | ----------------------------------------------------------------------
NrOfBids        | `integer`              | The number of [bids](../../Mopedo.Database/Bid) encoded in this object
NrOfWins        | `integer`              | The number of [wins](../../Mopedo.Database/Win) encoded in this object
NrOfClicks      | `integer`              | The number of [clicks](../Click%20tracking) encoded in this object
WinRate         | `float`                | `NrOfWins` divided by `NrOfBids` (or `0` if there are no bids)
ClickRate       | `float`                | `NrOfClicks` divided by `NrOfWins` (or `0` if there are no wins)
AverageBidPrice | [`Price`](../../Price) | The average bid price
TotalWinPrice   | [`Price`](../../Price) | The total win price
AverageWinPrice | [`Price`](../../Price) | The average win price

## Example

Statistics are used in the `Total` property of [`CampaignSpendingSnapshot`](../CampaignSpendingSnapshot) entities to encode the total spending information for a given period.

```json
{
  "CampaignId": "c02",
  "BuyerId": null,
  "Period": "_14d",
  "From": "2017-04-24T00:00:00.0000000Z",
  "To": "2017-05-08T00:00:00.0000000Z",
  "Total": {
    "NrOfBids": 371,
    "NrOfWins": 29,
    "NrOfClicks": 13,
    "WinRate": 0.0782,
    "ClickRate": 0.4483,
    "AverageBidPrice": {
      "Amount": 40.0,
      "Currency": "USD",
      "CPM": true
    },
    "TotalWinPrice": {
      "Amount": 0.782678,
      "Currency": "USD",
      "CPM": false
    },
    "AverageWinPrice": {
      "Amount": 26.988897,
      "Currency": "USD",
      "CPM": true
    }
  },
  "IsZero": false,
  "AdSpendingSnapshots": { ... },
  "ObjectNo": 75187846
}
```
