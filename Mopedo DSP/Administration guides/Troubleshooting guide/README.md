---
permalink: Mopedo%20DSP/Administration%20guides/Troubleshooting%20guide/
---

# Troubleshooting guide

Should you encounter any issues with your Mopedo DSP application, here are some steps to take to troubleshoot and create an issue report.

Since the DSP application runs inside Starcounter, and possibly behind a [HTTPS compatible proxy](../IIS%20reverse%20proxy%20setup%20guide) server, the first thing we need to check when encountering errors is that the application is running. We could, for example, receive `502` responses from the REST API when we use a proxy – even when the app is not running.

You can check the status of the application from the Starcounter administrator website, usually available at `localhost:8181`. By clicking on the database from the **Databases** tab, you can see all applications currently running in that database. If your application is not started, try starting it.

## Issue guides

### "The Database engine not running"

If you get this error while trying to start the DSP application, which is commmon when trying to restart an application that failed during startup – click the **Stop** button next to the database name, and then **Start**. This will restart the Starcounter database. Then try again to start the DSP application.

### Restarting the Starcounter service and the DSP application

In some rare cases, it can be necessary to restart the Starcounter service, and the DSP application during troubleshooting.

1. Open a Windows command prompt as administrator (right-click the start menu and click **Command Prompt (Admin)** and then click **Yes** in the pop-up User Account Control dialog.
2. In the command prompt, enter `staradmin kill all` and press enter. This will terminate the Starcounter service.
3. In the command prompt, enter `staradmin start server` and press enter. This will start the Starcounter service.
4. Click the **Starcounter Personal Administrator** icon on the desktop to enter the [Starcounter administrator](../Installation%20guide/#starting-and-stopping-a-mopedo-dsp), where the database and DSP application can be started.

### The DSP application repeatedly fails during startup

First check if there is an error with the current application [configuration](../Configuration%20guide). The **Log** section of the Starcounter administrator should contain an configuration-related error description if the issue is with the configuration. If you need help from Mopedo, the best way to report issues is via our [GitHub issue tracker](https://github.com/Mopedo/Home/issues).

1. Please go to the **Log** section in the upper right-hand side of the window.
2. If no appropriate issue already exists, [create an issue](https://github.com/Mopedo/Home/issues/new) in our GitHub repository.
3. Copy the contents of the **Log** view to the issue message and click **Submit new issue**.

We will look at it right away. You can also contact `develop@mopedo.com`.

### I'm getting `500-599` status codes in responses from the REST API

These responses are most commonly due to some error in the network setup. If you are using a proxy, make sure that requests are forwarded correctly, and that the correct firewall rules are in place.

If the response contains the `RESTar-info` header, the issue is likely due to some internal issue with the REST API. In these cases:

1. Get the 20 latest REST API errors by running the following request to the REST API: `/admin.error//order_desc=time&limit=20`. The API will return a JSON representation of these errors.
2. Copy the JSON from the response and [create an issue](https://github.com/Mopedo/Home/issues/new) in our GitHub repository with an appropriate title, and with the JSON pasted in the message.
