---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/ErrorLog/
---

# `ErrorLog`

```json
{
    "Name": "Mopedo.ErrorLog",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

The `ErrorLog` resource contains errors that have been encountered during the DSP runtime. It's useful for remote troubleshooting and debugging and when sending bug reports to Mopedo.

## Format

Property name | Type                      | Description
------------- | ------------------------- | --------------------------------------------------------
Time          | [`datetime`](../Datetime) | The date and time for the error
Level         | `string`                  | The error level, either `"Warn"`, `"Error"` or `"Fatal"`
Message       | `string`                  | The error message, including stack trace
