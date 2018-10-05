---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Database/User/
---

# `User`

```json
{
    "Name": "Mopedo.Database.User",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

A `User` entity represents a person, in the form of a [matched](../../../../Feature%20guides/User%20matching) or unmatched web browser. Users are created in the DSP whenever a new user id is introduced via a [bid request](../BidRequest) or when [user matching](../../../../Feature%20guides/User%20matching).

Whenever a [`UserExtension`](../../Mopedo.ClientData/UserExtension) entity is created containing a `UserId` property with the same value as an existing `User`'s `UserId`, the `UserExtension` entity will be assigned to the `Extension` property of that `User`.

Users can be matched by means of [user matching](../../../../Feature%20guides/User%20matching).

## Format

_Properties marked in **bold** are required._

Property name      | Type                                                     | Description
------------------ | -------------------------------------------------------- | ---------------------------------------------------------------------
**UserId**         | `string`                                                 | Mopedo-assigned unique user id
Extension          | [`UserExtension`](../../Mopedo.ClientData/UserExtension) | Additional client-defined data associated with the `User`
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

## `User.Feed`

```json
{
    "Name": "Mopedo.Database.User.Feed",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `User.Feed` resource is a terminal resource that posts representations of `User` entities in real time as they are added to the DSP application.

### Terminal properties

Property name    | Type      | Default value | Description
---------------- | --------- | ------------- | --------------------------------------------------------------------
IncludeExtension | `boolean` | `false`       | Should the `Extension` property be included in entities in the feed?
Status           | `string`  | `"PAUSED"`    | The current status of the console, can be `"PAUSED"` or `"OPEN"`
ShowWelcomeText  | `boolean` | `true`        | Should the terminal print a welcome message on launch?

### Entity format

The format of entities that are sent over the feed is different from the format of the entity resource.

Property name | Type                                                     | Description
------------- | -------------------------------------------------------- | ---------------------------------------------------------
UserId        | `string`                                                 | Mopedo-assigned unique user id
CreatedAt     | [`datetime`](../../Datetime)                             | See [`CreatedAt`](../Common%20properties#createdat)
Matched       | `bool`                                                   | See [`Matched`](../Common%20properties#matched)
Extension     | [`UserExtension`](../../Mopedo.ClientData/UserExtension) | Additional client-defined data associated with the `User`
