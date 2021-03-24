# Rest Api with nodejs and typescript

## Start Project

### `yarn or npm install`
To install dependencies.

### `yarn sequelize db:migrate`
Run migrations and creating tables.

### `yarn sequelize migration:create --name=add-age-field-to-users`
Creating new migration file.

### `yarn dev`
To start dev server.


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
### `POST /signup`
```
POST /signup
{
  name,
  email,
  password
}

Response
{
  token: jwt 
}
```

## Routes /api need Authorization header
```
{
  "Authorization": "Bearer {token}"
}
```

### Products
```
GET /api/users
```
```
POST /api/users/{UUID}/address
{
  "zipcode": "",
	"street": "",
	"number": ""
}
```
```
GET /api/users/{UUID}/address
{
  "id": "54d25a22-c15a-49e4-904e-0c7bb8a218ec",
  "name": "User name",
  "email": "user@email.com",
  "createdAt": "2021-03-11T15:29:12.063Z",
  "updatedAt": "2021-03-11T15:29:12.063Z",
  "addresses": [
    {
      "id": "e0e644f8-deee-41ec-a0ee-a696a6938c58",
      "user_id": "54d25a22-c15a-49e4-904e-0c7bb8a218ec",
      "zipcode": "",
      "street": "",
      "number": "",
      "createdAt": "",
      "updatedAt": ""
    }
  ]
}