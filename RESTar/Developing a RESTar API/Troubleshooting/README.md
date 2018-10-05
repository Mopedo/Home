# Troubleshooting

This article contains some infamous problems that can occur when developing RESTar applications, and how to solve them:

## `SCERR2143`

Example:

```
A locally deployed strong-named assembly was detected. Assembly: DocumentFormat.OpenXml,
Version=2.8.1.0, Culture=neutral, PublicKeyToken=8fb06cb64d019a17\. Consider excluding this
file by adding a "weaver.ignore" file to your project. (ScErrWeaverFailedStrongNameAsm (SCERR2143))
(Double-click here for additional help)
```

### What is this?

This error is almost always related to the application's `weaver.ignore` file. The Starcounter Weaver cannot deal with [strong-named assemblies](https://docs.microsoft.com/en-us/dotnet/framework/app-domains/strong-named-assemblies), abd we therefore need to include them in the application's `weaver.ignore` file.

### Solution

Add the [following assemblies](../weaver.ignore) to the application's `weaver.ignore` file, or create a new text file called `weaver.ignore` in your project output folder with the content from the link.

## `SCERR2147`

Example:

```
The weaver failed to resolve a reference to an assembly. Referenced assembly: DocumentFormat.OpenXml,
Version=2.7.2.0, Culture=neutral, PublicKeyToken=8fb06cb64d019a17\. Probable referrer: ClosedXML.dll
(in C:\Users\Sebastian\source\repos\CatFact\CatFact\bin\Debug). (ScErrWeaverFailedResolveReference (SCERR2147))
(Double-click here for additional help)
```

### What is this?

As far as we have found out, this can be caused by three things:

1. A missing `weaver.ignore` file, or the problematic assembly not being included in it.
2. A missing assembly mapping from the project's `app.config` file.
3. A missing assembly reference or broken NuGet package.

### Solution

1. Try adding the problematic assembly, in this case `DocumentFormat.OpenXml` to the application's `weaver.ignore` file, and make sure that the `weaver.ignore` file is included in the project output.
2. Add an `app.config` mapping for the assembly, mapping the referenced assembly version, in this case `2.7.2.0` to the version of the actual DLL file included in the output folder.
3. If there is no DLL with the given name in the output folder, try reinstalling the NuGet packages and make sure that the assembly is copied to the output folder on build. Then repeat these steps.
