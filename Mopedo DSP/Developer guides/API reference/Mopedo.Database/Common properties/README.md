---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Database/Common%20properties/
---

# Common members

Database resources share a set of common members:

## `CreatedAt`

`CreatedAt` is a [datetime](../../Datetime) defining the date and time when the database resource entity was created.

## `UsedAt`

`UsedAt` is a [datetime](../../Datetime) defining the date and time when the database resource entity was last included in a [bid request](../BidRequest).

## `Matched`

`Matched` is true for a database resource entity if and only if it has been associated with some client data, for example during [user matching](../../../../Feature%20guides/User%20matching). All database resource entities can be assigned client data by setting their respective `Extension` properties.

## `MatchedAt`

`MatchedAt` is a [datetime](../../Datetime) defining the date and time when the `Matched` property was last changed to `true`.

## `UsedCount`

All database resource entities have a `UsedCount` property – an integer that is incremented each time the database resource entity is contained in a [bid request](../BidRequest).

## `UsedRank`

`UsedRank` is a relative ranking of entities' `UsedCount` properties. Entities with higher values for `UsedCount` will have a higher `UsedRank` (lower number). That way you can keep track of the database resource entities that is most frequently used, and easier target them with [bid rules](../../Mopedo.Bidding/Campaign#bidrule).

## `AdWinCount`

The `AdWinCount` method is used to calculate the number of times a certain [`Ad`](../../Mopedo.Bidding/Ad) has been used to generate a [winning bid](../Win) on a given database resource entity. `AdWinCount` is available for all database resources. The method takes an ad ID as argument, and is useful when setting up [bid rules](../../Mopedo.Bidding/Campaign#bidrule), so that the same ad is only showed a definite number of times for a certain user, for example. It can only be used when defining bid rule [conditions](../../Mopedo.Bidding/Campaign#condition). To print equivalent data using the REST API, use the [WinReport](../../Mopedo.Reporting/WinReport) resource instead.

### Example

```json
{
    "Key": "User.AdWinCount(ad001)",
    "Operator": "LESS THAN OR EQUALS",
    "Value": 10
}
```

Adding the [condition](../../Mopedo.Bidding/Campaign#condition) above to a bid rule will make it exclude all bid requests containing users that have had the ad `ad001` shown 10 times or more. Formally, the condition above is true and only true for all users `U` such that the `Ad` with ID `"ad001"` was used at most 10 times in winning bids on bid requests where `U` was the `User`.

## `AdClickCount`

The `AdClickCount` method is used to get the number of times a certain ad has been clicked, for a given database resource entity. `ClickCount` is available for all database resources, but for it to work, [`Ad`](../../Mopedo.Bidding/Ad) entities need to be set up to use [automatic click tracking](../../Mopedo.Bidding/Click%20tracking). The method takes an ad ID as argument, and is useful when setting up bid rules that trigger a change in behavior based on the number of time an ad is clicked. To print equivalent data using the REST API, use the [`WinReport`](../../Mopedo.Reporting/WinReport) resource instead.

### Example

```json
{
    "Key": "Site.AdClickCount(ad002)",
    "Operator": "GREATER THAN ",
    "Value": 1000
}
```

Adding the [condition](../../Mopedo.Bidding/Campaign#condition) above to a bid rule will make it exclude all bid requests containing a site on which the ad `ad001` has been clicked less than 1001 times. Formally, the condition above is true and only true of sites `S` such that the `Ad` with `Id` `"ad002"` has been clicked at least 1000 times on `S`.

## `CampaignWinCount`

The `CampaignWinCount` property is used to get the number of times the current campaign has been used to generate a [`Win`](../Win) for a given database entity. `CampaignWinCount` is available for all database resources. It's useful in bid rules that should limit the number of purchased impressions for, for example, a given [`User`](../User).

### Example

```json
{
    "Key": "User.CampaignWinCount",
    "Operator": "LESS THAN ",
    "Value": 10
}
```

The above condition will only be true of bid requests containing users that the current campaign has purchased at most 9 ad impressions for.

## `CampaignClickCount`

The `CampaignClickCount` property is used to get the number of times the current campaign has been used to generate a [`Win`](../Win) for a given database entity, that was also clicked. `CampaignClickCount` is available for all database resources. It's useful in bid rules that should limit the number of purchased impressions for, for example, a given [`User`](../User), based on the number of clicks registered.

### Example

```json
{
    "Key": "User.CampaignClickCount",
    "Operator": "LESS THAN ",
    "Value": 10
}
```

The above condition will only be true of bid requests containing users that the current campaign has purchased at most 9 clicked ad impressions for.
