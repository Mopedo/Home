---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/Broadcaster/
---

# `Broadcaster`

```json
{
    "Name": "Mopedo.Bidding.Broadcaster",
    "Kind": "EntityResource",
    "Methods": ["GET", "PATCH", "REPORT", "HEAD"]
}
```

The `Broadcaster` resource represents **broadcasters** – servers in the Mopedo backend that provide traffic for the DSPs on the Mopedo platform. Using the `Broadcaster` resource, DSP administrators can inspect, connect and disconnect broadcasters. Connected broadcasters will send bid requests to the DSP, which are matched against active campaigns. If no active campaigns exist on the DSP, the bid requests are simply stored in the database and ignored by the bidder.

There are two ways to connect to a broadcaster to a Mopedo DSP:

1. By adding a broadcaster ID or the URI to a broadcaster to the DSP [configuration file](../../../../Administration%20guides/Configuration%20guide). Broadcasters added to the configuration file are connected on application startup.
2. By changing the value of the `Connected` property of a `Broadcaster` entity, using a `PATCH` request to the REST API.

All broadcasters are disconnected when the DSP application is stopped.

## Format

Property name     | Type                                     | Description
----------------- | ---------------------------------------- | --------------------------------------------------
Id                | `string` (read-only)                     | A unique id for the broadcaster
ServiceProvider   | `string` (read-only)                     | The cloud service provider hosting the broadcaster
Zone              | `integer` (read-only)                    | The cloud service zone, defined by the provider
Location          | `string` (read-only)                     | The physical location of the broadcaster server
SSPs              | array of `string` (read-only)            | Names of the SSPs connected to this broadcaster
LatestBroadcastAt | [`datetime`](../../Datetime) (read-only) | Time of the latest broadcast from this broadcaster
Connected         | `boolean`                                | Is this broadcaster currently connected?
