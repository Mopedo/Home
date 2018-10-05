---
permalink: RESTar/Built-in%20resources/RESTar.Admin/Protocol/
---

# `Protocol`

```json
{
    "Name": "RESTar.Admin.Protocol",
    "Kind": "EntityResource",
    "Methods": ["GET", "REPORT", "HEAD"]
}
```

The `Protocol` resource lists all [protocol providers](../../../Developing%20a%20RESTar%20API/Protocol%20providers) that have been added to the current RESTar application, as well as their respective available input and output [content types](../../../Developing%20a%20RESTar%20API/Content%20type%20providers). The RESTar protocol is always enabled, but others – such as [OData](https://github.com/Mopedo/RESTar.OData) – can be added by the developer. See [this section of the documentation](../../../Developing%20a%20RESTar%20API/Protocol%20providers) for more information on how to add custom protocol providers.

## Format

Property name | Type                       | Description
------------- | -------------------------- | --------------------------------------------
Name          | `string`                   | The name of the protocol
Identifier    | `string`                   | A unique identifier for the protocol
IsDefault     | `boolean`                  | Is this the default protocol?
ContentTypes  | array of `ContentTypeInfo` | The content types supported in this protocol

## `ContentTypeInfo`

ContentTypeInfo objects describe content types that are available for some protocol in a RESTar application.

### Format

Property name | Type              | Description
------------- | ----------------- | -----------------------------------------------------------------------------------
Name          | `string`          | The name of the content type
MimeType      | `string`          | The MIME type string of the content type
CanRead       | `boolean`         | Can the given protocol read from requests using this content type?
CanWrite      | `boolean`         | Can the given protocol write to responses using this content type?
Bindings      | array of `string` | The available header values that can be used to bind a request to this content type

## Example

```
GET /protocol

Response body:
[
    {
        "Name": "RESTar",
        "Identifier": "restar",
        "IsDefault": true,
        "ContentTypes": [{
            "Name": "JSON",
            "MimeType": "application/json",
            "CanRead": true,
            "CanWrite": true,
            "Bindings": [
                "application/json",
                "application/restar-json",
                "json",
                "text/plain"
            ]
        },
        {
            "Name": "Microsoft Excel",
            "MimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "CanRead": true,
            "CanWrite": true,
            "Bindings": [
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  "application/restar-excel",
                  "excel"
            ]
        },
        {
            "Name": "XML",
            "MimeType": "application/xml",
            "CanRead": false,
            "CanWrite": true,
            "Bindings": [
                "application/xml",
                "application/restar-xml",
                "xml"
            ]
        }]
    }
]
```
