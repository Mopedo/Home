---
permalink: Mopedo%20DSP/Feature%20guides/Advertising%20example/
---

# Advertising example

For this example, we consider an advertiser running an online shoe store, who wants to create a new advertising campaign that runs during May of 2018\. The campaign will target three different customer segments:

- Unregistered first time purchasers
- Registered customers that haven't shopped for at least three months
- Registered customers with recent purchases.

The advertiser calls these segments `Unreg`, `RC3` and `RC0` respectively. Free shipping will be offered to these customers, on items they have shown interest for in the past.

The online store backend has a user database and handles the identification of users through login on the website and cookies. In this database, `User` entities are defined as:

Property name  | Type                                                            | Description
-------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------
UUID           | `string`                                                        | Unique user ID for the customer
LatestPurchase | [`datetime`](../../Developer%20guides/API%20reference/Datetime) | The date and time of the latest purchase
Seg            | `string`                                                        | The customer segment, for example `Unreg`
Keywords       | `string`                                                        | A comma separated list of interests, e.g. `"sneakers, slippers, loafers"`

## Server setup and security

The advertiser has set up a Mopedo DSP application on a cloud location, and secured the [REST API](../../Developer%20guides/API%20reference/API%20reference%20overview) behind an HTTPS-compatible web server using their own SSL certificate. REST API requests are validated using an [API key](../../../RESTar/Administering%20a%20RESTar%20API/API%20keys) included in the `Authorization` header, and the web server routes the requests to the DSP using [reverse proxy](../../Administration%20guides/IIS%20reverse%20proxy%20setup%20guide). In the Mopedo [configuration file](../../Administration%20guides/Configuration%20guide), the advertiser has assigned an API key, `PT5oNGs3Ron9`, that will be used in all REST requests.

## JavaScript tag and cookie syncing

The advertiser inserts the [Mopedo JavaScript tag](../../Developer%20guides/API%20reference/JavaScript%20tag) on appropriate web sites, updating DSP data by making calls to a backend application that in turns sends requests to the Mopedo REST API. The Mopedo cookie is placed in the visitor's web browser when the JavaScript tag is executed, which makes it possible to identify that same user later, while receiving a bid request from the Mopedo backend.

## Data updates from the store backend

Whenever a customer is identified, a REST API call is made from the store backend to the [`UserExtension`](../../Developer%20guides/API%20reference/Mopedo.ClientData/UserExtension) resource on the DSP, updating it with the content of a user database entity – using the `UUID` as unique identifier. Notice how the advertiser can keep using their existing data model on the DSP, since the `UserExtension` resource is dynamic. This is how one of these REST requests look:

```
PUT https://dsp.theshoestore.com/rest/userextension/UUID=GzA9-0001
Headers: "Authorization: apikey PT5oNGs3Ron9"
Body: {
    "UserId": "AEAAAAAAACU",
    "UUID": "GzA9-0001",
    "LatestPurchase": "2016-07-03T20:23:36.5488537",
    "Seg": "RC3"
}
```

## Batch import of existing users

The advertiser also has a couple of thousand users that have not yet been assigned a Mopedo `UserId` (they were added before the Mopedo DSP was set up). All these users can be batch imported to the DSP now and then updated with a `UserId` (using PUT with UUID as unique ID) later. To do so, the advertiser makes the following `POST` request to the DSP, with a list of entities as request body.

```
POST https://dsp.theshoestore.com/rest/userextension
Headers: "Authorization: apikey PT5oNGs3Ron9"
Body:
[
    {
        "UUID": "GzB3-0001",
        "LatestPurchase": "2016-09-12T10:32:22.6521241",
        "Seg": "RC3"
    }, {
        "UUID": "GzZA-0001",
        "LatestPurchase": "2017-08-07T02:00:49.6231551",
        "Seg": "RC0"
    }, ...
]
```

## Adding ads

The advertiser has decided to include 9 [banner ads](../../Developer%20guides/API%20reference/Mopedo.Bidding/Ad) in the campaign, three different creatives – each scaled to three common banner sizes: `300x250`, `728x90` and `160x600`. An existing ad server will be used to host the ads, and the `AdMarkup` property of each ad contains an iframe in which the call to the ad server is specified. Below is one of the uploaded ads, including the REST API call:

```
PUT https://dsp.theshoestore.com/rest/ad/adid=ad07
Headers: "Authorization: apikey PT5oNGs3Ron9"
Body: {
    "AdType": "banner",
    "AdId": "ad07",
    "Label": "loafers300x250",
    "MinWidth": 280,
    "MaxWidth": 320,
    "MinHeight": 230,
    "MaxHeight": 270,
    "AdMarkup": "<iframe width='$(Banner.Width)' height='$(Banner.Height)' frameBorder='0' src = 'http://ads.theshoestore.com/ad07/$(User.Extension.Seg)'> </iframe>",
    "Categories": ["IAB18-5", "IAB22"] // clothing, shopping
}
```

