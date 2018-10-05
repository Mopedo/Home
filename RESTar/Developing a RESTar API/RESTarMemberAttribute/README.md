# `RESTarMemberAttribute`

RESTar has built-in member reflection for resource types, which is how it defines the JSON and Excel templates that are used during serialization and deserialization and how it creates bindings between, for example, JSON representations and instances of the actual .NET classes. We can configure the reflected resource properties by decorating their declarations with the `RESTarMemberAttribute` attribute and including options in its constructor. The constructor for `RESTarMemberAttribute` has the following signature:

```csharp
public RESTarMemberAttribute
(
    bool ignore = false,
    string name = null,
    int order = int.MinValue,
    bool hide = false,
    bool hideIfNull = false,
    bool readOnly = false,
    bool skipConditions = false,
    Operators allowedOperators = Operators.All,
    string excelReducer = null,
    bool replaceOnUpdate = false
);
```

## `ignore`

Should this property be completely ignored by RESTar?

## `name`

A new name for this property that is used instead of the declared name in all representations.

## `order`

The order at which this property appears when all properties are enumerated.

## `hide`

Should this property be hidden in serialized output by default? It can still be added using the `add` meta-condition and queried against.

## `hideIfNull`

Should this property be hidden in output if the value is `null`? Only applies to JSON output.

## `readOnly`

Makes this property read-only over the REST API, even if it has a public setter.

## `skipConditions`

Sets the `Skip` property of all conditions matched against this property to `true` by default, skipping all conditions that are made to this property.

## `allowedOperators`

These operators will be allowed in conditions targeting this property.

## `excelReducer`

The name of an optional public `ToString`-like method, declared in the same scope as the property, that reduces the property to an Excel-compatible string.

## `replaceOnUpdate`

Should this object be replaced with a new instance on update, or reused? Applicable for types such as Dictionaries and Lists.

## Non-RESTar attributes that are respected

We can also change how RESTar treats certain properties of resources by using the .NET standard `IgnoreDataMemberAttribute` and `DataMemberAttribute` attributes (located in the `System.Runtime.Serialization` namespace). Using these attributes, we can, for example, rename properties and ignore properties when serializing and deserializing from JSON (and Excel). For more information, see the [Microsoft documentation](https://msdn.microsoft.com/en-us/library/system.runtime.serialization(v=vs.110).aspx).

The JSON.net `JsonPropertyAttribute` is also respected.
