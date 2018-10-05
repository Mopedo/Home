# Mopedo DSP

This section of the documentation gives a technical description of the **Mopedo DSP**, a software product developed by Mopedo to provide easy demand side access to the Mopedo platform. Using the DSP, an advertiser can perform common DSP tasks such as segmenting audiences, setting up campaigns, responding to bid requests and tracking campaign spending over time. Data uploads and downloads are done by means of the [REST API](Developer%20guides/REST%20API%20introduction)).

The Mopedo DSP is a Windows application running on the [Starcounter](http://www.starcounter.com) in-memory database system. It's connected to the Mopedo backend, from which it continuously receives bid requests and data, and to which it responds with bids. When up and running, it will have registered several REST [resources](Developer%20guides/API%20reference/API%20reference%20overview) that are available through the REST API. The application is administrated solely by reading from and writing to these resources using HTTP requests and JSON and/or Excel data, which enables easy integration with other systems and services that speak HTTP and JSON.

For all examples in these articles we consider a DSP application running at `https://my-dsp.com`, the REST API listening on port `8282` and root URI `/rest`, and an all-access API key `mykey`. All this can of course be configured when setting up an actual Mopedo DSP. While reading this documentation, it may also be useful to reference the [OpenRTB specification](https://www.iab.com/wp-content/uploads/2016/03/OpenRTB-API-Specification-Version-2-5-FINAL.pdf).

Use the navigation menu to the left to explore the documentation.

## Contact

For any questions about this documentation, or the Mopedo DSP in general, please contact `develop@mopedo.com`.
