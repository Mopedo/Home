# Additional operations

RESTar has built in mechanisms to handle validation of resource entities and resource-specific authorization, available to the developer by having the resource type implement the `IValidatable` and `IAuthenticatable<T>` interfaces respectively.

## Entity resource validation using `IValidatable`

The `IValidatable` interface has one method, `IsValid()`, that RESTar calls for all resources implementing `IValidatable` before running operations `Insert` and `Update`. If the entity resource has some validation logic that needs to be run on all entities before insertion or updating – `IValidatable` provides a simple way to handle invalid entities and show proper error messages to the client.

Unlike the [operations interfaces](../#operations-and-operations-interfaces) and `IAuthenticatable<T>` below, `IsValid()` is not run from a static context, so references can be made to instance members.

### Example

```csharp
[RESTar, Database]
public class Person : IValidatable
{
    public string Name;
    public DateTime DateOfBirth;

    public bool IsValid(out string invalidReason)
    {
        if (DateOfBirth > DateTime.Now)
        {
            invalidReason = "Date of birth must be in the past";
            return false;
        }
        invalidReason = null;
        return true;
    }
}
```

## Resource-specific authentication using `IAuthenticatable<T>`

Sometimes it's useful to have a separate means of authentication and authorization for a given resource. RESTar API keys are appropriate for controlling access to the REST API and different resources, but should not be used for more specific authentication and authorization - for example handling user accounts that control access to some resource. `IAuthenticatable<T>` is a simple interface that enables the developer to define authentication and authorization logic that is executed whenever an external REST request is made to a resource.

### Example

```csharp
[RESTar, Database]
public class Person : IAuthenticatable<Person>
{
    public string Name;
    public DateTime DateOfBirth;

    public AuthResults Authenticate(IRequest<Person> request)
    {
        var account = request.Headers["X-MyAccountNameHeader"];
        var password = request.Headers["X-MyPasswordHeader"];
        bool success = // Insert logic for authentication and authorization here
        return new AuthResults(success, "Invalid account name or password");
    }
}
```

The best way to pass authentication information to a resource is by including it in custom headers, that are then read in the `Authenticate()` method. These custom headers are never logged by RESTar.
