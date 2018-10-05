---
permalink: Mopedo%20DSP/Feature%20guides/Bid%20request%20filtering/
---

# Bid request filtering

Bid request filtering is a powerful feature of the Mopedo DSP, which allows it to make an early coarse-grained selection of which incoming [bid requests](../../Developer%20guides/API%20reference/Mopedo.Database/BidRequest) to accept, based upon the `Matched` status of their containing [`User`](../../Developer%20guides/API%20reference/Mopedo.Database/User) or [`Device`](../../Developer%20guides/API%20reference/Mopedo.Database/Device) entities. Skipped requests are not stored in the `BidRequest` resource. This filtering is done before bid request evaluation is initiated, which means that filtered bid requests will not be evaluated at all – saving a great deal of CPU power and RAM memory usage.

There is a big difference, performance-wise, between using bid request filters and using regular bid rules for selecting bid requests to respond to. A bid request filter can filter a large number of bid requests with a minimal impact on system performance – which is generally not the case for bid rules. It's therefore recommended to always use the most restricting bid request filter that is adequate with respect to the campaigns currently running on the DSP. You can configure the bid request filter by giving a value to the `BidRequestFilter` property in the Mopedo [configuration file](../Configuration%20guide). The bid request filter can also be programmatically changed during DSP runtime by setting the property `BidRequestFilter` in the [`Mopedo.Settings`](../../Developer%20guides/API%20reference/Settings) resource.

## Available filter settings

### `OnlyMatchedUsers`

```xml
<BidRequestFilter>OnlyMatchedUsers</BidRequestFilter>
```

The `OnlyMatchedUsers` filter filters incoming bid requests based on the `Matched` status of the `User` contained in each bid request. If and only if `Matched` equals `true` for the user, will the bid request generate a `BidRequest` instance and be forwarded for evaluation. This filter is appropriate if the DSP should be set up to listen only for traffic with matched users.

### `OnlyMatchedDevices`

```xml
<BidRequestFilter>OnlyMatchedDevices</BidRequestFilter>
```

The `OnlyMatchedDevices` filter filters incoming bid requests based on the `Matched` status of the `Device` contained in each bid request. If and only if `Matched` equals `true` for the device, will the bid request generate a `BidRequest` instance and be forwarded for evaluation. This filter is appropriate if the DSP should be set up to listen only for traffic with matched devices.

### `MatchedUsersOrMatchedDevices`

```xml
<BidRequestFilter>MatchedUsersOrMatchedDevices</BidRequestFilter>
```

The `MatchedUsersOrMatchedDevices` filter filters incoming bid requests based on the `Matched` status of the `User` and `Device` entities contained in each bid request. If and only if `Matched` equals `true` for either the `User` or the `Device`, will the bid request generate a `BidRequest` instance and be forwarded for evaluation. This filter is appropriate if the DSP should be set up to listen only for traffic with either matched users or devices.

### `MatchedUsersWithMatchedDevices`

```xml
<BidRequestFilter>MatchedUsersWithMatchedDevices</BidRequestFilter>
```

The `MatchedUsersWithMatchedDevices` filter filters incoming bid requests based on the `Matched` status of the `User` and `Device` contained in each bid request. If and only if `Matched` equals `true` for both the `User` and the `Device`, will the bid request generate a `BidRequest` instance and be forwarded for evaluation. This filter is appropriate if the DSP should be set up to listen only for traffic with both a matched user and a matched device.

### `All`

```xml
<BidRequestFilter>All</BidRequestFilter>
```

The `All` filter setting applies no filtering and simply forwards all incoming bid requests to the evaluation step. This is an appropriate filter if the DSP should be set up to listen to as much traffic as possible, and has the necessary system resources to do so.
