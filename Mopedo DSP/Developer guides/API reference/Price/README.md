---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Price/
---

# `Price`

To express prices in different currencies, the DSP uses a special `Price` object.

## Format

_Properties marked in **bold** are required._

Property name | Type              | Description
------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------
Amount        | `128-bit decimal` | The amount of the currency
**Currency**  | `string`          | An [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) code representing the currency, e.g. `"SEK"`
CPM           | `boolean`         | Whether this `Price` is encoded as a [CPM price](#what-is-cpm) or not

### What is CPM?

CPM stands for cost per mille, literally **cost per thousand**, and is a common way to talk about prices in programmatic advertising, both from a technological perspective and when making marketing decisions. When placing bids on advertising inventory online, bidders express the amount they are willing to pay with a number and a currency, for example `15 USD`. When they do so, however, they do not mean 15 US dollars, but instead 0.015 USD, or 1.5 cents. Or in other words, it's common practice to express bid prices not as the price of one impression, but the price of 1000 such impressions. The bid price encodes the cost of 1000 impressions, hence _cost per thousand_. Because of this, the DSP needs a good way to distinguish these kinds of prices from others, where we by `15 USD` mean 15 actual US dollars. For this, `Price` has the `CPM` property, that is true if the price expressed is a CPM price and false if not.

These two `Price` objects encode the same value: 15.25 US dollars.

```csharp
{
    "Amount": 15.25,
    "Currency": "USD",
    "CPM": false
},
{
    "Amount": 15250,
    "Currency": "USD",
    "CPM": true
}
```

### Working with prices with different `CPM` values

For a concept as simple as CPM, it can be suprisingly confusing when working with prices programmatically, for example from an external application that speaks to the DSP over the REST API. The best way to disambiguate prices, so we can know for sure what the `Amount` values are supposed to encode in a given context, is to have a helper function that converts all prices to a common known format, for example non-CPM, before working with them. This way we know that all prices are in the same format, and converted when necessary.

#### JavaScript example

```javascript
function toNonCPM(price) {
    if (price.CPM)
        return { amount: price.Amount / 1000, currency: price.Currency }
    return { amount: price.Amount, currency: price.Currency }
}
```
