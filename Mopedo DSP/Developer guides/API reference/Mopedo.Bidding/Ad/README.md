---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/Ad/
---

# `Ad`

```json
{
    "Name": "Mopedo.Bidding.Ad",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

The `Ad` resource contains all the ads that have been added to the DSP, and is where we upload ads for use in campaigns. `Ad` entities can exist in the DSP without there being a campaign where they're used, and the same `Ad` can be used in multiple campaigns and/or be contained in many different bids, at different bid prices.

## Format

_Properties marked in **bold** are required._

Property name                | Type                                     | Description
---------------------------- | ---------------------------------------- | -----------------------------------------------------------------------------------------------
**AdId**                     | `string`                                 | A unique id for the ad
BuyerId                      | `string`                                 | An optional ID of the buyer using this ad, for reference in reports etc.
**AdType**                   | `enum`                                   | Allowed: `"banner"`, `"video"` or `"native"`
Label                        | `string`                                 | A describing label for the ad
MinWidth                     | `integer`                                | The minimum impression width for this ad
MaxWidth                     | `integer`                                | The maximum impression width for this ad
MinHeight                    | `integer`                                | The minimum impression height for this ad
MaxHeight                    | `integer`                                | The maximum impression height for this ad
AdMarkup                     | `string`                                 | The markup of the ad. Can include [macros](../Path%20expressions%20and%20macros)
Categories                   | array of `string`                        | [IAB codes](../../Mopedo.Database/IabCode) for the creative
IsValid                      | `boolean` (read-only)                    | True if and only if all fields have valid values
Errors                       | array of [`Error`](../Error) (read-only) | The reason(s) for the ad not being valid, or empty if valid
AutoClickTrackingEnabled     | `boolean`                                | Is [auto click tracking](../Click%20tracking) enabled?
LandingPage                  | `string`                                 | The landing page for click tracking. Can include [macros](../Path%20expressions%20and%20macros)
Dimensions                   | `string` (read-only)                     | A string representation of the ad dimensions
ImplementsClickTrackingMacro | `boolean` (read-only)                    | Does this ad implement click tracking?

## Views

The `Ad` resource has two [views](../../../../../RESTar/Consuming%20a%20RESTar%20API/URI/Resource#views):

### `FromIds`

`FromIds` takes a comma-separated list of ad IDs, and returns their corresponding ads. Example URI: `/ad-fromids/adids=ad01,ad01,ad03`.

#### Format

Property name | Type     | Description
------------- | -------- | --------------------------------
AdIds         | `string` | A comma-separated list of ad IDs

### `ForCampaign`

`ForCampaign` takes a [campaign](../Campaign) ID, and returns all ads currently assigned to that campaign. Example URI: `/ad-forcampaign/campaignId=MyCampaign`.

#### Format

Property name | Type     | Description
------------- | -------- | ---------------------------------------
CampaignId    | `string` | The ID of the campaign to fetch ads for

## Example

```
cd /Users/erik/Desktop
curl -X PUT 'https://my-dsp.com:8282/rest/ad/adid=ad01' -d '@data.json' -H 'Authorization: apikey mykey'
```

We insert a new `Ad` with `AdId` `"ad01"`, or update any already existing `Ad` with that ID. As data source we use `data.json`, a text file located on my desktop with the following JSON-formatted content:

```json
{
    "AdType": "banner",
    "AdId": "ad01",
    "Label": "My new ad",
    "MinWidth": 720,
    "MaxWidth": 735,
    "MinHeight": 80,
    "MaxHeight": 100,
    "AdMarkup": "<iframe width = '$(Banner.Width)' height = '$(Banner.Height)' frameBorder = '0' src =
'http://my-adserver.com/creatives?ad=ad01&cuid=$(User.Extension.cuid)'> </iframe>'",
    "Categories": ["IAB20-1", "IAB20-2"]
}
```

The `Ad` above is a banner ad about adventure travels in Africa, that we only want to allow banner impressions with a width of between 720 and 735 pixels and a height of between 80 and 100 pixels to be matched against. The actual dimensions of the creative, as well as the creative source itself, is described in the `AdMarkup` field, in this case by use of [macros](../Path%20expressions%20and%20macros) – see for example `"$(Banner.Width)"`. By using macros, we can insert information from the impression or any other valid data source right into your markup string - which is useful for dynamically adapting the markup for a certain impression or customer.

Remember to always include accurate IAB content categories for your ads! For a list of available categories, see the [`Mopedo.Database.IABCode` resource](../../Mopedo.Database/IabCode).
