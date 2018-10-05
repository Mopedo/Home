---
permalink: RESTar/Built-in%20resources/RESTar.Admin/Macro/
---

# `Macro`

```json
{
    "Name": "RESTar.Admin.Macro",
    "Kind": "EntityResource",
    "Methods": ["GET", "POST", "PATCH", "PUT", "DELETE", "REPORT", "HEAD"]
}
```

Macros is a powerful feature of RESTar, that enables great flexibility when making REST requests, particularly when the REST client cannot send certain request components due to technical limitations. Macros are syntactic request templates that add pre-defined properties to incoming requests ahead of evaluation. Macros can syntactically insert the following request components ahead of evalution:

- [Resource](#resource)
- [View](#view)
- [Conditions](#conditions)
- [Meta-conditions](#meta-conditions)
- [Headers](#headers)
- [Body](#body)

Macros do not contain a method definition – the method is always kept in all calls to a macro. The same macro can be used with all methods.

## Format

_Properties marked in **bold** are required._

Property name    | Type                          | Description
---------------- | ----------------------------- | --------------------------------------------------------------
**Name**         | `string`                      | The name of the macro. Used in macro calls.
**Uri**          | `string`                      | The URI to use in the resulting request
Body             | `object` or array of `object` | The body to use in the resulting request
Headers          | `object`                      | The headers to use in the resulting request
OverwriteBody    | `boolean`                     | Should the macro overwrite the body of the calling request?
OverwriteHeaders | `boolean`                     | Should the macro overwrite the headers of the calling request?

**Recursive macro calls**

It is possible to design macros that generate requests that in turn call macros – for example using the [`RESTar.Aggregator`](../../RESTar/Aggregator) resource. These recursive requests can sometimes be hard to debug, but RESTar is designed to handle them. Potentially infinite recursive call loops are automatically aborted.

## Resource

All macros have a specified resource that is inserted into the request upon macro call. The calling request will simply specify the macro name in place of the resource specifier, which will result in a call to whatever resource defined in the macro.

**Macro definition**:

```json
{
    "Name": "MyMacro",
    "URI": "/MyApp.Employee"
}
```

**Macro call**:

```
GET https://my-server.com/rest/$mymacro
```

**Rewritten request**:

```
GET https://my-server.com/rest/MyApp.Employee
```

## View

Views that are part of the `Uri` property will be used unless the calling request has some other view defined.

## Conditions

The conditions specified in the macro are concatenated with and placed ahead of whatever conditions are included in the request calling the macro.

**Macro definition**:

```json
{
    "Name": "MyMacro",
    "URI": "/MyApp.Employee/Salary>20000"
}
```

**Macro call**:

```
GET https://my-server.com/rest/$mymacro/division=Sales
```

**Rewritten request**:

```
GET https://my-server.com/rest/MyApp.Employee/Salary>20000&Division=Sales
```

## Meta-conditions

Same as for conditions, the meta-conditions specified in the macro are concatenated with and placed ahead of whatever meta-conditions are included in the request calling the macro.

**Macro definition**:

```json
{
    "Name": "MyMacro",
    "URI": "/MyApp.Employee/Salary>20000/limit=10"
}
```

**Macro call**:

```
GET https://my-server.com/rest/$mymacro//offset=10
```

**Rewritten request**:

```
GET https://my-server.com/rest/MyApp.Employee/Salary>20000/limit=10&offset=10
```

## Body

Macros can, optionally, define a body that is inserted into the request calling the macro. If a body is specified in the macro, it's used in the request calling the macro, unless the calling request already contains a body. If and only if `OverwriteBody` is set to `true`, macro bodies overwrite bodies included in caller requests. Bodies are given as objects directly in the macro object structure.

**Macro definition**:

```json
{
    "Name": "MyMacro",
    "URI": "/MyApp.Customer",
    "Body": {
        "Cuid": "a124",
        "DateOfRegistration": "2003-11-02T00:00:00Z",
        "Name": "Michael Bluth",
        "Segment": "A1"
    }
}
```

**Macro call**:

```
POST https://my-server.com/rest/$mymacro
```

**Rewritten request**:

```
POST https://my-server.com/rest/MyApp.Customer
Body: {
    "Cuid": "a124",
    "DateOfRegistration": "2003-11-02T00:00:00Z",
    "Name": "Michael Bluth",
    "Segment": "A1"
}
```

## Headers

The macro can contain headers that are added to whatever request headers included in the request calling the macro. Headers are given as objects in the macro object structure, with the property name being the header name. Header values are always inserted as strings in the request calling the macro - regardless of data type in the macro. The only header not allowed in macros is the `Authorization` header. All macro requests are expected to contain their own means of authentication. If and only if `OverwriteHeaders` is set to `true`, will macro headers overwrite headers included in caller requests.

**Macro definition**:

```json
{
    "Name": "MyMacro",
    "URI": "/MyApp.Customer",
    "Headers": {
        "Source": "https://someserver.com/mydata.json"
    }
}
```

**Macro call**:

```
POST https://my-server.com/rest/$mymacro
```

**Rewritten request**:

```
POST https://my-server.com/rest/MyApp.Customer
Headers: "Source: https://someserver.com/mydata.json"
```
