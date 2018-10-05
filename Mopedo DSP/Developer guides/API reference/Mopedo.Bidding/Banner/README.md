---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/Banner/
---

# `Banner`

`Banner` is not strictly a resource since it's not persistent, and not accessible directly in the API. It can still be used like a read-only [data source in path expressions](../Path%20expressions%20and%20macros). It's a reference to the banner ad slot contained within the bid request, in which an `Ad` can be placed. If the bid request does not contain a banner ad slot, `Banner` will simply be `null` for that bid request.

## Format

Property name | Type      | Description
------------- | --------- | --------------------------------------------------
Width         | `integer` | The width of the banner ad slot
Height        | `integer` | The height of the banner ad slot
AboveTheFold  | `bool`    | Is this banner ad slot located above the fold?
PositionRank  | `integer` | The [position rank](#position-rank) of this banner

## Position ranking

The `PositionRank` property of a `Banner` is used to determine the location of the banner ad slot on the web page on which it's located. The `PositionRank` property will have the value `null` if its position cannot be determined, and otherwise any of these numeric values – as defined by [OpenRTB](https://www.iab.com/wp-content/uploads/2016/03/OpenRTB-API-Specification-Version-2-5-FINAL.pdf):

Value | Description
----- | -------------------------------------------------------------------------------------
`1`   | Above the Fold
`2`   | DEPRECATED - May or may not be initially visible depending on screen size/resolution.
`3`   | Below the Fold
`4`   | Header
`5`   | Footer
`6`   | Sidebar
`7`   | Full Screen
