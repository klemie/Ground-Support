# API Documentation

The api is a REST API that currently has support for the following HTTP verbs (`GET`, `POST`, `PATCH`, `DELETE`)

## Client side API Docs

The can be found in the file `client/src/services/api.ts`. The API is a simple REST API that uses the following HTTP verbs:

All GET by ids will return an object with all of the nested entities populated.  For example, a GET on `/rocket/:id` will return a rocket object with the missions and components objects populated. This is done to reduce the number of calls to the server.  

:TODO: (query parameters): If you do not want the nested objects populated, you can use the `?populate=false` query string parameter.  For example, `/api/mission/1?populate=false` will return a mission object with the rocket and component objects not populated.
### Type Security

The API uses TypeScript to ensure type safety.  The API uses the following interfaces:

```typescript
interface IError {
    error: boolean;
    status?: number;
    statusText?: string;
    message?: string;
}

interface IResponse {
    data: 
        IRocket | 
        IRocket[] | 
        IRocketPopulated |
        IRocketPopulated[] |
        IMission | 
        IMission[] | 
        IMissionPopulated |
        IMissionPopulated[] |
        IComponent | 
        IComponent[] | 
        IComponentPopulated |
        IComponentPopulated[] | 
        IDataConfig | 
        IDataConfig[];
    error: IError;
}

interface IAxiosResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request: any;
}
```

Each endpoint returns an `IResponse` object. The data property will contain the data returned from the server. The error property will contain an `IError` object if there was an error. 

### Error Handling and Logging

Each axios call is wrapped in a try catch block. That status is checked in the `handleError` function which returns a `IError` object. IError contains the following properties:

```typescript
interface IError {
    error: boolean;
    status?: number;
    statusText?: string;
    message?: string;
}
``` 

`handleError` checks the status code and returns the appropriate error message dependent on the entity.  For example, if a GET request is made to `/mission/sad:(` and the mission does not exist, the server will return a 404 status code.  The `handleError` function will return the following object:

```typescript
{
    error: true,
    status: 404,
    statusText: 'Not Found',
    message: 'Error getting Mission with id: \'sad:(\'. Full error: Request failed with status code 404'
}
```

### Endpoints

Each of the following endpoints have the four basic CRUD operations.  The following endpoints are available:

- `GET` - get all entities or get an entity by id
- `POST` - create a new entity
- `PATCH` - update an entity (will replace content with new content)
- `DELETE` - delete an entity by id

following endpoints are available:

- `/mission`
- `/rocket`
- `/component`
- `/dataConfig`
