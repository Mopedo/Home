---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Debug/SnapshotControls/
---

# `SnapshotControls`

```json
{
    "Name": "Mopedo.Debug.SnapshotControls",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `SnapshotControls` resource is a [terminal resource](../../../../../RESTar/Consuming%20a%20RESTar%20API/Consuming%20terminal%20resources) that allows the client to create, reset and print settings for [`CampaignSpendingSnapshot`](../../Mopedo.Bidding/CampaignSpendingSnapshot) entities and their corresponding [`AdSpendingSnapshot`](,,/,,/Mopedo.Bidding/AdSpendingSnapshot) entities.

## Options

These are the options available from this terminal resource:

```
> /snapshotcontrols
< ? /Mopedo.Debug.SnapshotControls
> GET
< ### Mopedo.Debug.SnapshotControls ###

  Option:  Create
  About:   Creates snapshots and registers bids retroactively
  - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Option:  Reset
  About:   Resets all snapshots, unreports all bids and resets settings
  - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Option:  Settings
  About:   Prints the campaign spending snapshot worker settings

> Type an option to continue, or 'cancel' to return to the shell
```
