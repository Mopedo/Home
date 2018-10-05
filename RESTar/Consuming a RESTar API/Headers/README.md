---
permalink: RESTar/Consuming%20a%20RESTar%20API/Headers/
---

# Headers

By including certain parameters as values in request headers, the client can instruct the server to perform some high-level operations while handling a request.

## `Authorization`

When designing a RESTar application, the developer can choose if to require API keys in REST API requests. If API keys are required, the client is expected to include the key in the `Authorization` header. If `"mykey"` is a valid API key, a request could look like this:

```
GET https://my-server.com/rest
Headers: 'Authorization: apikey mykey'
```

RESTar also supports [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). This is particularly useful when sending requests from clients that have built-in support for basic authentication. Basic authentication needs the client to input a user name and password. When sending requests to a RESTar API with basic authentication, leave the user name blank and use the api key as password.

## `Content-Type`

The `Content-Type` header is used to inform the server of what format the data from the data source is encoded in. Tha value should be a MIME type string, for example `application/json` (JSON) or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (Excel). The RESTar application developer can define [additional supported input content types]().

## `Accept`

The `Accept` header tells the server to encode the response body in a certain format. By default, responses are JSON-formatted, but this can be changed to Excel by setting the content of the `Accept` header to `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`. The server will automatically, as per convention, include information in the `Content-Disposition` header, that the client can use to automatically give the output file an appropriate name. The RESTar application developer can define [additional supported output content types]().

### Example:

```
cd /Users/erik/Desktop
curl 'https://my-server.com/rest/employee'
-H 'Authorization: apikey mykey'
-H 'Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' -O -J

# The -O flag saves the response as a file
# The -J flag uses the data in the Content-Disposition header to name the file

# Output: a new .xlsx file on my desktop called
# "MyResources.Employee_[time_code].xlsx" where [time_code] is substituted with the
# current date and time.
```

## `Source`

If an external data source should be used instead of the contents of the request body, a method and URI to that data source can be included in the `Source` header. The input content type is still defined by the `Content-Type` header. `Source` headers values have the following syntax (EBNF):

```
source-header = "GET", " ", uri, [" ", headers] ;
headers = "[", header, "]", [headers] ;
header = header name, ": ", header value ;
```

### Example:

```
# We want to use data.xlsx as data source for a REST API POST request to the
# employee resource, and that file is located on http://some-server.com/data.xlsx

curl -X POST -d '' 'https://my-server.com/rest/employee'
-H 'Authorization: apikey mykey'
-H 'Source: GET https://some-server.com/data.xlsx [Authorization: apikey mykey]'
-H 'Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

# – In the Source header, we include a method, followed by an empty space, followed
#   by a URI to the file that should be used as data source.
# – In the Content-Type header, include the proper type so that the server knows
#   how to interpret the data.
# – We can specify a URI to a resource in the same REST API as Source, which makes
#   it possible to post to a resource from another resource on the same server. In
#   these cases, we can use relative URIs, for example /employee.
```

## `Destination`

If the data included in a response from a REST API request should be forwarded to an external destination instead of back to the client, we can specify this destination as a method and URI in the `Destination` header. And if we want the data to be sent to the external destination in Excel format, we simply set the `Accept` header to `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`. `Destination` header values have the following syntax (EBNF):

```
source-header = method, " ", uri, [" ", headers] ;
method = "GET" | "POST" | "PATCH" | "PUT"| "DELETE" ;
headers = "[", header, "]", [headers] ;
header = header-name, ": ", header-value ;
```

### Example:

```
curl 'https://my-server.com/rest/employee'
-H 'Authorization: apikey mykey'
-H 'Destination: POST https://my-other-server.com/rest/employee [Authorization: apikey mykey]'

# – We can specify a URI to a resource in the same REST API as Destinatino, which makes
#   it possible to use the result of a request in a new request to the same server. In
#   these cases, we can use relative URIs, for example /employee.
```

When the `Destination` header is set, the request response will be whatever response the server receives from sending a request with the specified method, URI and data to the destination server.

The response body from a `GET` request, if entities were found, is always an array of JSON objects (or a set of rows in Excel), which means that the destination for a GET request must be able to handle an array of entities as input. This, in turn, means that if a RESTar server is used as destination, the destination method must be `POST`, as it's the only method that allows an array of entities to be used as input. Sometimes we want to insert entities in a duplicate-safe way, however, which is why we need the [`Safepost` meta-condition](../URI/Meta-conditions#safepost) – which will trigger a server-side iteration over the list of entities and splitting the request into multiple internal `PUT` requests.
