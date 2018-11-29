---
permalink: >-
  Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/ConditionValidator/
---

# `ConditionValidator`

```json
{
    "Name": "Mopedo.Bidding.ConditionValidator",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `ConditionValidator` resource is used to download validation data that can be used for validating [`Condition`](../Campaign#condition) entities in bidding campaign bid rules, for example in a remote system. Using this resource, clients can enumerate all valid condition keys, see what [operators](../../Operator) are available for them, and what value types are expected.

## Format

Property name    | Type              | Description
---------------- | ----------------- | -------------------------------------------------------------------
Key              | `string`          | The key of a valid condition
ValueType        | `string`          | The value type expected for a condition with the given key
ValueCanBeNull   | `bool`            | Are `null` values accepted for this condition?
AllowedOperators | array of `string` | The [operators](../../Operator) that are allowed for this condition

## Wildcards

Some parts of conditions keys, for example property names of dynamic resources like [`UserExtension`](../../../Mopedo.ClientData/UserExtension), are represented as `*` in the content of this resource. This is a [wildcard character](https://whatis.techtarget.com/definition/wildcard-character) indicating that a range of possible values, not statically determinable, can be used in place of the wildcard. For example, the output from `ConditionValidator` contains information about conditions for `UserExtension` properties. These properties are dynamically assigned to `UserExtension` entities, and there is no way to list all allowed values. Instead the wildcard character is used.

```json
{
  "Key": "User.Extension.*",
  "ValueType": "Dynamic",
  "ValueCanBeNull": true,
  "AllowedOperators": [
    "EQUALS",
    "NOT EQUALS",
    "CONTAINS",
    "NOT CONTAINS",
    "IN",
    "NOT IN",
    "GREATER THAN",
    "LESS THAN",
    "GREATER THAN OR EQUALS",
    "LESS THAN OR EQUALS"
  ]
}
```

This means that arbitrary valid keys can be constructed by substituting the wildcard character with a property name, for example `User.Extension.MySegment`.

Wildcards are also used in the [`AdWinCount()`](../../../Mopedo.Database/Common%20properties#adwincount) and [`AdClickCount()`](../../../Mopedo.Database/Common%20properties#adclickcount) methods to indicate the place where to insert the [ad](../Ad) id to calculate wins and clicks for.
