---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/Mopedo.Bidding/Click%20tracking/
---

# Click tracking

Click tracking is used by advertisers and ad exchanges to track whether ad impressions are clicked. This is a helpful measure when evaluating how well a campaign is performing.

There are two ways to implement click tracking on a Mopedo DSP:

1. By using **automatic click tracking**
2. By implementing a **custom click tracking macro**.

## Automatic click tracking

Automatic click tracking makes the process easy for the advertiser – all you need to do to activate is to set `AutoClickTrackingEnabled` to `true` for a given [`Ad`](../Ad) and provide a URL to the corresponding landing page in the `LandingPage` property. The DSP will then automatically modify the `AdMarkup` to notify both the DSP and the ad exchange when the ad contained in a winning [bid](../../Mopedo.Database/Bid) is clicked. If the ad is clicked, the properties `Clicked`, `ClickedAt` and `ClickLandingPage` of the corresponding [`Win`](../../Mopedo.Database/Win) will provide additional information about the clicked impression – for example the time of the click and what landing page the user was forwarded to.

## Custom click tracking macro

To manually implement click tracking, the advertiser needs to insert a click tracking macro inside the `AdMarkup` string of an `Ad`. This is standard procedure for click tracking, and allows the ad exchange to insert a dynamically generated callback URL in the markup, that allows the advertiser to redirect the user to the ad exchange – which will then redirect the user to the landing page. For more information about click tracking macros in ad markup, see [this link](https://protocol.bidswitch.com/standards/macros.html#ssp-click-tracking-url-macro).
