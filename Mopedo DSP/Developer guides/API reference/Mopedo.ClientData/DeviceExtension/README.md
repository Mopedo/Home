---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.ClientData/DeviceExtension/
---

# `DeviceExtension`

```json
{
    "Name": "Mopedo.ClientData.DeviceExtension",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

The `DeviceExtension` resource relates a set of client-defined data points with the [`Device`](../../Mopedo.Database/Device) database resource. There is one reserved property name, `IP`, that may not be used as a client-defined data point. All case variations of `IP`, for example `Ip` and `ip` are also reserved.

In many cases an actual device will have different IP addresses at different times. For example, a mobile phone will have different IP addresses when used via a cellular connection and while connected to a home Wi-Fi network. But since devices, unlike users, are not uniquely identified by the SSPs by means of cookies, IPs are the best we can get.

It is recommended that the advertiser provide a unique identifier to each `DeviceExtension` entity, so that duplicates can easily be identified and existing entities updated properly. `DeviceExtension` works just like [`UserExtension`](../UserExtension), but connects to a Device via IP, instead of to a `User` via `UserId`.

## Data update example

For this example, we consider an advertiser who wants to upload a couple of thousand IP addresses for ad targeting. The advertiser can do this with a `POST` request to the `DeviceExtension` resource using the REST API:

```
POST https://my-dsp.com:8282/rest/deviceextension
Headers: "Authorization: apikey mykey"
Body: [
    {
        "IP": "131.21.33.123",
        "DeviceGroup": "Targeting_1",
        "DeviceId": 132
    }, {
        "IP": "112.92.91.45",
        "DeviceGroup": "Targeting_1",
        "DeviceId": 133
    }, ...
]
```

By setting [bid rules](../../Mopedo.Bidding/Campaign#bidrule) in an active campaign that matches against the `DeviceGroup` property of `DeviceExtension` entities, the advertiser can make sure to respond with a certain marketing message to these IP addresses as they appear in bid requests. Example condition:

```json
{
    "Key": "Device.Extension.DeviceGroup",
    "Operator": "EQUALS",
    "Value": "Targeting_1"
}
```
