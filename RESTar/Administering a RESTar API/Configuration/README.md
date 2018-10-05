---
permalink: RESTar/Administering%20a%20RESTar%20API/Configuration/
---

# Configuration

The RESTar configuration file is an XML text file that is stored somewhere on the computer that runs the RESTar application. It contains **API keys** and allowed **CORS origins** that are used by RESTar to control access to the API. The developer will define where the file is to be stored, and the administrator makes sure that the file contains the correct keys and origins.

If the configuration file path is `C:\Mopedo\Config.xml` for example, we create a new text file `Config.xml`, and place it in the `C:\Mopedo` directory. The configuration file contains three main XML node types:

1. The root `<config>` node
2. [`<ApiKey>`](#apikey), defining an API key for the REST API
3. [`<AllowedOrigin>`](#allowedorigin), defining an allowed CORS origin

## Configuration file example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
    <ApiKey>
        <Key>odKkT1BjlKOyo2uQ</Key>
        <AllowAccess>
            <Resource>RESTar.*</Resource>
            <Resource>Mopedo.*</Resource>
            <Methods>*</Methods>
        </AllowAccess>
    </ApiKey>
    <ApiKey>
        <Key>CX6LdmuNZUV3A63J</Key>
        <AllowAccess>
            <Resource>Mopedo.*</Resource>
            <Methods>GET, PATCH</Methods>
        </AllowAccess>
    </ApiKey>
    <AllowedOrigin>http://mysite.com</AllowedOrigin>
    <AllowedOrigin>https://mysite.com</AllowedOrigin>
</config>
```

## `<ApiKey>`

The `<ApiKey>` node is an XML node type used in RESTar configuration files to assign access rights to an [API key](../API%20keys).

It has four inner node types:

1. [`<Key>`](#key), defining the character string that will be used as an API key
2. [`<AllowAccess>`](#allowaccess), defining a set of resources along with a set of REST methods that this key can use for these resources
3. [`<Resource>`](#resource), used in `<AllowAccess>` nodes to include one or more resources in the access right assignment
4. [`<Methods>`](#methods), used in `<AllowAccess>` nodes to assign a set of REST methods to a set of selected resources

Each `<ApiKey>` node must contain **exacly one** `<Key>` node, and **at least one** `<AllowAccess>` node.

### `<Key>`

The `<Key>` node contains a character string that is used to be used as an API key in the REST API. It has the following syntactical limitations:

1. Must contain at least one ASCII character.
2. Must only contain ASCII characters within the range [33 through 126](https://ascii.cl/).
3. Must not contain parentheses characters, i.e. `'('` or `')'`

### `<AllowAccess>`

Each `<AllowAccess>` assigns additional access rights to an API key. Each `<AllowAccess>` node must contain **at least one** `<Resource>` node, and **exacly one** `<Methods>` node.

The total **access scope**, defined here as a set of method-resource pairs such that the key can be used with the method for the resource, for a key `k` is equal to the set union of all method-resource pairs assigned in the `<AllowAccess>` nodes for `k`. This means that we cannot exclude resources or methods from the scope of `k` by simply adding additional `<AllowAccess>` nodes with smaller sets of resources and/or methods.

### `<Resource>`

A `<Resource>` defines one or more resources that should be included in the scope of a `<AllowAccess>` node. It consists either of the full name of a REST resource, or of a resource namespace followed by a dot and the wildcard character `*`. The wildcard character is used to include multiple resources from a namespace, excluding inner namespaces. If we have the following resources in our REST API...

```
Mopedo.Currency
Mopedo.Bidding.Ad
Mopedo.Bidding.Campaign
```

... the following `<Resource>` node will select both the `Mopedo.Bidding.Ad` and `Mopedo.Bidding.Campaign` resources:

```
<Resource>Mopedo.Bidding.*</Resource>
```

The following node...

```
<Resource>Mopedo.*</Resource>
```

... will select `Mopedo.Currency`, but not any of the resources from the `Mopedo.Bidding` namespace. To include all resources, we can use this set of `<Resource>` nodes:

```
<Resource>Mopedo.Currency</Resource>
<Resource>Mopedo.Bidding.*</Resource>
```

### `<Methods>`

The `<Methods>` node contains all the methods to assign to the set of resources selected by the `<Resource>` nodes of the containing `<AllowAccess>` node. The content of the `<Methods>` node is either a comma-separated list of [REST methods](../../Consuming%20a%20RESTar%20API/Methods), e.g. `GET, POST, DELETE`, or the `*` character, that is equivalent to `GET, POST, PATCH, PUT, DELETE, REPORT, HEAD`.

Note that the `REPORT` and `HEAD` methods are automatically made available if `GET` is made available.

### Examples

```xml
<ApiKey>
    <Key>odKkT1BjlKOyo2uQ</Key>
    <AllowAccess>
        <Resource>RESTar.*</Resource>
        <Resource>RESTar.Dynamic.*</Resource>
        <Resource>Mopedo.*</Resource>
        <Resource>Mopedo.Bidding.*</Resource>
        <Methods>*</Methods>
    </AllowAccess>
</ApiKey>
```

```xml
<ApiKey>
    <Key>CX6LdmuNZUV3A63J</Key>
    <AllowAccess>
        <Resource>RESTar.Echo</Resource>
        <Methods>GET</Methods>
    </AllowAccess>
</ApiKey>
```

```xml
<ApiKey>
    <Key>1Rc5TCSJWmB7Mq7X</Key>
    <AllowAccess>
        <Resource>Mopedo.Database.User</Resource>
        <Methods>GET, PUT</Methods>
    </AllowAccess>
    <AllowAccess>
        <Resource>Mopedo.Database.Device</Resource>
        <Methods>GET</Methods>
    </AllowAccess>
    <AllowAccess>
        <Resource>Mopedo.ClientData.*</Resource>
        <Methods>*</Methods>
    </AllowAccess>
</ApiKey>
```

The last key, `1Rc5TCSJWmB7Mq7X`, can make `GET`, `REPORT`, `HEAD` and `PUT` requests to the `Mopedo.Database.User` resource, `GET`, `REPORT` and `HEAD` requests to `Mopedo.Database.Device` as well as `GET`, `POST`, `PATCH`, `PUT`, `DELETE`, `REPORT` and `HEAD` requests to all the resources in the `Mopedo.ClientData` namespace.

## `<AllowedOrigin>`

`<AllowedOrigin>` nodes are used in RESTar configuration files to whitelist an origin for use with CORS requests. The value is simply the URL of the origin to whitelist. If the RESTar application is set up to allow requests from all CORS origins, whitelisted origins will be ignored.

### Examples

To allow CORS requests from `mysite.com`, which can be accessed using the `HTTP` and `HTTPS` URL schemes, we add the following the the configuration file:

```xml
<AllowedOrigin>http://mysite.com</AllowedOrigin>
<AllowedOrigin>https://mysite.com</AllowedOrigin>
```
