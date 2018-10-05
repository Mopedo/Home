---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.ClientData/UserExtension/
---

# `UserExtension`

```json
{
    "Name": "Mopedo.ClientData.UserExtension",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

The `UserExtension` resource relates a set of client-defined data points with the [`User`](../../Mopedo.Database/User) database resource. There is one **reserved property name**, `UserId`, that may not be used as a client-defined data point. All case variations of `UserId`, for example `userId` and `Userid` are also reserved.

It is recommended that the advertiser provide a unique identifier to each `UserExtension` entity, so that duplicates can easily be identified and existing entities updated properly. In examples, this identifier will be a string property `cuid` (customer user ID), but it can of course be called whatever and be of any data type.

## Data update example

On an advertiser web site, we embed the [Mopedo JavaScript tag](../../Javascript%20tag). When the site loads, the tag will trigger cookie syncing that assigns a unique Mopedo `UserId` to the visitor of the website, and in the tag, there is a callback function with that ID as argument so that we may use it when sending data updates to the DSP.

In this simple example, we will send a simple cross-origin REST call to the DSP REST API. Let's consider an advertiser who wants to add an ID and some customer data to a visitor on their website. By using PUT, the advertiser can avoid duplicates with the same cuid.

```javascript
DRTB.callback = function(userId) {
    var data = {
        Cuid: "some_ID",
        UserId: userId,
        Group: "some_group"
    };
    var json = JSON.stringify(data);
    var url = "https://my-dsp.com:8282/rest/UserExtension/Cuid=" + data.Cuid;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Authorization', 'apikey mykey');
    xhr.send(json);
}
```

This will insert a `UserExtension` entity, and bind it to a corresponding `User` holding the given `UserId`. If the `UserId` is `ABC123`, The `UserExtension` object will look like this:

```
GET https://my-dsp.com:8282/rest/UserExtension/Cuid=some_ID
Response body: [
    {
        "Cuid": "some_ID",
        "UserId": "ABC123",
        "Group": "some_group",
        "$ObjectNo": 32123
    }
]
```
