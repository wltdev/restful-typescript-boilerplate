# Rest Api with nodejs and typescript

## Scripts

In project directory, you can run:

### `yarn test`
Verify if everithing is ok.


## Basic Routes

### `POST /login`
```
POST /login
{
  email,
  password
}

Response
{
  token: jwt 
}
```

## Routes /api need the Authorization header
```
{
  "Authorization": "Bearer {token}"
}
```

### Products
```
GET /api/products
```
```
POST /api/products
{
  "name": "Product name",
  "price": 100 
}
```
```
PUT /api/products/:id
{
  "name": "Product name to change",
  "price": 200 
}
```
```
DELETE /api/products/:id
```