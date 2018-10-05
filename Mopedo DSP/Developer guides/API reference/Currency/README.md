---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Currency/
---

# `Currency`

```json
{
    "Name": "Mopedo.Currency",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `Currency` resource contains all currencies currently loaded in the DSP, along with their exchange rates and [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency codes. Exchange rates and currencies are automatically downloaded the first time the DSP instance launches, and are updated regularly.

## Format

Property name | Type   | Description
------------- | ------ | --------------------------------------------------------------------------------------------------
ExchangeRate  | string | The exchange rate for this currency, relative the reference currency – `SEK`
CurrencyCode  | string | The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code of this currency
