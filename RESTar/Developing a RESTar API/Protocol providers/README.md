# Protocol providers

A protocol provider is an add-on for RESTar that lets protocols other than the built-in protocol be used for defining the formats of API requests and responses. The _built-in protocol_ is what is described in the [Consuming a RESTar API](../../Consuming%20a%20RESTar%20API/Introduction) section of the documentation. Using a custom protocol provider, however, a developer could decide to use a completely different set of URI conventions or response formats, but still use most of the inner workings of RESTar for declaring, finding, querying and manipulating resources.

To create a protocol provider, make a new .NET class and have it implement the `RESTar.IProtocolProvider` interface. It has the following definition:

```csharp
/// <summary>
/// Interface for RESTar protocol providers. Protocol providers provide the logic for
/// parsing requests according to some protocol.
/// </summary>
public interface IProtocolProvider
{
    /// <summary>
    /// The name of the protocol
    /// </summary>
    string ProtocolName { get; }

    /// <summary>
    /// The identifier is used in request URIs to indicate the protocol to use. If the ProtocolIdentifer
    /// is 'OData', for example, and RESTar runs locally, on port 8282 and with root URI "/rest" requests
    /// can trigger the OData protocol by "127.0.0.1:8282/rest-odata",
    /// </summary>
    string ProtocolIdentifier { get; }

    /// <summary>
    /// Should the protocol provider allow external content type providers, or only the ones specified in the
    /// GetContentTypeProviders method?
    /// </summary>
    bool AllowExternalContentProviders { get; }

    /// <summary>
    /// Gets the content type providers associated with this protocol provider. If this is the exclusive list
    /// of content type providers to use with this protocol, set the AllowExternalContentProviders property to false.
    /// </summary>
    /// <returns></returns>
    IEnumerable<IContentTypeProvider> GetContentTypeProviders();

    /// <summary>
    /// Reads a query string, which is everyting after the root URI in the full request URI, parses
    /// its content according to some protocol and populates the URI object.
    /// </summary>
    void ParseQuery(string query, URI uri, TCPConnection connection);

    /// <summary>
    /// If headers are used to check protocol versions, for example, this method allows the
    /// protocolprovider to throw an exception and abort a request if the request is not
    /// in compliance with the protocol.
    /// </summary>
    void CheckCompliance(Context context);

    /// <summary>
    /// The protocol needs to be able to generate a relative URI string from an IUriParameters instance.
    /// Note that only components added to a URI in ParseQuery can be present in the IUriParameters instance.
    /// </summary>
    string MakeRelativeUri(IUriParameters parameters);

    /// <summary>
    /// Takes a result and generates an IFinalizedResult entity from it, that can be returned
    /// to the network component.
    /// </summary>
    IFinalizedResult FinalizeResult(IResult result, IContentTypeProvider contentTypeProvider);
}
```

To use a custom `IProtocolProvider` instance in a RESTar application, include it in the `protocolProviders` parameter of the call to [`RESTarConfig.Init()`](../RESTarConfig.Init). See also: [Content type providers](../Content%20type%20providers).

For a concrete example, see the [RESTar.OData protocol provider](https://github.com/Mopedo/RESTar.OData).
