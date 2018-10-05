# Examples

## Regular Starcounter database resource

This entity resource is a Starcounter database class, and has all its operations defined by RESTar. All we need to do to register it as a resource is to decorate it with the `RESTarAttribute` attribute.

```csharp
[Database, RESTar]
public class MyStarcounterResource
{
    public string MyString { get; set; }
    public int MyInteger { get; set; }
    public DateTime MyDateTime { get; set; }
    public MyStarcounterResource MyOtherStarcounterResource { get; set; }
}
```

Then we can make request like these:

```
GET /mystarcounterresource/mystring=SomeValue

POST /mystarcounterresource
Request body: {
    "MyString": "SomeValue",
    "MyInteger": 100,
    "MyDateTime": "2018-05-01T12:00:00.0000000"
    "MyOtherStarcounterResource": {
        "MyString": "SomeOtherValue",
        "MyInteger": -100,
        "MyDateTime": "2018-05-02T12:00:00.0000000"
    }
}

DELETE /mystarcounterresource//unsafe=true
```

## Custom entity resource

This entity resource is not a Starcounter database class, or more generally – it's not decorated by any [resource provider attribute](../Resource%20providers). This means that we have to define the operations required by the enabled methods using the [operations interfaces](../#defining-entity-resource-operations). For this example, let's consider an entity resource that works as an interface for `MyStarcounterResource`.

See [working with requests and conditions](../Working%20with%20requests%20and%20conditions) for more about how to design the individual operations.

```csharp
[RESTar]
public class MyEntityResource : ISelector<MyEntityResource>, IInserter<MyEntityResource>,
    IUpdater<MyEntityResource>, IDeleter<MyEntityResource>
{
    public string TheString { get; set; }
    public int TheInteger { get; set; }
    public DateTime TheDateTime { get; set; }
    public MyEntityResource TheOtherEntityResource { get; set; }

    /// <summary>
    /// Private properties are not includeded in output and cannot be set in input.
    /// This property is only used internally to determine DB object identity.
    /// </summary>
    private ulong? ObjectNo { get; set; }

    private static MyEntityResource FromDbObject(MyStarcounterResource dbObject)
    {
        if (dbObject == null) return null;
        return new MyEntityResource
        {
            TheString = dbObject.MyString,
            TheInteger = dbObject.MyInteger,
            TheDateTime = dbObject.MyDateTime,
            TheOtherEntityResource = FromDbObject(dbObject.MyOtherStarcounterResource),
            ObjectNo = dbObject.GetObjectNo()
        };
    }

    private static MyStarcounterResource ToDbObject(MyEntityResource _object)
    {
        if (_object == null) return null;
        var dbObject = _object.ObjectNo is ulong objectNo
            ? Db.FromId<MyStarcounterResource>(objectNo)
            : new MyStarcounterResource();
        dbObject.MyString = _object.TheString;
        dbObject.MyInteger = _object.TheInteger;
        dbObject.MyDateTime = _object.TheDateTime;
        dbObject.MyOtherStarcounterResource = ToDbObject(_object.TheOtherEntityResource);
        return dbObject;
    }

    public IEnumerable<MyEntityResource> Select(IRequest<MyEntityResource> request) => Db
        .SQL<MyStarcounterResource>($"SELECT t FROM {typeof(MyStarcounterResource).FullName} t")
        .Select(FromDbObject)
        .Where(request.Conditions);

    public int Insert(IRequest<MyEntityResource> request) => Db.Transact(() => request
        .GetEntities()
        .Select(ToDbObject)
        .Count());

    public int Update(IRequest<MyEntityResource> request) => Db.Transact(() => request
        .GetEntities()
        .Select(ToDbObject)
        .Count());

    public int Delete(IRequest<MyEntityResource> request) => Db.Transact(() =>
    {
        var i = 0;
        foreach (var item in request.GetEntities())
        {
            item.Delete();
            i += 1;
        }
        return i;
    });
}
```
