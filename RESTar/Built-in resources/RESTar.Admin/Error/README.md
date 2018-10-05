---
permalink: RESTar/Built-in%20resources/RESTar.Admin/Error/
---

# `Error`

```json
{
    "Name": "RESTar.Admin.Error",
    "Kind": "EntityResource",
    "Methods": ["GET", "DELETE", "REPORT", "HEAD"]
}
```

When the REST API aborts operations due to some error, information about the error is stored in the `Error` resource. `Error` entities contain information to help debug requests and resources, and are useful when encountering unknown errors. Erronous responses will contain a link to the corresponding `Error` entity in the `ErrorInfo` header for easy traceability.

## Format

Property name | Type                         | Description
------------- | ---------------------------- | --------------------------------------------------
Id            | `string`                     | The ID of the `Error`
Time          | [`datetime`](../../Datetime) | The date and time when the `Error` was encountered
ResourceName  | `string`                     | The resource that threw the exception
Action        | `string`                     | The action that failed (e.g. the method `GET`)
ErrorCode     | [`ErrorCode`](../ErrorCode)  | The `ErrorCode` of the `Error`
StackTrace    | `string`                     | The stack trace of the encountered exception
Message       | `string`                     | The message of the encountered exception
Uri           | `string`                     | The uri of the request
Headers       | `string`                     | The headers of the request
Body          | `string`                     | The body of the request

## Example

Request:

```
GET https://my-server.com/rest/thisisnotaresource
Headers: "Authorization: apikey mykey"
```

Response:

```
Status code: 404 Not found
Headers:    "RESTar-info: RESTar could not locate any resource by 'thisisnotaresource'."
            "ErrorInfo: /RESTar.Admin.Error/id=EL5wa"
```

Error lookup request:

```
GET https://my-server.com/rest/RESTar.Admin.Error/id=EL5wa
Headers: "Authorization: apikey mykey"
```

Error lookup response body:

```
[
  {
    "Id": "EL5wa",
    "Time": "2018-02-09T13:11:14.2784921Z",
    "ResourceName": "<unknown>",
    "Action": "GET",
    "ErrorCode": "UnknownResource",
    "StackTrace": "   at RESTar.Resource.Find(String searchString)\r\n   at RESTar.Requests.Arguments.get_IResource()\r\n   at RESTar.Requests.RequestEvaluator.Evaluate(Action action, String& query, Byte[] body, Headers headers, TCPConnection tcpConnection) §§§ INNER: ",
    "Message": "RESTar could not locate any resource by 'thisisnotaresource'.",
    "Uri": "/thisisnotaresource/_/_",
    "Headers": "Connection: Keep-Alive | Accept: */* | Authorization: apikey ******* | Host: demo-dsp.mopedo-drtb.com:8282 ... ",
    "Body": null,
    "ObjectNo": 70229018
  }
]
```

The `StackTrace` is useful to include in bug reports to developers. Also, note that the API key is hidden in the `Headers` property.
