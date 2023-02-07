# internal API

## Frontend Useage
To call an internal express endpoint in the frontend we use the request handler `axios`.

First import `axios` at the top of the file.

`import axios from 'axios';`

Next create a function to make the request. Name the request 

During development the base URL is `http://localhost:9090`

```tsx
const get<endpoint> = async () => {
    try {
        const response = await axios({
            method: 'get' | 'post' | 'patch',
            baseURL: API_BASE_URL,
            url: '/<endpoint>'
        });
    }
}
```

Use an state variable along with useEffect to save results

```tsx

useEffect(() => {
    const get<endpoint> = async () => {
        try {
            const response = await axios({
                method: 'get' | 'post' | 'patch',
                baseURL: API_BASE_URL,
                url: '/<endpoint>'
            });
        }
    }
    get<endpoint>();
}, []);
```

## Creating a new Endpoint

There are two types of endpoints you can create. 

## Endpoints

### 

### DataConfig

### Mission

# External API 

## Upload Flight Data

# Python CLI