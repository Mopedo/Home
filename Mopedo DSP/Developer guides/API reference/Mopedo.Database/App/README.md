---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Database/App/
---

# `App`

```json
{
    "Name": "Mopedo.Database.App",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

App entities are added whenever the DSP receives [bid requests](../BidRequest) for impressions inside mobile applications.

## Format:

_Properties marked in **bold** are required._

Property name      | Type                                                   | Description
------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------
**Domain**         | `string`                                               | The domain of the app (e.g., `"mygame.foo.com"`)
Id                 | `string`                                               | The exchange-specific app ID
Name               | `string`                                               | The name of the app
Categories         | `string`                                               | Comma-separated list of standard IAB codes for the app
Bundle             | `string`                                               | A platform-specific application identifier
Paid               | `boolean`                                              | Is this a paid app?
StoreUrl           | `string`                                               | App store URL for an installed app
Version            | `string`                                               | App version
Extension          | [`AppExtension`](../../Mopedo.ClientData/AppExtension) | Additional client-defined data associated with the `App`
Publisher          | [`Publisher`](../Publisher)                            | The publisher of the app
CreatedAt          | [`datetime`](../../Datetime)                           | See [`CreatedAt`](../Common%20properties#createdat)
UsedAt             | [`datetime`](../../Datetime)                           | See [`UsedAt`](../Common%20properties#usedat)
Matched            | `bool`                                                 | See [`Matched`](../Common%20properties#matched)
MatchedAt          | [`datetime`](../../Datetime)                           | See [`MatchedAt`](../Common%20properties#matchedat)
UsedCount          | `integer`                                              | See [`UsedCount`](../Common%20properties#usedcount)
UsedRank           | `integer`                                              | See [`UsedRank`](../Common%20properties#usedrank)
AdWinCount         | `integer`                                              | See [`AdWinCount`](../Common%20properties#adwincount)
AdClickCount       | `integer`                                              | See [`AdClickCount`](../Common%20properties#adclickcount)
CampaignWinCount   | `integer`                                              | See [`CampaignWinCount`](../Common%20properties#campaignwincount)
CampaignClickCount | `integer`                                              | See [`CampaignClickCount`](../Common%20properties#campaignclickcount)
~~WinCount~~       | ~~`integer`~~                                          | Obsolete: Use `AdWinCount` instead
~~ClickCount~~     | ~~`integer`~~                                          | Obsolete: Use `AdWinCount` instead

## `App.Feed`

```json
{
    "Name": "Mopedo.Database.App.Feed",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `App.Feed` resource is a terminal resource that posts representations of `App` entities in real time as they are added to the DSP application.

### Terminal properties

Property name    | Type      | Default value | Description
---------------- | --------- | ------------- | --------------------------------------------------------------------
IncludeExtension | `boolean` | `false`       | Should the `Extension` property be included in entities in the feed?
Status           | `string`  | `"PAUSED"`    | The current status of the console, can be `"PAUSED"` or `"OPEN"`
ShowWelcomeText  | `boolean` | `true`        | Should the terminal print a welcome message on launch?

### Entity format

The format of entities that are sent over the feed is different from the format of the entity resource.

Property name | Type                                                   | Description
------------- | ------------------------------------------------------ | --------------------------------------------------------
Domain        | `string`                                               | The domain of the app (e.g., `"mygame.foo.com"`)
CreatedAt     | [`datetime`](../../Datetime)                           | See [`CreatedAt`](../Common%20properties#createdat)
Matched       | `bool`                                                 | See [`Matched`](../Common%20properties#matched)
Extension     | [`AppExtension`](../../Mopedo.ClientData/AppExtension) | Additional client-defined data associated with the `App`
