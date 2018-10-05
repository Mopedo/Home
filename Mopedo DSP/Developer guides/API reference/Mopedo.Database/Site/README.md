---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Database/Site/
---

# `Site`

```json
{
    "Name": "Mopedo.Database.Site",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

`Site` entities are added when the DSP receives [bid requests](../BidRequest) for impressions on web sites, for example a media site with banner ad slots.

## Format

_Properties marked in **bold** are required._

Property name      | Type                                                     | Description
------------------ | -------------------------------------------------------- | ---------------------------------------------------------------------
**Domain**         | `string`                                                 | The domain of the site (e.g., `"nytimes.com"`)Id                      | `string` | Exchange-specific site ID
Name               | `string`                                                 | The name of the site
Categories         | `string`                                                 | A comma-separated list of standard IAB codes for the site
Page               | `string`                                                 | The URL of the page where the impression will be shown
Referrer           | `string`                                                 | The referrer URL that caused navigation to the current page
MobileOptimized    | `boolean`                                                | Does the site have a special layout for mobile devices?
Extension          | [`SiteExtension`](../../Mopedo.ClientData/SiteExtension) | Additional client-defined data associated with the `Site`
Publisher          | [`Publisher`](../Publisher)                              | The publisher of the site
CreatedAt          | [`datetime`](../../Datetime)                             | See [`CreatedAt`](../Common%20properties#createdat)
UsedAt             | [`datetime`](../../Datetime)                             | See [`UsedAt`](../Common%20properties#usedat)
Matched            | `bool`                                                   | See [`Matched`](../Common%20properties#matched)
MatchedAt          | [`datetime`](../../Datetime)                             | See [`MatchedAt`](../Common%20properties#matchedat)
UsedCount          | `integer`                                                | See [`UsedCount`](../Common%20properties#usedcount)
UsedRank           | `integer`                                                | See [`UsedRank`](../Common%20properties#usedrank)
AdWinCount         | `integer`                                                | See [`AdWinCount`](../Common%20properties#adwincount)
AdClickCount       | `integer`                                                | See [`AdClickCount`](../Common%20properties#adclickcount)
CampaignWinCount   | `integer`                                                | See [`CampaignWinCount`](../Common%20properties#campaignwincount)
CampaignClickCount | `integer`                                                | See [`CampaignClickCount`](../Common%20properties#campaignclickcount)
~~WinCount~~       | ~~`integer`~~                                            | Obsolete: Use AdWinCount instead
~~ClickCount~~     | ~~`integer`~~                                            | Obsolete: Use AdWinCount instead

## `Site.Feed`

```json
{
    "Name": "Mopedo.Database.Site.Feed",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `Site.Feed` resource is a terminal resource that posts representations of `Site` entities in real time as they are added to the DSP application.

### Terminal properties

Property name    | Type      | Default value | Description
---------------- | --------- | ------------- | --------------------------------------------------------------------
IncludeExtension | `boolean` | `false`       | Should the `Extension` property be included in entities in the feed?
Status           | `string`  | `"PAUSED"`    | The current status of the console, can be `"PAUSED"` or `"OPEN"`
ShowWelcomeText  | `boolean` | `true`        | Should the terminal print a welcome message on launch?

### Entity format

The format of entities that are sent over the feed is different from the format of the entity resource.

Property name | Type                                                    | Description
------------- | ------------------------------------------------------- | ---------------------------------------------------------
Domain        | `string`                                                | The domain of the site (e.g., `"nytimes.com"`)
CreatedAt     | [`datetime`](../../Datetime)                            | See [`CreatedAt`](../Common%20properties#createdat)
Matched       | `bool`                                                  | See [`Matched`](../Common%20properties#matched)
Extension     | [`AppExtension`](../../Mopedo.ClientData/SiteExtension) | Additional client-defined data associated with the `Site`
