# Content type providers

A content type provider defines serialization and deserialization operations for a **content type**. Content types are data formats that can be used in RESTar input and output, and using content type providers – we can add additional content types to a RESTar application.

Content type providers bind logic to a [MIME type](https://en.wikipedia.org/wiki/Media_type), which is defined as a string, for example `application/json`. When receiving requests, RESTar will pick the appropriate content type provider to use when deserializing input data from the content of the [`Content-Type`](../../Consuming%20a%20RESTar%20API/Headers#content-type) header, and the appropriate content type provider to use when serializing output data from the content of the [`Accept`](../../Consuming%20a%20RESTar%20API/Headers#accept) header.

## Included content type providers

These three protocol providers are already included with RESTar. You can also list all available protocols and their content providers by making a `GET` request to the `RESTar.Admin.Protocol` resource.

### `RESTar.ContentTypeProviders.JsonContentProvider`

The `JsonContentProvider` is the default JSON content type provider for reading and writing JSON, and handles requests that have the following MIME types defined in their [`Accept`](../../Consuming%20a%20RESTar%20API/Headers#accept) or [`Content-Type`](../../Consuming%20a%20RESTar%20API/Headers#content-type) headers:

```
application/json
application/restar-json
json
text/plain
```

Since custom content type providers can override bindings to MIME types, a special `application/restar-json` is used to preserve a binding, should the client need to use the `JsonContentProvider` while `application/json` is overridden.

There is a public static `JsonContentProvider` instance available at `RESTar.Serialization.Serializers.Json`, that can be used in RESTar applications to serialize, deserialize and populate RESTar JSON.

### `RESTar.ContentTypeProviders.ExcelContentProvider`

The `ExcelContentProvider` is used to read and write Excel files. It has the following MIME type bindings:

```
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
application/restar-excel
excel
```

### `RESTar.ContentTypeProviders.XMLWriter`

The `XMLWriter` can be used to write responses to XML. It can, however – unlike the other two included content type providers – not deserialize entities. It has the following MIME type bindings:

```
application/xml
application/restar-xml
xml
```

## Creating custom content type providers

To create a custom content type provider, implement the `IContentTypeProvider` interface. It has the following definition:

```csharp
/// <summary>
/// Defines the operations ofa content type provider, that is used when
/// finalizing results to a given content type.
/// </summary>
public interface IContentTypeProvider
{
    /// <summary>
    /// The name of the content type, used when listing available content types.
    /// For example, JSON.
    /// </summary>
    string Name { get; }

    /// <summary>
    /// The content type that is handled by this content type provider.
    /// </summary>
    /// <returns></returns>
    ContentType ContentType { get; }

    /// <summary>
    /// The strings that should be registered as match strings for this content type provider. When
    /// these are used as MIME types in request headers, they will map to this content type provider.
    /// Protocol providers can change these in order to make custom mappings to content types.
    /// </summary>
    string[] MatchStrings { get; set; }

    /// <summary>
    /// Can this content type provider read data?
    /// </summary>
    bool CanRead { get; }

    /// <summary>
    /// Can this content type provider write data?
    /// </summary>
    bool CanWrite { get; }

    /// <summary>
    /// Returns the file extension to use with the given content type in content disposition
    /// headers and file attachments. For example ".docx".
    /// </summary>
    string ContentDispositionFileExtension { get; }

    /// <summary>
    /// Serializes the entity to the given Stream. Include the number of entitites serialized in the entityCount
    /// out parameter (should be 0 or 1).
    /// </summary>
    /// <typeparam name="T"></typeparam>
    void SerializeEntity<T>(T entity, Stream stream, IRequest request, out ulong entityCount) where T : class;

    /// <summary>
    /// Serializes the entity collection to the given Stream. Include the number of entities serialized in the entityCount
    /// out parameter.
    /// </summary>
    void SerializeCollection<T>(IEnumerable<T> entities, Stream stream, IRequest request, out ulong entityCount) where T : class;

    /// <summary>
    /// Deserializes the byte array to the given content entity type. Deserialize calls can only be made with
    /// content types included in CanRead.
    /// </summary>
    T DeserializeEntity<T>(byte[] body) where T : class;

    /// <summary>
    /// Deserializes the byte array to the given content entity collection type. Deserialize calls can only be made with
    /// content types included in CanRead.
    /// </summary>
    List<T> DeserializeCollection<T>(byte[] body) where T : class;

    /// <summary>
    /// Populates the byte array to all entities in the given collection. Populate calls can only be made with
    /// content types included in CanRead.
    /// </summary>
    IEnumerable<T> Populate<T>(IEnumerable<T> entities, byte[] body) where T : class;
}
```

To use a custom content type provider, include an instance of it in the [`contentTypeProviders`](../RESTarConfig.Init#contenttypeproviders) parameter in the call to [`RESTarConfig.Init()`](../RESTarConfig.Init).
