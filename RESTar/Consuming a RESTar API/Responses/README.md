---
permalink: RESTar/Consuming%20a%20RESTar%20API/Responses/
---

# Responses

## Error responses

If something goes wrong while evaluating a request, the REST API will respond with either a `4XX` or `5XX` status code and a description of the error in the [`RESTar-info`](#restar-info) response header. Errors that are not `403: Forbidden` are also stored in the [`RESTar.Error`](../../Built-in%20resources/RESTar.Admin/Error) resource.

## Success responses

### GET

Code | Status description | Body     | Info
---- | ------------------ | -------- | ---------------------------------------------------
200  | OK                 | entities | If entities are found, representations are included
204  | No content         | _empty_  |

#### GET response JSON format

RESTar has multiple built-in output formats, and the administrator can also add new ones. This makes it easy to conform JSON output to external standards. The administrator can create new output formats and set default formats using the [`RESTar.Admin.OutputFormat`](../../Built-in%20resources/RESTar.Admin/OutputFormat) resource. The consumer can switch between output formats on a per-request basis using the [`format`](../URI/Meta-conditions#format) meta-condition.

### POST

Code | Status description | Body    | Notes
---- | ------------------ | ------- | ----------------------------
201  | Created            | _empty_ |
200  | OK                 | _empty_ | If no entities was inserted.

### PATCH

Code | Status description | Body    | Notes
---- | ------------------ | ------- | -------------------------------
200  | OK                 | _empty_ | Even if no property was changed

### PUT

Code | Status description | Body    | Notes
---- | ------------------ | ------- | ------------------------
201  | Created            | _empty_ |
200  | OK                 | _empty_ | If an entity was updated

### DELETE

Code | Status description | Body    | Notes
---- | ------------------ | ------- | -----
200  | OK                 | _empty_ |

### REPORT

Code | Status description | Body        | Notes
---- | ------------------ | ----------- | -----
200  | OK                 | report body |

All successful responses from `REPORT` requests share the same body format:

Property name | Type      | Description
------------- | --------- | ----------------------------------------------
Count         | `integer` | The number of entities selected by the request

### HEAD

Code | Status description | Body    | Info
---- | ------------------ | ------- | ---------------------
200  | OK                 | _empty_ | Only response headers
204  | No content         | _empty_ |

## Custom response headers

RESTar uses the following custom HTTP headers to include meta-data in responses. These do not include standard HTTP headers like `Content-Type`, `Content-Length` etc.

### `RESTar-info`

Information about the result of the request, if any. For `POST` requests, for example, `RESTar-info` contains the number of inserted entities. For any error response, a description of the error.

### `RESTar-error`

For error responses, `RESTar-error` contains a link to the [`RESTar.Admin.Error`](../../Built-in%20resources/RESTar.Admin/Error) entity describing this particular error. For all other responses, this header is excluded.

### `RESTar-elapsed-ms`

The number of milliseconds elapsed during the evaluation of the request.

### `RESTar-count`

For `GET` and `HEAD` requests, `RESTar-count` contains the number of entities encoded in the response body.

### `RESTar-pager`

See [pagination](#pagination) below.

### `RESTar-version`

The version of the RESTar package of the RESTar application that generated the response.

## Pagination

RESTar supports client-side pagination using the and [`limit`](../URI/Meta-conditions#limit) and [`offset`](../URI/Meta-conditions#offset) meta-conditions in `GET` requests. To break a list of 1000 employees into ten pages with 100 per page – using client-side pagination – we use these URIs:

```
Page 1: https://my-server.com/rest/employee//limit=100&offset=0
Page 2: https://my-server.com/rest/employee//limit=100&offset=100
Page 3: https://my-server.com/rest/employee//limit=100&offset=300
...
Page 10: https://my-server.com/rest/employee//limit=100&offset=900
```

To simplify this pattern, RESTar will include a header `RESTar-pager` in paginated `GET` responses – that is, responses that do not include the last entity from the enumeration of resource entities that was used to generate the response. The value of this header will be whatever the `limit` and `offset` meta-conditions need to be set to in the next request in order to return the next equally sized page of entities from the RESTar application. This means that the consumer can paginate a resource's entire content without knowing how many pages there will be.

### Example

The `User` resource contains a large number of entities – the consumer does not know how many. The consumer can still get all `User` entities, 1000 at a time, without first counting users and determining how many requests should be made. First, the consumer gets the first 1000 entities with URI:

```
https://my-server.com/rest/employee//limit=1000
```

The response will be:

```
Headers:  'RESTar-pager: limit=1000&offset=1000'
          'RESTar-count: 1000'
Response body:
[{
    "Cuid": "a123",
    "DateOfRegistration": "2003-11-02T00:00:00Z",
    "Name": "Michael Bluth",
    "Segment": "A1"
}, ... ]
```

For the next page, the consumer can copy the value of the `RESTar-pager` header and place in the next request. URI for page 2:

```
https://my-server.com/rest/employee//limit=1000&offset=1000
```

And so on until either a `204: No content` response is encountered, or there is no `RESTar-pager` header in the response (which means that the last entity in the enumeration was included in the response).
