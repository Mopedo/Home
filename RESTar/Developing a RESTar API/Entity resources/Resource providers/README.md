# Resource providers

As we have seen in these articles, the concept of an _entity resource_ is general enough to encompass all kinds of data structures, as long as they can represent themselves as sets of entities. A MySQL database table, for example, can be used as a RESTar entity resource, and interacted with using the same kinds of requests as native Starcounter tables. All we need to do to make that work is to register a resource like this:

```csharp
[RESTar(Methods.GET, Methods.POST, Methods.PATCH, Methods.PUT, Methods.DELETE)]
public class EmployeeMySQL : ISelector<EmployeeMySQL>, IInserter<EmployeeMySQL>,
    IUpdater<EmployeeMySQL>, IDeleter<EmployeeMySQL>
{
    public string ID { get; set; }
    public string Name { get; set; }
    public DateTime DateOfEmployment { get; set; }

    public IEnumerable<EmployeeMySQL> Select(IRequest<EmployeeMySQL> request)
    {
        // Get and return items from the MySQL database, using the conditions
        // contained in the request. Bind rows to new EmployeeMySQL objects and
        // columns to the public properties.
    }

    public int Insert(IRequest<EmployeeMySQL> request)
    {
        // Insert the entities in the MySQL database, then return the number
        // of entities successfully inserted
    }

    // … and so on for the other operations
}
```

This works well, but it puts a lot of responsibility on the developer designing the entity resource. A better way to create a RESTar integration with some data technology, for example MySQL, is to create a **resource provider** for it, that defines the default operations for interaction with MySQL databases. This way, we can have a simple and organized way for developers to add MySQL database tables to their RESTar applications, without them defining `Select`, `Insert`, `Update` and `Delete` methods for each of these resources. Instead, developers can declare MySQL resources like this:

```csharp
[MySQL, RESTar(Methods.GET, Methods.POST, Methods.PATCH, Methods.PUT, Methods.DELETE)]
public class MySQLTable
{
    public string ID { get; set; }
    public string Name { get; set; }
    public DateTime DateOfEmployment { get; set; }
}
```

All resource providers have a **resource provider attribute** that is used to label the class definitions that should be claimed by the resource provider. In the example above, our MySQL resource provider has a `MySQLAttribute` attribute type that is used in MySQL resource declarations. This syntax should be familiar to you if you have seen how [Starcounter resources are registered](../#using-the-restarattribute-attribute). The `Starcounter.DatabaseAttribute` is, in fact, a RESTar resource provider attribute, that binds a resource to the default operations for Starcounter database classes.

By default, RESTar contains the following resource providers:

- A **Starcounter resource provider**, that claims all entity resources that are decorated with the `Starcounter.DatabaseAttribute` and no other resource provider attribute.
- A **DDictionary resource provider** for entity resources that are dynamic Starcounter tables declared using [Dynamit](https://github.com/Mopedo/Dynamit), and are not decorated with any resource provider attributes other than `Starcounter.DatabaseAttribute`.

So classes that are not Starcounter database tables need to either [define their own operations](../#defining-entity-resource-operations), or be bound to some custom resource provider. **See also**: [RESTar.SQLite – an SQLite resource provider](https://github.com/Mopedo/RESTar.SQLite)

## Building a custom resource provider

To implement a custom resource provider, create a new class that inherits from `RESTar.ResourceProvider<T>` where `T` is an optional shared base class for all resource types provided by the resource provider. If there is no such base class, simply make your class `ResourceProvider<object>`. Then define a class inheriting from `System.Attribute`, to use as resource provider attribute.

When executing `RESTarConfig.Init()`, RESTar will find all entity resource declarations that are decorated with the resource provider attribute, and use your resource provider to register operations for them. You can also specify a `DatabaseIndexer` sub-class to use when indexing your resources (if indexing is applicable to the technology you are building support for). To use a resource provider in a RESTar application, include an instance of it in the call to `RESTarConfig.Init()`.

See the open-source [RESTar.SQLite resource provider](https://github.com/Mopedo/RESTar.SQLite) for an example.

Feel free to contact develop@mopedo.com if you need help creating a resource provider for some technology.
