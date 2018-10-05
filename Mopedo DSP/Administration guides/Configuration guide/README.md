---
permalink: Mopedo%20DSP/Administration%20guides/Configuration%20guide/
---

# Configuration guide

During the [installation steps](../Installation%20guide), an XML configuration file will be created for the Mopedo DSP, from which the DSP reads settings during startup. In the configuration file, we can set the following properties:

Property name                 | Description
----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SeatId                        | The unique ID you have been given by Mopedo
Password                      | The password you have been given by Mopedo
Email                         | The email address of your DSP administrator
Broadcaster                   | ID(s) or URI(s) for the Mopedo broadcasting server(s)
HttpPort                      | The port on which to listen for incoming HTTP traffic (default 8004)
UdpPort                       | The port on which to listen for incoming UDP traffic (default 9004)
BidRequestFilter              | The current [bid request filter](../../Feature%20guides/Bid%20request%20filtering)
RESTPort                      | The port on which the REST API listens for incoming requests
RESTUri                       | The base URI for the REST API, default is `/rest`
RequireApiKey                 | Should the REST API require [API keys](../../../RESTar/Administering%20a%20RESTar%20API/API%20keys) in requests? Default is `true`
AllowAllOrigins               | Should all [CORS origins](../../../RESTar/Administering%20a%20RESTar%20API/CORS) be allowed? Default is `false`
ApiKey                        | Registers an API key for the REST API
AllowedOrigin                 | Allowed CORS origins for the REST API
RoutineUpdateIntervalMinutes  | The minutes between [routine](../../Developer%20guides/API%20reference/Mopedo.Archive/Routines) runs (default is `360`)
SpendingSnapshotStoragePeriod | The setting for [spending snapshot trimming](../../Developer%20guides/API%20reference/Mopedo.Bidding/CampaignSpendingSnapshot#snapshot-trimming), can be `"Short"`, `"Medium"` (default), `"Long"` or `"NoTrimming"`.
DefaultCurrency               | An optional [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code for the default currency to use, for example `SEK` or `USD`. If omitted, `USD` is used.
DomainName                    | An optional domain name to use in calls to this DSP from the Mopedo backend, instead of the public IP. For example `my-dsp.com`

## Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
    <SeatId>MySeatId</SeatId>
    <Password>mypassword</Password>
    <Email>my@email.com</Email>
    <Broadcaster>Broadcaster_1</Broadcaster>
    <HttpPort>8004</HttpPort>
    <UdpPort>9004</UdpPort>
    <BidRequestFilter>All</BidRequestFilter>
    <RESTPort>18282</RESTPort>
    <RESTUri>/rest</RESTUri>
    <RequireApiKey>true</RequireApiKey>
    <AllowAllOrigins>true</AllowAllOrigins>
    <ApiKey>
        <Key>my-safe-key</Key>
        <AllowAccess>
            <Resource>RESTar.*</Resource>
            <Resource>RESTar.Admin.*</Resource>
            <Resource>RESTar.Dynamic.*</Resource>
            <Resource>Mopedo.*</Resource>
            <Resource>Mopedo.Bidding.*</Resource>
            <Resource>Mopedo.Database.*</Resource>
            <Resource>Mopedo.ClientData.*</Resource>
            <Resource>Mopedo.Reporting.*</Resource>e>
            <Methods>*</Methods>
        </AllowAccess>
    </ApiKey>
</config>
```
