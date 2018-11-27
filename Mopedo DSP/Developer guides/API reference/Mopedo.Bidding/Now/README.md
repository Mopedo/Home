---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/Now/
---

# `Now`

```json
{
    "Name": "Mopedo.Bidding.Now",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The Now resource can be used to print time and time zone information for the Mopedo DSP, and is also useful when setting up conditions for time-dependent bid rules.

## Format

Property name         | Type                         | Description
--------------------- | ---------------------------- | --------------------------------------------------
Date                  | [`datetime`](../../Datetime) | The current date
Day                   | `integer`                    | The current day (of month)
DayOfWeek             | `string`                     | The name of the current week day in lower case
DayOfWeekNr           | `integer`                    | The current week day number, 1-7\. Monday = 1
DayOfYear             | `integer`                    | The current day of year, 1-365
Hour                  | `integer`                    | The current hour of day, 1-24
Minute                | `integer`                    | The current minute of hour, 1-60
Month                 | `integer`                    | The current month number of year, 1-12
Second                | `integer`                    | The current second of minute, 1-60
Year                  | `integer`                    | The year, e.g. 2017
TimeOfDay             | `string`                     | Time as sortable string, e.g. `"12:17:21.6553277"`
TimeZone              | `string`                     | The name of the time zone where the DSP is located
UTCOffset             | `string`                     | The UTC offset of the server's current time zone
IsDaylightSavingsTime | `boolean`                    | Is the server's time zone currently in DST?
