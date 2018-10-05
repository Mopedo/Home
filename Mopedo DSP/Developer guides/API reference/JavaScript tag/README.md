---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/JavaScript%20tag/
---

# JavaScript tag

The Mopedo JavaScript tag is a piece of JavaScript code that allows buyers to assign unique identifiers to website visitors, and communicate said identifiers with sell-side partners, so that the identities of visitors may be known at a later stage for ad retargeting purposes. It commonly consists of two HTML `<script>` tags: **(1)** an asynchronous **cookie syncing script** and **(2)** a callback function that is called once the cookie syncing is completed. The Mopedo user ID is used as argument to the callback function. Using this ID, you can tag the user with your own data and then use this data when making bidding decisions.

```html
<script src="https://storage.googleapis.com/mopedo-web/um.js"></script>
<script>
    DRTB.callback = function(userId) {
        // When cookie syncing is completed, this callback function will be invoked with the Mopedo
        // user ID as argument. Add additional integration code here (external calls to DSP, etc.).
    }
</script>
```

The Mopedo servers will place one cookie in the visitor's browser when the cookie syncing script is executed, which holds the unique identifier assigned to the visitor:

```
Domain:         mopedo-drtb.com
Name:           UserId
Expires after:  365 days
Example value:  "AXcAAAADyd5"
```

The cookie syncing script will also make cookie sync pixel calls to Mopedo's external sell-side partners, which is necessary for retargeting to work across ad networks. These pixel calls will, in turn, generate more pixel calls – which is common practice when working with ad networks. The list of supply-side partners may change at any time, and Mopedo cannot inspect or control these external pixel calls. At any given time, the complete list of pixel calls – and their respective cookies – can be generated by using the common developer tools of a web browser while executing the mopedo cookie syncing script.

## Using the JavaScript tag

There are many ways to use the JavaScript tag, depending on the nature of the site and the kind of data the site collects about the visitor. Generally, there are two main approaches:

### 1\. Synchronous data uploads

In this approach, we make the data upload sychronously from the `DRTB.callback` function. This is a nice straight-forward way to forward data to the DSP, and works fine if we are not awaiting any further information to be collected. As soon as we receieve the user id, we make the external REST request.

#### Example

```html
<script src="https://storage.googleapis.com/mopedo-web/um.js"></script>
<script>
    DRTB.callback = function(userId) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", 'http://my-dsp.com:8282/rest/userextension/UserId=' + userId, true);
        xhr.setRequestHeader('Authorization', 'apikey my-insecure-key');
        var data = {
            UserId: userId,
            Segment: 'Bronze' // Example segmentation
            // Any additional key-value pairs here
        };
        xhr.send(JSON.stringify(data));
    }
</script>
```

> This code is simplified for this example, usually cross-origin requests need to take browser version/vendor into account. Also note that the API key is exposed here. There are several methods to avoid exposing API keys in JS code, but we will not go into them here.

### 2\. Asynchronous data uploads

The JavaScript tag is run when the page loads, and `DRTB.callback` is commonly called very soon after the page is loaded. In many cases real-world cases, the user interaction is not done at that point, and activities that are of interest to the advertiser have not yet been recorded. What we would like to do in these cases is to run the cookie syncing script as the page loads, but make the external REST call at a later time, after the `DRTB.callback` function has been called. For this, we simply assign the user ID to a variable in the JS environment from the body of the `DRTB.callback` function, `sessionStorage.mopedo_userId` in the example below, were it's accessible at a later time. When we're ready to send the REST request, in the example when a certain element is clicked, we simply retrieve the user ID from the variable and include it in the request.

```html
<script src="https://storage.googleapis.com/mopedo-web/um.js"></script>
<script>
    DRTB.callback = function(userId) {
        sessionStorage.mopedo_userId = userId;
    }
</script>

...

<script>
    $("#example_element").click(function() {
        var userId = sessionStorage.mopedo_userId;
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", 'http://my-dsp.com:8282/rest/userextension/UserId=' + userId, true);
        xhr.setRequestHeader('Authorization', 'apikey my-insecure-key');
        var data = {
            UserId: userId,
            Segment: 'Bronze' // Example segmentation
            // Any additional key-value pairs here
        };
        xhr.send(JSON.stringify(data));
    });
</script>
```