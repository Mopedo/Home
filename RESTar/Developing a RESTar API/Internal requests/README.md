# Internal requests

A RESTar REST API is most commonly consumed by a REST client, that is – an application that speaks HTTP and JSON. Sometimes, however, it's useful to send internal requests from other parts of your Starcounter application, and interact with your entity resources without having to make unnecessary HTTP requests with string parsing and JSON serialization. If all RESTar entity resources were Starcounter database tables, this would not be a problem – since we could just interact with them directly using `Db.Transact` and `Db.SQL`. But since RESTar can have a wide variety of different resources, a unified interface for querying and manipulating them is needed. For this, we use the generic `RESTar.Request<T>` class where `T` is the entity resource type we want to interact with.

`Request<T>` instances do not work with terminal types.

Internal requests have the same [main components](../../Consuming%20a%20RESTar%20API/Request%20overview) as HTTP requests, but are much faster since they bypass request parsing, authentication and JSON serialization. They follow the same philosophy of RESTful web services in general – but without the HTTP layer. These are the public members of the `Request<T>` class:

```csharp
class Request<T> where T : class
{
    // The conditions to include in the request
    Condition<T>[] Conditions { get; set; }

    // The meta-conditions to include in the request
    MetaConditions MetaConditions { get; }

    // The body to include in the request. Set as .NET object, for example an anonymous type.
    object Body { set; }

    // The headers to include in the request
    Headers RequestHeaders { get; set; }

    // Gets all entities in the resource for which the condition(s) hold.
    IEnumerable<T> GET();

    // Makes a GET request and serializes the output to an Excel workbook file. Returns
    // a tuple with the excel file as Stream and the number of non-header rows in the
    // excel workbook.
    (Stream excel, long nrOfRows) GETExcel();

    // Returns true if and only if there is at least one entity in the resource for
    // which the condition(s) hold.
    bool ANY();

    // Inserts an entity into the resource
    int POST(Func<T> inserter);

    // Inserts a collection of entities into the resource
    int POST(Func<IEnumerable<T>> inserter);

    // The number of entities affected
    int PATCH(Func<T, T> updater);

    // The number of entities affected
    int PATCH(Func<IEnumerable<T>, IEnumerable<T>> updater);

    // Inserts an entity into the resource if the conditions do not match any existing
    // entities
    int PUT(Func<T> inserter);

    // Inserts an entity into the resource if the conditions do not match any single
    // existing entity. Otherwise updates the matched entity. If many entities are matched,
    // throws an RESTar.Results.Error.BadRequest.AmbiguousMatch exception.
    int PUT(Func<T> inserter, Func<T, T> updater);

    // Deletes the selected entity or entities. To enable deletion of multiple entities,
    // set the unsafe parameter to true.
    int DELETE(bool @unsafe = false);

    // Returns the number of entities in the resource for which the condition(s) hold.
    long COUNT();

    // Uses the given conditions, and returns a reference to the request.
    Request<T> WithConditions(string key, Operators op, object value);

    // Uses the given conditions, and returns a reference to the request.
    Request<T> WithConditions(params (string key, Operators op, object value)[] conditions);

    // Uses the given conditions, and returns a reference to the request.
    Request<T> WithConditions(params Condition<T>[] conditions);

    // Uses the given conditions, and returns a reference to the request.
    Request<T> WithConditions(IEnumerable<Condition<T>> conditions);
}
```

## Internal requests best practices

For Starcounter database resources, RESTar will automatically execute the provided delegates inside transaction scopes, so there is no need to include transactions in `inserter` and `updater` lambdas. Another way to make internal REST requests is by using the `Starcounter.Self` class, but these are significantly slower, require authentication (if `requireApiKey` is set to `true` in the call to `RESTarConfig.Init()`), and are not as flexible in terms of type safety and error handling.

Performance-wise, it's recommended to reuse `Request<T>` objects whenever possible. When doing repetitive requests internally, it's best to keep a static `Request<T>` object, and just replace the conditions between usages. RESTar provides a namespace `RESTar.Linq`, with a static class `Conditions` which contains useful methods for working with conditions of internal requests.

`Request<T>` objects can be very fast if used properly, especially for Starcounter database resources. When changes are made to their conditions, a Starcounter SQL query will be generated and cached within the `Request<T>` object, which means that consecutive SQL queries for the same `Request<T>` object are very fast. `Request<T>` objects are frequently used internally within RESTar.

## Examples

```csharp
using RESTar;
using static RESTar.Operators;

var request = new Request<MyResource>();

// Get all entities from a resource MyResource:

IEnumerable<MyResource> entities = request.GET();

// We can filter the selected entitites by including conditions:

request.Conditions = new[] { new Condition<MyResource>("Member", EQUALS, "some value") };
entities = request.GET();

// We can also set request conditions like this:

entities = request.WithConditions("Member", NOT_EQUALS, "some other value").GET();

// … or set multiple conditions at once using C#7 ValueTuple syntax:

entities = request.WithConditions(
    ("Member1", EQUALS, "some value"),
    ("Member2", NOT_EQUALS, "some other value")
).GET();

// To insert a new entity into 'MyResource', we provide an inserter, that is – a
// Func<T>. POST returns the number of entitites successfully inserted.

request = new Request<MyResource>();
int nrInserted = request.POST(inserter: () => new MyResource());

// There is also an overload method for POST that allows insertion of multiple
// entities via a Func<IEnumerable<T>>:

nrInserted = request.POST
(
    inserter: () => new[]
    {
        new MyResource(),
        new MyResource(),
        new MyResource()
    }
);

// To update entitites, we can use PATCH, which takes an updater – a
// Func<IEnumerable<T>, IEnumerable<T>>. To update all 'MyResource' entities, do:

int nrUpdated = request.PATCH
(
    updater: matches => entities.Select(entity =>
    {
        entity.SomeMember = "SomeValue";
        return entity;
    })
);


// To delete entitites, simply send a DELETE request selecting the entities to
// delete:

request.WithConditions(
    (nameof(MyResource.MyMember), NOT_EQUALS, 200),
    (nameof(MyResource.MyId), GREATER_THAN, 41)
).DELETE(@unsafe: true);

// PUT requests are used to match against an existing entity, and update that entity
// if it exists, or otherwise insert a new entity. Since it will either insert or
// update an entitiy, we need to provide an inserter as well as an updater:

var nrInsertedOrUpdated = request
    .WithConditions(nameof(MyResource.MyId), EQUALS, 42)
    .PUT(
        inserter: () => new MyResource
        {
            MyId = 42,
            MyMember = "Some value"
        },
        updater: existing =>
        {
            existing.MyId = 42;
            existing.MyMember = "Some value";
            return existing;
        }
    );
```
