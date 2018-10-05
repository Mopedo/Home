---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Settings/
---

# `Settings`

```json
{
    "Name": "Mopedo.Settings",
    "Kind": "EntityResource",
    "Methods": ["GET", "PATCH", "REPORT", "HEAD"]
}
```

The `Settings` resource contains all settings currently used by the DSP. These are read from the [configuration file](../../../Administration%20guides/Configuration%20guide) on start-up.

## Format

Property name                 | Type                  | Description
----------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------
SeatId                        | `string` (read-only)  | The seat id used by the DSP. Provided by Mopedo
Email                         | `string` (read-only)  | The email address registered for this DSP
RESTPort                      | `integer` (read-only) | The port where the REST API is registered
RESTUri                       | `string` (read-only)  | The root uri for the REST API
RequireApiKey                 | `boolean` (read-only) | Are API keys required in the REST API?
AllowAllOrigins               | `boolean` (read-only) | Are all CORS origins allowed to make requests to the REST API?
BidRequestIP                  | `string` (read-only)  | The IP address on which this DSP receives bid requests
LocalOnly                     | `boolean` (read-only) | Is this DSP in local only mode?
ApplicationVersion            | `string` (read-only)  | The DSP application version
BidRequestFilter              | `string`              | The current [bid request filter](../../../Feature%20guides/Bid%20request%20filtering)
RoutineUpdateIntervalMinutes  | `integer` (read-only) | The minutes between [routine](../Mopedo.Archive/Routines#routine) runs. Default is `360`
SpendingSnapshotStoragePeriod | `string` (read-only)  | The period setting for storage of [campaign spending snapshots](../Mopedo.Bidding/CampaignSpendingSnapshot). Default is `"Medium"`
DomainName                    | `string` (read-only)  | The domain name of the DSP, if any
HttpPort                      | `integer` (read-only) | The port on which this DSP receives HTTP traffic
UdpPort                       | `integer` (read-only) | The port on which this DSP receives UDP traffic
DefaultCurrency               | `string` (read-only)  | The default currency as defined in the configuration file
PrivateIp                     | `string` (read-only)  | The private IP address of the DSP server
PublicIp                      | `string` (read-only)  | The public IP address of the DSP server
