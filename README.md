# Rest Api with nodejs and typescript + postgresql

## Start Project
```
# To install dependencies
yarn or npm install

# Run migrations and creating tables
yarn sequelize db:migrate

#To start dev server
yarn dev
```

## Sequelize Database
```
# Creating new migration file
yarn sequelize migration:create --name=add-age-field-to-users

# Sequelize commands list
yarn sequelize
``` 

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

### `User data`
```
GET /api/me
{
  "id": "853941e7-cff8-43ef-af7c-91fa388e4ddf",
  "name": "User fullname",
  "email": "user@email.com",
  "createdAt": "2021-03-24T19:31:12.844Z",
  "updatedAt": "2021-03-25T18:06:59.164Z",
  "addresses": [
    {
      "id": "241c0510-7f9c-4b7c-9873-e11b929e94b6",
      "user_id": "853941e7-cff8-43ef-af7c-91fa388e4ddf",
      "zipcode": "",
      "street": "",
      "number": "",
      "createdAt": "2021-03-25T13:30:44.986Z",
      "updatedAt": "2021-03-25T18:18:07.695Z"
    }
  ]
}
```

### `Update user data`
```
PUT /api/me
{
	"name": "Editing name example"
}
```

### User Address Example
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