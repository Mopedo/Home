---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Debug/RoutineControls/
---

# `RoutineControls`

```json
{
    "Name": "Mopedo.Debug.RoutineControls",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `RoutineControls` resource is a [terminal resource](../../../../../RESTar/Consuming%20a%20RESTar%20API/Consuming%20terminal%20resources) that allows the client to manually trigger the run of all archiving [routines](../../Mopedo.Archive/Routines).

## Options

```
> /routinecontrols
< ? /Mopedo.Debug.RoutineControls
> GET
< ### Mopedo.Debug.RoutineControls ###

  Option:  RunAll
  About:   Runs all routines

> Type an option to continue, or 'cancel' to return to the shell
```
