---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Database/Device/
---

# `Device`

```json
{
    "Name": "Mopedo.Database.Device",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

`Device` represents a device, for example a mobile phone or a computer. `Device` entities are created automatically in the DSP whenever a new device IP address is introduced via a [bid request](../BidRequest).

It is rare that the SSPs assign values to all the properties of `Device` entities, and – as with all database resources – `Device` entities will only contain whatever the Mopedo backend receives from the SSP.

Whenever a [`DeviceExtension`](../../Mopedo.ClientData/DeviceExtension) entity is created containing an `IP` property with the same value as an existing `Device`'s `IP`, the `DeviceExtension` entity will be assigned to the `Extension` property of that `Device`.

## Format

_Properties marked in **bold** are required._

Property name          | Type                                                         | Description
---------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------
**IP**                 | `string`                                                     | The IPv4 address associated with this device
BrowserUserAgent       | `string`                                                     | User agent, provided by the browser
Geo                    | [`Geo`](#geo)                                                | Geo-location for the device
DoNotTrack             | `boolean`                                                    | Is "do not track" activated in the device's browser?
Ifa                    | `string`                                                     | The ifa/idfa associated with this device
DeviceType             | `integer`                                                    | Device type as defined by OpenRTB
Make                   | `string`                                                     | Device manufacturer, e.g. `"Apple"`
Model                  | `string`                                                     | Device model, e.g. `"iPhone"`
OperatingSystem        | `string`                                                     | Device operating system, e.g. `"iOS"`
OperatingSystemVersion | `string`                                                     | Device OS version, e.g. `"3.1.2"`
JavaScriptSupported    | `integer`                                                    | Does the device support JavaScript?
FlashVersionSupported  | `string`                                                     | Flash version support, e.g. `"10.2"`
Language               | `string`                                                     | Browser language (ISO 639-1), e.g. `"en"`
Carrier                | `string`                                                     | ISP derived from IP address
ConnectionType         | `integer`                                                    | Connection type as defined by OpenRTB
SHA1HashedDeviceId     | `string`                                                     | Hardware device ID (e.g., IMEI) hashed via SHA1
MD5HashedDeviceId      | `string`                                                     | Hardware device ID (e.g., IMEI) hashed via MD5
SHA1HashedPlatformId   | `string`                                                     | Platform device ID (e.g., Android ID), SHA1
MD5HashedPlatformId    | `string`                                                     | Platform device ID (e.g., Android ID), MD5
Extension              | [`DeviceExtension`](../../Mopedo.ClientData/DeviceExtension) | Additional client-defined data for `Device`
CreatedAt              | [`datetime`](../../Datetime)                                 | See [`CreatedAt`](../Common%20properties#createdat)
UsedAt                 | [`datetime`](../../Datetime)                                 | See [`UsedAt`](../Common%20properties#usedat)
Matched                | `bool`                                                       | See [`Matched`](../Common%20properties#matched)
MatchedAt              | [`datetime`](../../Datetime)                                 | See [`MatchedAt`](../Common%20properties#matchedat)
UsedCount              | `integer`                                                    | See [`UsedCount`](../Common%20properties#usedcount)
UsedRank               | `integer`                                                    | See [`UsedRank`](../Common%20properties#usedrank)
AdWinCount             | `integer`                                                    | See [`AdWinCount`](../Common%20properties#adwincount)
AdClickCount           | `integer`                                                    | See [`AdClickCount`](../Common%20properties#adclickcount)
CampaignWinCount       | `integer`                                                    | See [`CampaignWinCount`](../Common%20properties#campaignwincount)
CampaignClickCount     | `integer`                                                    | See [`CampaignClickCount`](../Common%20properties#campaignclickcount)
~~WinCount~~           | ~~`integer`~~                                                | Obsolete: Use AdWinCount instead
~~ClickCount~~         | ~~`integer`~~                                                | Obsolete: Use AdWinCount instead

## `Geo`

Geo entities contain the geo-data belonging to a `Device`.

### Format

_Properties marked in **bold** are required._

Property name | Type                         | Description
------------- | ---------------------------- | ------------------------------------------------------------------
Longitude     | `float`                      | The longitude of the geo location. -180 to +180, negative is west.
Latitude      | `float`                      | The latitude of the geo location. -90 to +90, negative is south.
GeoType       | `integer`                    | `1` = GPS, `2` = IP Address, `3` = user provided
Country       | `string`                     | Country code using ISO-3166-1-alpha-2, for example `"SE"`.
Region        | `string`                     | A region name corresponding to this geo (often empty)
City          | `string`                     | A city name corresponding to this geo (often empty)
UpdatedAt     | [`datetime`](../../Datetime) | The date and time when this `Geo` was last updated

## `Device.Feed`

```json
{
    "Name": "Mopedo.Database.Device.Feed",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `Device.Feed` resource is a terminal resource that posts representations of `Device` entities in real time as they are added to the DSP application.

### Terminal properties

Property name    | Type      | Default value | Description
---------------- | --------- | ------------- | --------------------------------------------------------------------
IncludeExtension | `boolean` | `false`       | Should the `Extension` property be included in entities in the feed?
IncludeGeo       | `boolean` | `false`       | Should the `Geo` property be included in entities in the feed?
Status           | `string`  | `"PAUSED"`    | The current status of the console, can be `"PAUSED"` or `"OPEN"`
ShowWelcomeText  | `boolean` | `true`        | Should the terminal print a welcome message on launch?

### Entity format

The format of entities that are sent over the feed is different from the format of the entity resource.

Property name | Type                                                         | Description
------------- | ------------------------------------------------------------ | -----------------------------------------------------------
IP            | `string`                                                     | The IPv4 address associated with this device
CreatedAt     | [`datetime`](../../Datetime)                                 | See [`CreatedAt`](../Common%20properties#createdat)
Matched       | `bool`                                                       | See [`Matched`](../Common%20properties#matched)
Extension     | [`DeviceExtension`](../../Mopedo.ClientData/DeviceExtension) | Additional client-defined data associated with the `Device`
Geo           | [`Geo`](#geo)                                                | Geo-location for the device