In this example, the advertiser uses [macros](../../Developer%20guides/API%20reference/Mopedo.Bidding/Path%20expressions%20and%20macros#macros) to dynamically insert the banner width and height into the `AdMarkup`. The user's `Seg` property, included in data updates, is also included in the call to the ad server, which lets the ad server select the appropriate ad for the customer.

> This logic can be implemented in many ways, depending on how the ad server is set up

## Setting up the campaign

The advertiser has decided on the following logic for deciding which creative to show:

1. If an identified user has shown interest in sneakers in the past, always show the sneaker creative.
2. Otherwise, if the user has shown interest in slippers and is located in Germany, show the slippers creative
3. Otherwise show the loafers creative

Each format is added as a separate `Ad`, and all ads for a certain shoe category are placed in the same `BidTemplate`. When evaluating incoming [bid requests](../../Developer%20guides/API%20reference/Mopedo.Database/BidRequest), the bidder will pick the first `Ad` in the `BidTemplate` that matches the banner dimensions.

The advertiser wants to focus their marketing on their sneaker collection, hence the bid logic above, and would therefore like to place higher bids for sneaker ads than for other ads. For sneaker ads, the advertiser sets a bid price of 30 USD CPM, and for other ads, the price is 20 USD CPM.

Before we upload the campaign, let us focus on the bid rules.

### Setting up bid rules

The bidding logic above requires us to create three bid rules that will be evaluated in order.

The first bid rule will contain one [condition](../../Developer%20guides/API%20reference/Mopedo.Bidding/Campaign#condition) – that the string property `Keywords` of the bid request's `User` entity's `Extension` entity contains the string `"sneakers"`. This condition would look like this:

```json
{
    "Key": "User.Extension.Keywords",
    "Operator": "CONTAINS",
    "Value": "sneakers"
}
```

If this is true for a bid request, a bid containing a sneaker ad of appropriate dimensions should be included in the response. If that is not true, evaluation will continue to the second bid rule.

The second bid rule would have two conditions, the first checking if the keywords contain `"slippers"`, and the second if the `Country` property of the `Device` entity's `Geo` entity is equal to `DE`. The second condition would look like this:

```json
{
    "Key": "Device.Geo.Country",
    "Operator": "EQUALS",
    "Value": "DE"
}
```

The third bid rule would contain only one condition checking so that the `User` has some `Seg` assignment. The condition would look like this:

```json
{
    "Key": "User.Extension.Seg",
    "Operator": "NOT EQUALS",
    "Value": null
}
```

Without this condition, we could end up bidding on all users with the third creative.

### The complete campaign

```json
{
    "Id": "campaign_01",
    "Label": "The April shoe campaign",
    "Priority": 5,
    "StartDateTime": "2017-11-01T00:00:00",
    "EndDateTime": "2017-12-01T00:00:00",
    "Paused": false,
    "SampleImageUrl": "http://ads.theshoestore.com/samples/campaign_01.jpg",
    "AdvertiserDomain": "theshoestore.com",
    "Budget": {
        "DailyBudget": {
            "Amount": 100,
            "Currency": "USD",
            "CPM": false
        },
        "TotalBudget": {
            "Amount": 3000,
            "Currency": "USD",
            "CPM": false
        }
    },
    "BidRules": [{
        "Conditions": [{
            "Key": "User.Extension.Keywords",
            "Operator": "CONTAINS",
            "Value": "sneakers"
        }],
        "BidTemplates": [{
            "Price": {
                "Amount": 30,
                "Currency": "USD",
                "CPM": true
            },
            "AdIds": ["ad01", "ad02", "ad03"]
        }]
    }, {
        "Conditions": [{
            "Key": "User.Extension.Keywords",
            "Operator": "CONTAINS",
            "Value": "slippers"
        }, {
            "Key": "Device.Geo.Country",
            "Operator": "EQUALS",
            "Value": "DE"
        }],
        "BidTemplates": [{
            "Price": {
                "Amount": 20,
                "Currency": "USD",
                "CPM": true
            },
            "AdIds": ["ad04", "ad05", "ad06"]
        }]
    }, {
        "Conditions": [{
            "Key": "User.Extension.Seg",
            "Operator": "NOT EQUALS",
            "Value": null
        }],
        "BidTemplates": [{
            "Price": {
                "Amount": 20,
                "Currency": "USD",
                "CPM": true
            },
            "AdIds": ["ad07", "ad08", "ad09"]
        }]
    }]
}
```

## Tracking spending

Come May, the campaign will go active. The DSP makes sure that the campaign stays within its [budget](../../Developer%20guides/API%20reference/Mopedo.Bidding/Campaign#budget), making it inactive whenever the daily or total spending is reached. The advertiser can manually pause the campaign by setting the `Paused` flag to true. To make campaigns successful, it's also important to keep track of spending and adjust bid prices if needed – using spending reports to analyze spending at different times, and pushing updates to campaigns to increase or decrease the purchased volume.
