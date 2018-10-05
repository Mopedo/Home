---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.ClientData/SiteExtension/
---

# `SiteExtension`

```json
{
    "Name": "Mopedo.ClientData.SiteExtension",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

The purpose `SiteExtension` entities is to bind additional information to a `Site` entity, individuated by its `Domain` property. This is particularly useful when setting up lists of whitelisted or blacklisted sites for use in [bid rules](../../Mopedo.Bidding/Campaign#bidrule).

We can, for example, mark all sites we would like to advertise on with a `boolean` property `Whitelisted`, and then use a reference to `Site.Extension.Whitelisted` in a [condition](../../Mopedo.Bidding/Campaign#condition) inside a bid rule.

Similarly, we can mark all sites we do not want to advertise on with a `boolean` property `Blacklisted`, for example, and use that property to make sure bidding opportunities on those sites are skipped.

Of course, since `SiteExtension` is a dynamic resource, these properties can be called something else. `Domain` and all case variations of it, are reserved property names and cannot be used for client-defined data points.

## Example

Say we want to restrict which sites we bid on, and only send bids for ad inventory on the following whitelisted sites:

```
nytimes.com
wsj.com
theguardian.com
```

To achieve this, we send the following REST request to the DSP:

```
POST https://my-dsp.com:8282/rest/siteextension
Headers: "Authorization: apikey mykey"
Body: [
    {
        "Domain": "nytimes.com",    // The DSP will find or create a Site with this Domain and
        "Whitelisted": true         // bind this SiteExtension to it.
    }, {
        "Domain": "wsj.com",
        "Whitelisted": true
    }, {
        "Domain": "theguardian.com",
        "Whitelisted": true
    } ...
]
```

We can then use the following `Condition` in a bid rule to skip all non-whitelisted sites:

```json
{
    "Key": "Site.Extension.Whitelisted",
    "Operator": "EQUALS",
    "Value": true
}
```
