---
permalink: RESTar/Built-in%20resources/RESTar.Admin/Console/
---

# `Console`

```json
{
    "Name": "RESTar.Admin.Console",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `Console` resource records all network activity to and from the RESTar API of the given RESTar application. The data is transient, and the client can decide the level of detail in the data feed. Use `Console` when debugging connections from external applications.

## Properties

The `Console` resource has the following properties:

Property name   | Type      | Default value | Description
--------------- | --------- | ------------- | ----------------------------------------------------------------------------------------
Format          | `enum`    | `"Line"`      | The format of the output feed. Can be `"Line"` or `"JSON"`
IncludeClient   | `boolean` | `true`        | Should the client be included in the output feed? Default is `true`
IncludeHeaders  | `boolean` | `false`       | Should response headers be included in the output feed? Default is `false`
IncludeContent  | `boolean` | `false`       | Should content (e.g. response bodies) be included in the output feed? Default is `false`
Status          | `string`  | `"PAUSED"`    | The current status of the console, can be `"PAUSED"` or `"OPEN"`
ShowWelcomeText | `boolean` | `true`        | Should the terminal print a welcome message on launch?
