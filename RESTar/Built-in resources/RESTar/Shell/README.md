---
permalink: RESTar/Built-in%20resources/RESTar/Shell/
---

# `Shell`

```json
{
    "Name": "RESTar.Shell",
    "Kind": "TerminalResource",
    "Methods": ["GET"]
}
```

The `Shell` resource is a [terminal resource](../../../Resource%20kinds#terminal-resources) that makes it possible to work with a RESTar API over a command-line interface. When launched, the shell acts as a command-line interpreter for text commands sent as WebSocket text messages, and responds with data and status information. Using [shell text commands](#shell-text-commands), the client can navigate around the resources of the API, read, insert, update and/or delete entities, or enter other terminals.

## Properties

Property name    | Type      | Default    | Description
---------------- | --------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------
Query            | `string`  | `""`       | Determines the current location of the shell, and the URI for subsequent requests
Unsafe           | `boolean` | `false`    | Is the shell currently in unsafe mode? (see the [`unsafe` meta-condition](../../../Consuming%20a%20RESTar%20API/URI/Meta-conditions#unsafe))
WriteHeaders     | `boolean` | `false`    | Should the shell include headers when writing output?
AutoOptions      | `boolean` | `false`    | Should the shell automatically send an `OPTIONS` command after each successful navigation?
AutoGet          | `boolean` | `false`    | Should the shell automatically send an `GET` command after each successful navigation?
StreamBufferSize | `integer` | `16000000` | The buffer size (message size) to use with [WebSocket streaming](../../../Consuming%20a%20RESTar%20API/Consuming%20terminal%20resources#streaming)
Protocol         | `string`  | `"restar"` | The [protocol](../../RESTar.Admin/Protocol) to use in requests

## Shell text commands

Shell text commands are strings of characters sent as text messages to the `Shell` terminal resource over a WebSocket connection, that trigger certain server-side operations. Each command invocation consists of the name of a command, for example `GET` or `VAR`, and – optionally – a space followed by a command argument. The semantics for the given argument differs between commands.

When receiving text commands, the shell evaluates the command and returns a result. Finally, after each command evaluation, a message is sent back over the WebSocket with the current value of the `Query` property, e.g. `? /superhero`. If a potentially [unsafe](../../../Consuming%20a%20RESTar%20API/URI/Meta-conditions#unsafe) operation is about to be performed, e.g. deletion of multiple entities, the client will be asked to confirm before the execution continues.

The following text commands are available in the `Shell` resource:

[`GO`](#go) [`GET`](#get) [`POST`](#post) [`PATCH`](#patch) [`PUT`](#put) [`DELETE`](#delete) [`REPORT`](#report) [`HEAD`](#head) [`STREAM`](#stream) [`OPTIONS`](#options) [`NEXT`](#next) [`HEADER`](#header) [`VAR`](#var) [`HELP`](#help) [`CLOSE`](#close)

### `GO`

The `GO` command sets the `Query` property to argument text (excluding any whitespace), and validates the query as a RESTar [URI](../../../Consuming%20a%20RESTar%20API/URI). This is the primary way to navigate between resources using the shell. If the navigation was unsuccessful, e.g. due to some syntax error in the input text string, an error message is returned. Otherwise, if `AutoOptions` is set to `true`, an [`OPTIONS`](#options) command is made for the new query. Otherwise, if `AutoGet` is set to `true`, a [`GET`](#get) command is made for the new query.

```
> GO /superhero   // we invoke the GO command with /superhero as argument
< ? /superhero    // the server's echoing response after a successful validation of the new query
```

### `GET`

Executes a `GET` request with the value of the `Query` property as URI along with the [headers](#header) defined for the shell. Any argument given is used as the body of the request (UTF8). On success, the content of the body is sent back to the client along with the status code and description. On fail, an error message is returned. If the body is larger than 16 megabytes, the client will be required to [stream the result](../../../Consuming%20a%20RESTar%20API/Consuming%20terminal%20resources#streaming) over multiple WebSocket messages.

```
> GO /aggregator
< ? /aggregator
> GET {"A": "GET /echo/MyProperty=1&MyOtherProperty=2"}
< 200: OK (0.3926 ms)
< [
  {
    "A": [
      {
        "MyProperty": 1,
        "MyOtherProperty": 2
      }
    ]
  }
]
< ? /aggregator
```

### `POST`

Executes a `POST` request with the value of the `Query` property as URI along with the [headers](#header) defined for the shell. Any argument given is used as the body of the request (UTF8). On success, the content of the `RESTar-info` header is sent back to the client along with the status code and description. On fail, an error message is returned.

```
> GO /superhero
< ? /superhero
> POST {"Name": "Batman"}
< 201: Created (0.9877 ms). 1 entities inserted into 'MyApp.Superhero'
< ? /superhero
> GET
< 200: OK (0.7903 ms)
< [
  {
    "Name": "Batman",
    "$ObjectNo": 3375594
  }
]
< ? /superhero
```

### `PATCH`

Executes a `PATCH` request with the value of the `Query` property as URI along with the [headers](#header) defined for the shell. Any argument given is used as the body of the request (UTF8). On success, the content of the `RESTar-info` header is sent back to the client along with the status code and description. On fail, an error message is returned.

```
> GO /superhero
< ? /superhero
> PATCH {"Name": "Bruce Wayne"}
< 200: OK (0.48 ms). 1 entities updated in 'MyApp.Superhero'
< ? /superhero
> GET
< 200: OK (0.7422 ms)
< [
  {
    "Name": "Bruce Wayne",
    "$ObjectNo": 3375594
  }
]
< ? /superhero
```

### `PUT`

Executes a `PUT` request with the value of the `Query` property as URI along with the [headers](#header) defined for the shell. Any argument given is used as the body of the request (UTF8). On success, the content of the `RESTar-info` header is sent back to the client along with the status code and description. On fail, an error message is returned.

```
> GO /superhero/name=Wonder%20Woman
< ? /superhero/name=Wonder%20Woman
> PUT {"Name": "Wonder Woman"}
< 201: Created (0.9699 ms). 1 entities inserted into 'MyApp.Superhero'
> GET
< 200: OK (0.5445 ms)
< [
  {
    "Name": "Wonder Woman",
    "$ObjectNo": 3375603
  }
]
< ? /superhero/name=Wonder%20Woman
```

### `DELETE`

Executes a `DELETE` request with the value of the `Query` property as URI along with the [headers](#header) defined for the shell. Any argument given is used as the body of the request (UTF8). On success, the content of the `RESTar-info` header is sent back to the client along with the status code and description. On fail, an error message is returned.

```
> GO /superhero
< ? /superhero
> DELETE
< This will run DELETE on 2 entities in resource 'RESTar.Dynamic.Superhero'. Type 'Y' to continue, 'N' to cancel
> Y
< 200: OK (0.9812 ms). 2 entities deleted from 'RESTar.Dynamic.Superhero'
< ? /superhero
```

### `REPORT`

Executes a `REPORT` request with the value of the `Query` property as URI along with the [headers](#header) defined for the shell. Any argument given is used as the body of the request (UTF8). On success, the content of the body is sent back to the client along with the status code and description. On fail, an error message is returned.

```
> GO /superhero
< ? /superhero
> REPORT
< 200: OK (0.6587 ms)
< [
  {
    "Count": 0
  }
]
< ? /superhero
```

### `HEAD`

Executes a `HEAD` request with the value of the `Query` property as URI along with the [headers](#header) defined for the shell. Any argument given is used as the body of the request (UTF8). On success, the status code and description of the response is sent back to the client. On fail, an error message is returned.

```
> GO /superhero
< ? /superhero
> HEAD
< 204: No content. No entities found matching request.
< ? /superhero
```

### `STREAM`

Performs [WebSocket streaming](../../../Consuming%20a%20RESTar%20API/Consuming%20terminal%20resources#streaming) of the results of a `GET` command. The value of the `StreamBufferSize` property decides how many bytes are included in each WebSocket message.

### `OPTIONS`

Returns the [`RESTar.AvailableResource`](../AvailableResource) entity corresponding to the resource selected by the current `Query`.

```
> GO /superhero
< ? /superhero
> OPTIONS
< {
  "Resource": "MyApp.Superhero",
  "ResourceKind": "EntityResource",
  "Methods": [
    "GET",
    "POST",
    "PATCH",
    "PUT",
    "DELETE",
    "REPORT",
    "HEAD"
  ]
}
< ? /superhero
```

### `NEXT`

Returns the next page in a paginated enumeration of entities.

```
> GO /RESTar.AvailableResource/_/limit=1
< ? /RESTar.AvailableResource/_/limit=1
> GET
< 200: OK (0.6156 ms)
< [
  {
    "Name": "RESTar.Admin.Console",
    "Description": "The Console is a terminal resource that allows a WebSocket client to receive pushed updates when the REST API receives requests and WebSocket events.",
    "Methods": [
      "GET"
    ],
    "Kind": "TerminalResource"
  }
]
< ? /RESTar.AvailableResource/_/limit=1
> NEXT
< 200: OK (1.0627 ms)
< [
  {
    "Name": "RESTar.Admin.DatabaseIndex",
    "Description": "The DatabaseIndex resource lets an administrator set indexes for Starcounter database resources.",
    "Methods": [
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "REPORT",
      "HEAD"
    ],
    "Kind": "EntityResource",
    "Views": []
  }
]
< ? /RESTar.AvailableResource/_/limit=1&offset=1
```

Note how the current `Query` is updated with an [`offset` meta-condition](../../../Consuming%20a%20RESTar%20API/URI/Meta-conditions#offset) after the completion of the `NEXT` command evaluation.

If an integer is included as argument to `NEXT`, it's used to determine how many pages to return.

### `HEADER`

Sets the value of a header to an assignent that is given as argument. Headers are included in all subsequent requests from the shell. Use this to, for example, change the value of the [`Accept` header](../../../Consuming%20a%20RESTar%20API/Headers#accept). After writing to the given header, all custom headers are returned.

```
> GO /superhero
< ? /superhero
> GET
< 200: OK (0.5374 ms)
< [
  {
    "Name": "Batman",
    "$ObjectNo": 3375609
  }
]
< ? /superhero
> HEADER Accept = application/xml
< {
  "Headers": {
    "Accept": "application/xml"
  }
}
> GET
< 200: OK (0.4843 ms)
< <?xml version="1.0" encoding="utf-8"?>
<root>
  <entity json:Array="true" xmlns:json="http://james.newtonking.com/projects/json">
    <Name>Batman</Name>
    <_x0024_ObjectNo>3375609</_x0024_ObjectNo>
  </entity>
</root>
< ? /superhero
```

### `VAR`

Sets the value of a [property](#properties) to an assignment that is given as argument. Use this as shorthand for the standard [`#TERMINAL` global command](../../../Consuming%20a%20RESTar%20API/Consuming%20terminal%20resources#global-commands). After writing to the given property, all properties are returned.

```
> VAR AutoGet = true
< {
  "Query": "/superhero",
  "Unsafe": false,
  "WriteHeaders": false,
  "AutoOptions": false,
  "AutoGet": true,
  "StreamBufferSize": 16000000
}
```

### `HELP`

Simply prints a link to this documentation.

### `CLOSE`

Closes the terminal, and the associated WebSocket.

## Command shorthands

Use these command shorthands when you see fit:

- Since all valid queries begin with either `-` or `/`, and no text commands begin with these characters, we can omitt the `GO` command name when navigating, and simply write the new query as a text command. Commands `GO /superhero` and `/superhero` are therefore equivalent.
- The `POST` command can be inferred when JSON objects or arrays are used as text commands, since no text comands begin with the same characters. Commands `POST {"Name": "Batman"}` and `{"Name": "Batman"}` are therefore equivalent.
- Single space character commands are interpreted as `GET` commands.

## Binary data

When receiving binary data from the WebSocket client, the shell executes a `POST` request with the value of the `Query` property as URI, the [headers](#header) defined for the shell as headers and the binary data as body.
