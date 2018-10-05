---
permalink: Mopedo%20DSP/Feature%20guides/User%20matching/
---

# User matching

_User matching_, as the term is used here, is the process of creating unique identifiers for the users in an audience, and associating these identifiers with user information that can later be used to determine an appropriate advertising message. User matching is essential for retargeting to work. The classic case is this:

Someone visits an online store looking for some new sneakers. The shoe store recognizes this visitor and decides they want to show ads to him or her at some point in the future. They need some way to communicate this to their DSP, so that the DSP may detect that same user later in an incoming bid request – so they can respond with a relevant sneaker ad. To accomplish this, they assign a unique user ID to the user, put that ID in a cookie in the visitor's web browser, and then sync that ID – and any other relevant information they can find about the user – to their DSP.

The first part of the user matching process, setting cookies and communicating IDs, is called **cookie syncing**. The latter part, sending the relevant data to the DSP, is called **data uploading**. The syncing is done automatically by a Mopedo server. All the advertiser needs to do is to embed a [JavaScript tag](../../Developer%20guides/API%20reference/JavaScript%20tag) on their relevant web pages, so that Mopedo can assign user IDs to the web site visitors.

The second part, data uploading, is done by the advertiser upon receiving the Mopedo user ID from the cookie syncing step. By forwarding this ID to the DSP, together with relevant customer data, the advertiser can give the DSP the necessary information for later bid decisions.

![img](User%20matching%20and%20bidding.png)

**(1)** and **(2)** in the model represent the two user matching steps. **(3)** and **(4)** represents the steps when the same matched user visits a media site, which will generate a bid request to the DSP from the Mopedo backend, that is evaluated against the segmentation data that was uploaded in step **(2)**. Lastly, in **(5)**, the DSP responds with an appropriate advertising message to the media site in the form of bids that are evaluated at an ad exchange on the sell-side of the Mopedo backend.
