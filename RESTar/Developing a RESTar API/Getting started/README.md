# Getting started

RESTar is distributed as a [.NET package on NuGet](https://www.nuget.org/packages/RESTar), and an easy way to install it in an active Visual Studio project is by entering the following into the NuGet Package Manager console:

```
Install-Package RESTar
```

If you're running Starcounter 2.4 or later, there is a version of RESTar for that as well. Use the following:

```
Install-Package RESTar_2.4
```

The installation will also download some other packages that are required for RESTar to work. RESTar itself, however, is contained within a single assembly, `RESTar.dll`.

When RESTar is installed, add a call to the [`RESTar.RESTarConfig.Init()`](RESTarConfig.Init) method somewhere in your application logic, preferably so it runs once every time the app starts. This method will set up the RESTar HTTP handlers, and collect all your [registered REST resources](#registering-resources). Below is a simple RESTar application, picked from the [RESTar Tutorial Repository](https://github.com/Mopedo/RESTar.Tutorial):

```csharp
namespace RESTarTutorial
{
    using RESTar;
    public class TutorialApp
    {
        public static void Main()
        {
            RESTarConfig.Init(port: 8282, uri: "/api");
            // The 'port' argument sets the HTTP port on which to register the REST handlers
            // The 'uri' argument sets the root uri of the REST API
        }
    }
}
```

See [this page](RESTarConfig.Init) for details on what can be specified in the call to `RESTarConfig.Init()`.
