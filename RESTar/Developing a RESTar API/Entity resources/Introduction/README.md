# Building entity resources

Entity resources are resources modelled as _sets of entities_, where each entity has a set of properties consisting of a key and a value. By using REST and operations like `GET`, `POST` and `DELETE`, we can manipulate the contents of entity resources and get representations of them, for example in JSON.

## Registering entity resources

Entity resources – like all RESTar resources – are .NET classes, and the entities themselves are, not surprisingly, instances of these classes. There are two ways to register a class as an entity resource in RESTar:

1. By decorating its class declaration with the [`RESTarAttribute`](APIREF) attribute.
2. By declaring a new class that inherits from `RESTar.ResourceWrapper<T>` where `T` is the class to register as entity resource. This class should also be decorated with the `RESTarAttribute` attribute.

### Using the `RESTarAttribute` attribute

The easiest way to make an existing class, for example a Starcounter database class, work as a RESTar resource is to simply decorate it with the `RESTarAttribute` attribute and assign the REST methods we want to make available as parameters to its constructor.

```csharp
[Database, RESTar(Methods.GET, Methods.POST)]
public class Employee
{
    public string Name;
    public int ID;
    public DateTime DateOfEmployment;
}
```

The resource is then registered when the application calls [`RESTarConfig.Init()`]() is called, and made available for REST requests.

### Creating a `ResourceWrapper<T>` subclass

Sometimes, however, we cannot make code changes in the definition of the class we want to use as a resource, or we do not want a dependency from that assembly to RESTar. In those cases, we can register resources by subclassing the abstract generic `ResourceWrapper<T>` class.

```csharp
[RESTar(Methods.GET, Methods.POST)]
public class Employee : ResourceWrapper<HR_EmployeeContact> { }

[Database]
public class HR_EmployeeContact
{
    public string Name;
    public DateTime DateOfEmployment;
    public Department Department;
}
```

Here the `HR_EmployeeContact` class is registered as a RESTar resource. It's the `HR_EmployeeContact` class that will define the members of the resource, for example. The name, namespace and operations of the resource, however, is taken from the wrapper class, in this case `Employee`.

### Defining entity resource operations

RESTar always require operation definitions for the methods provided in the `RESTarAttribute` constructor. These operations are used to, for example, select existing entities in the resource and insert new ones. There are two ways to assign operations to a RESTar resource.

1. By assigning a [resource provider attribute](Resource%20providers) to its resource declaration, and letting the resource provider assign its default operations. This is what we do in the examples above, since the `DatabaseAttribute` attribute is a resource provider attribute in RESTar. When we combine the `DatabaseAttribute` and `RESTarAttribute` in a resource declaration, we assign the default operation implementations for Starcounter database types to the resource.

2. By creating a custom operation implementation by having the .NET class implement one or more [operations interfaces](#operations-and-operations-interfaces). This is how we override the operations defined by a resource provider, or define operations if the resource has no resource provider attribute.

#### Operations and operations interfaces

There are five operations that are used by RESTar when evaluating requests. These should not be confused with the [REST methods](../../Consuming%20a%20RESTar%20API/Methods). RESTar use these operations to implement the semantics of REST methods. When executing `RESTarConfig.Init()`, RESTar will check so that all operations needed for the methods provided in the `RESTarAttribute` constructor are defined. If not, it will throw a runtime exception.

##### `Select`

Used in `GET`, `PATCH`, `PUT` and `DELETE`. `Select` gets a set of entities from a data storage backend that satisfy certain [conditions](../../Consuming%20a%20RESTar%20API/URI/Conditions) provided in the request, and returns them.

```csharp
public interface ISelector<T> : where T : class
{
    IEnumerable<T> Select(IRequest<T> request);
}
```

##### `Insert`

Used in `POST` and `PUT`. Takes a set of entities and inserts them into the data storage backend, and returns the number of entities successfully inserted.

```csharp
public interface IInserter<T> where T : class
{
    int Insert(IRequest<T> request);
}
```

##### `Update`

Used in `PATCH` and `PUT`. Takes a set of entities and updates their corresponding entities in the data storage backend, and returns the number of entities successfully updated.

```csharp
public interface IUpdater<T> where T : class
{
    int Update(IRequest<T> request);
}
```

##### `Delete`

Used in `DELETE`. Takes a set of entities and deletes them from the data storage backend, and returns the number of entities successfully deleted.

```csharp
public interface IDeleter<T> where T : class
{
    int Delete(IRequest<T> request);
}
```

##### `Count`

Used in `REPORT` requests. Selects and counts entities in the storage backend. If no `Count` operation is implemented for a resource, RESTar will simply call `Select` and count the entities in the returned `IEnumerable<T>`. Note: when implementing `Count`, we need to take the [`Distinct`](../../Consuming%20a%20RESTar%20API/URI/Meta-conditions#distinct) meta-condition into account.

```csharp
public interface ICounter<T> where T : class
{
    long Count(IRequest<T> request);
}
```

##### Important

RESTar references the operation definitions from the interface implementations using delegates, and all calls to them are from a **static context** – meaning that the `this` reference technically available from the instance methods defined by the interfaces above will always be `null`. Always treat operations interface method implementations as static methods when defining operations.

```csharp
[RESTar(Methods.GET)]
public class MyResource : ISelector<MyResource>
{
    public string MyString { get; set; }

    public IEnumerable<MyResource> Select(IRequest<MyResource> request)
    {
        this.MyString = "ABC"; // Will generate a NullReferenceException since 'this' is always null
    }
}
```
