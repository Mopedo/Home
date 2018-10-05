---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Database/ClickFeed/
---

# `ClickFeed`

```json
{
    "Name": "Mopedo.Database.ClickFeed",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `ClickFeed` resource is a terminal resource that posts entities that represent clicked ads, in real time as clicks are recorded by the DSP application.

## Terminal properties

Property name   | Type      | Default value | Description
--------------- | --------- | ------------- | -----------------------------------------------------------------
IncludeUser     | `boolean` | `false`       | Should the `User` property be included in entities in the feed?
IncludeDevice   | `boolean` | `false`       | Should the `Device` property be included in entities in the feed?
IncludeSite     | `boolean` | `false`       | Should the `Site` property be included in entities in the feed?
IncludeApp      | `boolean` | `false`       | Should the `App` property be included in entities in the feed?
Status          | `string`  | `"PAUSED"`    | The current status of the console, can be `"PAUSED"` or `"OPEN"`
ShowWelcomeText | `boolean` | `true`        | Should the terminal print a welcome message on launch?

## Entity format

The following format is used for entities in the feed:

Property name | Type                         | Description
------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------
BidRequestId  | `string`                     | The ID of the bid request of this bid response
UserId        | `string`                     | The UserId of the `User` of the bid request
User          | [`User`](../User)            | The `User` entity of the bid request
DeviceIP      | `string`                     | The IP of the `Device` of the bid request
Device        | [`Device`](../Device)        | The `Device` entity of the bid request
SiteDomain    | `string`                     | The domain of the `Site` of the bid request
Site          | [`Site`](../Site)            | The `Site` entity of the bid request
AppDomain     | `string`                     | The domain of the `App` of the bid request
App           | [`App`](../App)              | The `App` entity of the bid request
LandingPage   | `string`                     | The landing page of this click
Time          | [`datetime`](../../Datetime) | The date and time when the click was recorded
WinObjectNo   | `ulong`                      | The object number of the [`Win`](../Win) entity belonging to this click, for fast lookup in the `Mopedo.Database.Win` entity resource
