---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/Path%20expressions%20and%20macros/
---

# Path expressions and macros

There are some resource properties in the Mopedo DSP, where it's possible to make reference to other data sources by using **path expression strings**. The best example is [bid rule conditions](../Campaign#condition), where we use path expressions as the values of the `Key` property.

Here is the complete list of places where path expression strings can be used:

- `Key` properties of [`Condition`](../Campaign#condition) objects in [`BidRule`](../Campaign#bidrule)
- In [macros](#macros) used in `LandingPage` properties of [`Ad`](../Ad)
- In [macros](#macros) used in `AdMarkup` properties of [`Ad`](../Ad)

## Path expressions

Path expressions are used to reference a property of some data source, and consist of the name of a **data source**, followed by names of properties divided by dots.

### Available data sources

#### `User`

Used to denote the [`User`](../../Mopedo.Database/User) contained in a [bid request](../../Mopedo.Database/BidRequest)

#### `Device`

Used to denote the [`Device`](../../Mopedo.Database/Device) contained in a [bid request](../../Mopedo.Database/BidRequest)

#### `Site`​

Used to denote the [`Site`](../../Mopedo.Database/Site) contained in a [bid request](../../Mopedo.Database/BidRequest)

#### `App`

Used to denote the [`App`](../../Mopedo.Database/App) contained in a [bid request](../../Mopedo.Database/BidRequest).

#### `Banner`

Used to denote the [`Banner`](../../Mopedo.Bidding/Banner) contained in a [bid request](../../Mopedo.Database/BidRequest)

#### `Now`

Used to denote the static [`Now`](../Now) resource

### Example path expressions

Path expressions are **case sensitive**. For more information about the properties of the above data sources, see their respective documentation.

```
User.UserId
Device.Geo.Longitude
Site.Publisher.Domain
Banner.Width
Banner.AboveTheFold
App.Bundle
User.AdWinCount(ad001) // where ad001 is an ad id
Device.Extension.deviceGroup
Now.Hour
Device.CreatedAt
User.Extension.usergroup
```

For more examples, see the [advertising example](../../../../Feature%20guides/Advertising%20example) section of the documentation.

## Macros

Sometimes it's useful to insert values from path expressions straight into the `AdMarkup` and `LandingPage` strings of `Ad` entities. This allows us to, for example, include banner ad slot dimensions in the call to an ad server, or insert user information in the URL that is called when a banner ad is clicked. To allow this, there is support for macros in the `AdMarkup` and `LandingPage` strings. All the data sources detailed above can be used for this. Macros have the following syntax:

```
$(<path expression>)
```

Where `<path expression>` is a path expression.

### Examples

Using macros, we can insert the banner dimensions into an iframe in `AdMarkup`.

```
"AdMarkup": "<iframe width='$(Banner.Width)' height='$(Banner.Height)' frameBorder='0' src='http://my-dsp.com/getmarkup?ad=0123&uid=$(User.Extension.UID)'> </iframe>"
```

In the example, we also include a `UID` from the `UserExtension` object belonging to the `User` of the [bid request](../../Mopedo.Database/BidRequest) in the call to the ad server.a
