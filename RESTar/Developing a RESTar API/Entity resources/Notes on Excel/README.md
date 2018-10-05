# Notes on Excel

Excel representations of entity resources differ from JSON representations in one important regard – the inability to encode inner entities in-line with other properties. RESTar has various ways of dealing with this limitation. When clients make `GET` requests to entity resources that have inner objects, and ask the server to use Excel as the representation format, RESTar will automatically reduce the inner object using their `ToString()` method, if no other reduce function is supplied in the entity resource definition.

You can specify a custom Excel reduce function for an entity resource property by defining a method in the entity resource's definition and providing the name of that method in the `excelReducer` parameter of the [`RESTarMemberAttribute`](../../RESTarMemberAttribute) constructor for that property.

## Example using `excelReducer`:

```csharp
[Database, RESTar]
public class MyResource
{
    public string AString { get; set; }
    public int AnInt { get; set; }

    [RESTarMember(excelReducer: nameof(AnObjectReducer))]
    public MyOtherResource AnObject { get; set; }

    public string AnObjectReducer()
    {
        return $"Name: {AnObject.Name}, Id: {AnObject.Id}";
    }
}
```

Sample Excel output from `MyResource`:

AString             | AnInt | AnObject
------------------- | ----- | -------------------------------
A fine string value | 42    | Name: Objecty McObject, Id: ABC
