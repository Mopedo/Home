---
permalink: RESTar/Consuming%20a%20RESTar%20API/Consuming%20terminal%20resources/
---

# Consuming terminal resources

Terminal resources are small single-purpose console applications that can be launched and closed by REST clients. We interact with terminal resources using the WebSocket protocol, and to launch a terminal resource, we make a `GET` request to the given resource, and include a [WebSocket handshake](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#The_WebSocket_Handshake) – so that the server can initiate a WebSocket connection for the terminal.

The easiest way to initiate a WebSocket connection with a RESTar API while testing, is to use a command line tool like [`wscat`](https://www.npmjs.com/package/wscat), but something like [this Chrome extension](https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo?hl=en) works fine too if you prefer to work with a web browser.

To test things out, let's make a request to the [`RESTar.Shell`](../../Built-in%20resources/RESTar/Shell) terminal resource on our demo service. For this we can use this `wscat` command:

```
wscat -c "wss://restarhelp.mopedo-drtb.com:8282/api/shell" -H "Authorization: apikey restar"
```

For clients that do not support sending headers with WebSocket requests, which includes the Chrome extension mentioned above, use this URI instead:

```
wss://restarhelp.mopedo-drtb.com:8282/api(restar)/shell
```

This will launch the `RESTar.Shell` terminal resource, which will let you navigate around the available resources of the server. For more information about the `RESTar.Shell` resource, see [this documentation](../../Built-in%20resources/RESTar/Shell).

## General features of terminal resources

Terminal resources are small, encapsulated command-line applications, that are instantiated for each request that target them. Each such instance can run independently from other instances. Each connected WebSocket has exaxly one terminal resource assigned to it at all times. RESTar will instantiate terminal resources and assign WebSockets to them – a terminal resource can never assign itself to some WebSocket. When a terminal is done with a given WebSocket connection, it must redirect it to a different terminal, for example [`RESTar.Shell`](../../Built-in%20resources/RESTar/Shell). The Shell is the only terminal resource that can close WebSocket connections. The client can always close the terminal by either using a [global command](#global-commands) or by simply closing the WebSocket connection from their end.

## WebSocket headers

Each WebSocket connected to RESTar has a set of headers, that are copied from the WebSocket upgrade request. In the case of the [`RESTar.Shell`](../../Built-in%20resources/RESTar/Shell) resource resource, these are also used in all subsequent requests from that resource. We can read or modify the headers of the WebSocket by using the [`#INFO` global command](#global-commands).

## Terminal resource properties

Each terminal resource declares a set of instance properties that define its state. A common use case for these properties is to define settings that determine the behavior of the terminal resource. Just like with properties of [entity resources](../../Resource%20kinds#entity-resources), terminal resource properties can be read-only. Properties of terminal resources should be documented along with the terminal resource.

There are two ways to set the values of a terminal resource's properties.

1. By including an assignment as a condition in the initial `GET` request to the terminal resource.
2. By using the [`#TERMINAL` global command](#global-commands) with a JSON object as argument.

The example below will demonstrate both these methods.

### Example

Let's look at the properties of the [`RESTar.Shell`](../../Built-in%20resources/RESTar/Shell) resource:

Property name    | Type      | Description
---------------- | --------- | ---------------------------------------------------------------------------------------------------------
Query            | `string`  | Determines the current location of the shell, and the URI for subsequent requests
Unsafe           | `boolean` | Is the shell currently in unsafe mode? (see the [`unsafe` meta-condition](../URI/Meta-conditions#unsafe))
WriteHeaders     | `boolean` | Should the shell include headers when writing output?
AutoOptions      | `boolean` | Should the shell automatically send an `OPTIONS` command after each successful navigation?
AutoGet          | `boolean` | Should the shell automatically send an `GET` command after each successful navigation?
StreamBufferSize | `integer` | The buffer size (message size) to use with [WebSocket streaming](#streaming)

Each instance of this terminal resource will contain its own set of values for these properties. They act as the settings of the `Shell` instance.

We can instantiate the `Shell` resource by making a WebSocket upgrade request with `/shell` as [URI](../URI), and we can optionally include assignments to the terminal's properties by adding [conditions](../URI/Conditions) to the URI. To launch a `Shell` instance with `AutoGet` and `WriteHeaders` both set to `true`, for example, we can use this URI with the WebSocket upgrade request:

```
/shell/autoget=true&writeheaders=true
```

We can also use the [`#TERMINAL` global command](#global-commands) to set the properties of the current terminal once it's launched. As argument we use a JSON object describing the changes to make. To set `AutoGet` and `WriteHeaders` to `true` for a running `Shell` instance, we can run the following global command:

```
> #TERMINAL {"AutoGet": true, "WriteHeaders": true}
< Terminal updated
< {
  "Query": "/console",
  "Unsafe": false,
  "WriteHeaders": true,
  "AutoOptions": false,
  "AutoGet": true,
  "StreamBufferSize": 16000000
}
```

For more information on global commands, see the next section.

## Global commands

Global commands are text commands available in all terminal resources, that lets the client perform high-level operations such as setting terminal properties, switching terminals and get metadata about the WebSocket connection.

### `#TERMINAL`

Returns the properties of the current terminal. An optional JSON object can be used as argument to update the properties of the terminal. See [this section](#example) for an example.

### `#INFO`

Returns an object describing the current WebSocket connection. An optional JSON object can be used as argument to update the contents of the object. The returned object has the following properties:

Property name   | Type                 | Default value           | Description
--------------- | -------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------
Host            | `string` (read-only) | `""`                    | The host of the WebSocket connection
WebSocketId     | `string` (read-only) | `""`                    | The unique ID of the WebSocket connection
IsSSLEncrypted  | `boolean`(read-only) | `false`                 | Is the WebSocket connection secure?
ClientIP        | `string` (read-only) | `"0.0.0.0"`             | The IP of the connected client
ConnectedAt     | `string` (read-only) | `"0001-01-01 00:00:00"` | The date and time when the connection was established
CurrentTerminal | `string` (read-only) | `""`                    | The type name of the current terminal resource attached to this WebSocket
CustomHeaders   | `object`             | `{}`                    | The custom headers for this WebSocket. Other headers, such as [`Authorization`](../Headers#authorization), cannot be viewed or modified here

The content of `CustomHeaders` can be changed. To add a header `X-MyHeader` with value `"MyValue"`, we can use the following global command:

```
> #INFO {"CustomHeaders": {"X-MyHeader": "MyValue"}}
< Profile updated
< {
  "Host": "restarhelp.mopedo-drtb.com:8282",
  "WebSocketId": "ARAABgAAARJ",
  "IsSSLEncrypted": true,
  "ClientIP": "46.59.24.69",
  "ConnectedAt": "2018-06-18 11:35:40",
  "CurrentTerminal": "RESTar.Shell",
  "CustomHeaders": {
    "Max-Forwards": "10",
    "X-Original-URL": "/api/",
    "X-Forwarded-For": "46.59.24.69:60602",
    "X-ARR-SSL": "2048|256|C=US, O=DigiCert Inc, OU=www.digicert.com, CN=RapidSSL RSA CA 2018|CN=*.mopedo-drtb.com",
    "X-ARR-LOG-ID": "a0345b81-bff4-4992-a389-e943ecd7557d",
    "X-MyHeader": "MyValue"
  }
}
```

### `#SHELL`

Running this command redirects the WebSocket to the [`RESTar.Shell`](../../Built-in%20resources/RESTar/Shell) resource.

### `#DISCONNECT`

Running this command closes the WebSocket connection and disposes all attached resources.

## Streaming

WebSocket streaming is a useful feature in RESTar, that allows any terminal resource to send an arbitrarily large dataset over a WebSocket connection. The dataset is split into multiple WebSocket messages, which are made available to the client for download. The [`RESTar.Shell`](../../Built-in%20resources/RESTar/Shell) resource, for example, uses streaming whenever the response body is larger than 16 megabytes.

The streaming consists of three steps:

1. A [stream manifest](#stream-manifest) is generated for the response body, and is sent back to the client.
2. The client triggers the download of one or more messages, which are sent from the server to the client as binary data messages.
3. When the last message has been sent, or the process is cancelled by the client, the dataset is disposed and streaming is concluded.

While a response is streaming to a WebSocket client, all other activity is suspended to and from the terminal resource. When the streaming is concluded, messages from the terminal that was sent during the streaming are sent to the client.

### Stream manifest

The stream manifest is represented as a JSON object that describes the process of streaming a response from the server to the client, and the current state within that process. It has the following format:

Property name     | Type               | Description
----------------- | ------------------ | ----------------------------------------------------------------------------------
TotalLength       | `integer`          | The total length of the streaming response body in bytes
BytesRemaining    | `integer`          | The number of bytes remaining to stream
BytesStreamed     | `integer`          | The nuymber of bytes already streamed
NrOfMessages      | `integer`          | The number of messages in the streaming job
MessagesRemaining | `integer`          | The number of messages left to stream
MessagesStreamed  | `integer`          | The nymber of messages already streamed
ContentType       | `string`           | The MIME type string of the content type that the response body is encoded in
EntityType        | `string`           | The name of the type of the entities contained in the response body
EntityCount       | `integer`          | The number of entities contained in the response body
Messages          | array of `Message` | The messages of the streaming job
Commands          | array of `Command` | The available commands that can be used by the client to control the streaming job

When streaming is initiated, the stream manifest is automatically sent back to the client. The client can then control the streaming process using the commands contained in the `Commands` array of the stream manifest.

#### `Message`

Property name | Type      | Description
------------- | --------- | -----------------------------------------------------------------------------
StartIndex    | `integer` | The start index of this message, as a location within the total response body
Length        | `integer` | The length of the message
IsSent        | `boolean` | Has this message been sent?

#### `Command`

Property name | Type     | Description
------------- | -------- | ---------------------------------
Command       | `string` | The text command
Description   | `string` | A description of the text command

#### Example

For this example, let's stream the content of the `Superhero` resource available the [demo service](../Demo%20service). For the purpose of the demo, let's use a small buffer size of 8 KB. First, we connect, set the `StreamBufferSize` property of `Shell` and use the `STREAM` text command to create a stream manifest.

> For more information on how to use the `RESTar.Shell` resource, see [this documentation](../Built-in%20resources/RESTar/Shell)

```
erik$ wscat -H "Authorization: apikey restar" -c "https://restarhelp.mopedo-drtb.com:8282/api/"
connected (press CTRL+C to quit)
< ### Entering the RESTar WebSocket shell... ###
< ### Type a command to continue (e.g. HELP) ###
> var StreamBufferSize = 8000
< {
  "Query": "",
  "Unsafe": false,
  "WriteHeaders": false,
  "AutoOptions": false,
  "AutoGet": false,
  "StreamBufferSize": 8000
}
> /superhero
< ? /superhero
> STREAM
< {
  "TotalLength": 35116,
  "BytesRemaining": 35116,
  "BytesStreamed": 0,
  "NrOfMessages": 5,
  "MessagesRemaining": 5,
  "MessagesStreamed": 0,
  "ContentType": "application/json; charset=utf-8",
  "EntityType": "RESTarTutorial.Superhero",
  "EntityCount": 167,
  "Messages": [
    {
      "StartIndex": 0,
      "Length": 8000,
      "IsSent": false
    },
    {
      "StartIndex": 8000,
      "Length": 8000,
      "IsSent": false
    },
    {
      "StartIndex": 16000,
      "Length": 8000,
      "IsSent": false
    },
    {
      "StartIndex": 24000,
      "Length": 8000,
      "IsSent": false
    },
    {
      "StartIndex": 32000,
      "Length": 3116,
      "IsSent": false
    }
  ],
  "Commands": [
    {
      "Command": "GET",
      "Description": "Streams all messages"
    },
    {
      "Command": "NEXT",
      "Description": "Streams the next message"
    },
    {
      "Command": "NEXT <integer>",
      "Description": "Streams the next <n> messages where <n> is an integer"
    },
    {
      "Command": "MANIFEST",
      "Description": "Prints the manifest"
    },
    {
      "Command": "CLOSE",
      "Description": "Closes the stream and returns to the previous terminal resource"
    }
  ]
}
```

As we can see, the current stream job has five messages, and a total length of 35116 bytes. We can also see that five commands – `GET`, `NEXT`, `NEXT <integer>`, `MANIFEST` and `CLOSE` – are available from here. Let's get the first message.

```
> NEXT
< [
  {
    "Name": "Kana (Earth-One)",
    "HasSecretIdentity": true,
    "Gender": "Male",
    "YearIntroduced": 1981,
    "InsertedAt": "2018-02-18T15:16:26.6335445Z",
    "ObjectNo": 227
  },
  {
    "Name": "Talon (Earth-3)",
    "HasSecretIdentity": true,
    "Gender": "Male",
    "YearIntroduced": 2006,
    "InsertedAt": "2018-02-18T15:16:26.6335445Z",
    "ObjectNo": 225
  },
  {
    "Name": "Bandage People",
    "HasSecretIdentity": true,
    "Gender": "Other",
    "YearIntroduced": 1993,
    "InsertedAt": "2018-02-18T15:16:26.6335445Z",
    "ObjectNo": 204
  }, ...
```

> The response above is abbreviated.

When we request a message to be streamed, the stream manifest is updated accordingly. We can always get the current state of the streaming job by reprinting the manifest using the `MANIFEST` command.
