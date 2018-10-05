---
permalink: RESTar/Consuming%20a%20RESTar%20API/Body%20and%20data%20sources/
---

# Body and data sources

`POST`, `PATCH` and `PUT` requests require a data source to insert and/or update resources from. There are two ways to associate a data source with a request – either by including the data in the body of the HTTP request, or to include a path to the data in the [`Source` header](../Headers#source).

The REST API can read and write data in two formats: JSON and Excel. Of these two, JSON is the most flexible and commonly used. Excel works well for human readability and reading and writing large data sets, but cannot handle nested objects – which is a limitation when dealing with resources modeled with inner objects.

Technically, the correct MIME type to include in requests when reading or writing Excel (.xlsx) files is `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`. For testing and debugging purposes, the REST API also accepts the shorter `excel` as MIME type string.

## POST using JSON text

```bash
curl -X POST -d '
{
    "Name": "Karen Smith",
    "DateOfEmployment": "2013-01-23T00:00:00",
    "Salary": 45000
}
' 'https://my-server.com/rest/employee' -H 'Authorization: apikey mykey'
```

## POST using an Excel file

To upload Excel data, include the file as binary in the body and set the Content-Type header to `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.

```bash
curl -X POST --data-binary '@data.xlsx' 'https://my-server.com/rest/employee'
 -H "Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
 -H 'Authorization: apikey mykey'
```
