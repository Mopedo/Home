---
permalink: Mopedo%20DSP/Developer%20guides/API%20reference/API%20reference%20overview/
---

# API reference overview

In this section of the documentation, we detail the web resources that are available through the REST API of Mopedo DSP applications. It's by modifying the contents of these resources that we can instruct the DSP application how to make programmatic purchases, as well as handling the user data that is used in these bidding decisions. The web resources of the Mopedo DSP can be ordered into six main classes. You can explore the contents of these resource classes using the menu to the left.

## 1\. Bidding resources

> These are used to read and manipulate the DSP's bidding behavior, for example the [`Campaign`](../Mopedo.Bidding/Campaign) and [`Ad`](../Mopedo.Bidding/Ad) entities that are used when responding to [bid requests](../Mopedo.Database/BidRequest). Contained in the `Mopedo.Bidding` namespace.

## 2\. Database resources

> The database namespace include the `User` and `Device` resources, which are updated as traffic is received from the Mopedo backend or when [user matching](../../Feature%20guides/User%20matching). Contained in the `Mopedo.Database` namespace.

## 3\. Client data resources

> The four main database resource types, [`User`](../Mopedo.Database/User), [`Device`](../Mopedo.Database/Device), [`Site`](../Mopedo.Database/Site) and [`App`](../Mopedo.Database/App) are extendable – i.e. can be associated with arbitrary data, labels and/or segments, by using their respective extension resource. Contained in the `Mopedo.ClientData` namespace.

## 4\. Reporting resources

> Create detailed reports of the DSPs current or historical behavior. Contained in the `Mopedo.Reporting` namespace.

## 5\. Archive resources

> Set up [routines](../Mopedo.Archive/Routines) that automatically move entities from in-memory resources to disk-based storage, freeing up system resources on your DSP.

## 6\. Debug resources

> Debug resources help DSP administrators when troubleshooting and debugging DSP instances

# Other resources

Apart from the four main resource classes, there are also these additional support resources:

## [Currency](../Price)

> The currencies available in the DSP

## [Settings](../Settings)

> The current settings of the DSP application

## [ErrorLog](../ErrorLog)

> A log resource that contains information about errors encountered by the DSP

## [Operator](../Operator)

> The operators available for use in [bid rules](../Mopedo.Bidding/Campaign/#bidrule)

## [Datetime](../Datetime)

> Information about how dates and times are encoded in the DSP's web resources

## [Price](../Price)

> Information about how prices are encoded in the DSP's web resources
