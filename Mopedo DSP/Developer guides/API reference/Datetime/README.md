---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Datetime/
---

# `Datetime (ISO 8601)`

An `ISO 8601 datetime` is a `string` that encodes a date and time according to the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. The date and time:

```
January 3rd 2017 19:45:01 and 321 milliseconds
```

Is encoded into the following ISO 8601 string:

```
"2017-01-03T19:45:01.3210000"
```

ISO 8601 datetimes can include an optional [time zone designator](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators). If not present, the DSP will assume that the time is expressed in the UTC time format.

The DSP writes UTC datetimes in JSON output, for example:

```json
{
    "SomeDateTime": "2017-01-03T19:45:01.3210000Z"
}
```

`Z` is the zone designator for the zero UTC offset according to ISO 8601.
