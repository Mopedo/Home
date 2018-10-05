---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Debug/BidderConsole/
---

# `BidderConsole`

```json
{
    "Name": "Mopedo.Debug.BidderConsole",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

`BidderConsole` is a [terminal resource](../../../../../RESTar/Consuming%20a%20RESTar%20API/Consuming%20terminal%20resources) used for debugging [bid rules](../../Mopedo.Bidding/Campaign#bidrule). It posts bid rule evaluations in real-time as they happen, along with metadata such as the evaluated values for bid rule [conditions](../../Mopedo.Bidding/Campaign#condition).

For performance reasons, it's recommended to only use `BidderConsole` terminals while debugging bid rules, since building the debug information will otherwise consume unnecessary system resources.

## Properties

Property name   | Type      | Default value | Description
--------------- | --------- | ------------- | ----------------------------------------------------------------
Status          | `string`  | `"PAUSED"`    | The current status of the console, can be `"PAUSED"` or `"OPEN"`
ShowWelcomeText | `boolean` | `true`        | Should the terminal print a welcome message on launch?
