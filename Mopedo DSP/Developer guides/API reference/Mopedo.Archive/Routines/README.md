---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Archive/Routines/
---

# Routines

Routines are operations that archive and/or delete entities from in-memory resources such as `Mopedo.Database.BidRequest`, and that can be scheduled to run on the DSP in a given time interval. The purpose of routines is to enable automatic trimming of in-memory resources, freeing up memory space in RAM, as well as populating the **archive resources**, where the archived entities can be queried.

The following five in-memory resources can be used with routunes:

- [`Mopedo.Database.BidRequest`](../../Mopedo.Database/BidRequest)
- [`Mopedo.Database.BidResponse`](../../Mopedo.Database/BidResponse)
- [`Mopedo.Database.Bid`](../../Mopedo.Database/Bid)
- [`Mopedo.Database.Win`](../../Mopedo.Database/Win)
- [`Mopedo.Database.NoBidReason`](../../Mopedo.Bidding/NoBidReason)

A common characteristic for all these is that they can contain a large number of entities under normal circumstances, and that they grow steadily over time. Using routines, we can make sure that they do not grow past a certain number of entities, which could have an impact on DSP performance.

To manage routines for a DSP, use the [`Mopedo.Archive.Routine`](#routine) resource.

## `Routine`

```json
{
    "Name": "Mopedo.Archive.Routine",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

The `Routine` resource contains all the routines currently added to the DSP, and allows clients to insert new and modify existing routines. Added routines (that are not paused) are run at a time interval that can be set using the `RoutineUpdateIntervalMinutes` property in the [configuration](../../../../Administration%20guides/Configuration%20guide).

### Format

Property name     | Type                                     | Description
----------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------
Id                | `string` (read-only)                     | A unique ID for the routine, given by the DSP
Description       | `string`                                 | A description of the routine
Resource          | `string`                                 | The name of the in-memory resource to target with the routine (see above for a list of available resources)
IsPaused          | `boolean`                                | Is this routine currently paused? Paused routines are skipped
Objective         | `string`                                 | The [objective](#objectives) of the routine, can be `"Archive"`, `"Delete"` or `"ArchiveAndDelete"`
NrOfDaysLimit     | `integer`                                | The maximum age of entities in days before this routine is applied (minimum is `1`)
NrOfEntitiesLimit | `integer`                                | The maximum number of entities allowed in the resource before this routine is applied to old entities (minimum is `500`)
LastRunAt         | [`datetime`](../../Datetime) (read-only) | The date and time when this routine was last run
NextRunAt         | [`datetime`](../../Datetime) (read-only) | The date and time of the next routine run

Each `Routine` entity is required to include either a `NrOfDaysLimit` or a `NrOfEntitiesLimit`.

### Objectives

There are three possible values for the `Objective` property of `Routines` entities:

#### `"Archive"`

The `Archive` objective instructs the routine to copy all matched items from the in-memory resource to the SQLite based archive resource belonging to that resource. No items are deleted from the in-memory resource.

#### `"Delete"`

The `Delete` objective simply deletes the matched entities from the in-memory resource.

#### `"ArchiveAndDelete"`

The `ArchiveAndDelete` objective first copies the matched entities from the in-memory resource to the SQLite based archive resource belonging to that resource, and then deletes the matched entities from the in-memory resource.

### Limits

Each routine matches entities from the in-memory resource to perform the objective on, either by having a limit on the maximum allowed age of entities, or by having a limit of the maximum number of entitites allowed before old are removed. These limits are controlled by the `NrOfDaysLimit` and `NrOfEntitiesLimit` properties respectively.

With a `NumberOfDaysLimit` of `30`, for example, the objective is applied to all entities in the in-memory resource that are older than 30 days. With a `NumberOfEntitiesLimit` of `5000`, old entities are trimmed so that there is always at most 5000 entities in the in-memory resource.

## Default routines

The DSP comes shipped with four default routines, that are added to the `Routine` resource automatically. It's recommended to keep these routines in order to keep the DSP running properly, but the DSP administrator is free to make any changes to them. These are their definitions:

```json
[
  {
    "Description": "Moves old bid responses to the bid response archive (Mopedo.Archive.BidResponseArchive) after 3,000,000 entities",
    "Resource": "Mopedo.Database.BidResponse",
    "IsPaused": false,
    "Objective": "ArchiveAndDelete",
    "NrOfDaysLimit": null,
    "NrOfEntitiesLimit": 3000000,
  },
  {
    "Description": "Deletes old NoBidReason entities after 90 days, or when reaching 3,000,000 entities",
    "Resource": "Mopedo.Bidding.NoBidReason",
    "IsPaused": false,
    "Objective": "Delete",
    "NrOfDaysLimit": 90,
    "NrOfEntitiesLimit": 3000000,
  },
  {
    "Description": "Moves old bids to the bid archive (Mopedo.Archive.BidArchive) after 3,000,000 entities",
    "Resource": "Mopedo.Database.Bid",
    "IsPaused": false,
    "Objective": "ArchiveAndDelete",
    "NrOfDaysLimit": null,
    "NrOfEntitiesLimit": 3000000,
  },
  {
    "Description": "Moves old bid requests to the bid request archive (Mopedo.Archive.BidRequestArchive) after 5,000,000 entities",
    "Resource": "Mopedo.Database.BidRequest",
    "IsPaused": false,
    "Objective": "ArchiveAndDelete",
    "NrOfDaysLimit": null,
    "NrOfEntitiesLimit": 5000000,
  }
]
```

## Debugging routines

For debugging purposes, there is a resource [`Mopedo.Debug.RoutineControls`](,,/,,/Mopedo.Debug/RoutineControls) that can be used to manually trigger the run of all routines.
