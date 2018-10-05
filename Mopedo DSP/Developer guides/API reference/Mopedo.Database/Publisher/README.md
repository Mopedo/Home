---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Database/Publisher/
---

# `Publisher`

`Publisher` entities represent publishers of sites and apps on the supply side, and are contained in `Site` and `App` entities in the DSP database.

## Format

Property name | Type     | Description
------------- | -------- | -----------------------------------------------------------
Id            | `string` | Exchange-specific publisher id
Name          | `string` | Publisher name
Categories    | `string` | Array of IAB content categories that describe the publisher
Domain        | `string` | The highest-level domain of the publisher
