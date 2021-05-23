# MovieRental

REST API for a movie rental system.

### Installation


Clone the project with:

```sh
git clone https://github.com/g-asantos/fourall-challenge.git
```

Get in the project's path, then install the dependencies with:

```sh
yarn install
```

Set up the .env like the .env.example with your jwt secret.

Rewrite ormconfig.json to point to your database, then run:

```sh
yarn typeorm migration:run
```

or run the data.sql to create the tables and populate the database.

You can start the project with:

```sh
yarn start
```

# MovieRental API Specification

# 1. Public Services

### 1.1 Login

**Resource URL (public resource)**

    POST /users/login

**Parameters**

|Parameter|Type|Description|Required|
|---------|----|-----------|--------|
|email|string|Email of the user |true|
|password|string|Password of the user|true|

Returns user info and json web token.

**Example Request**

    {
	    "email": "example@hotmail.com",
	    "password": "example"
    }

**Example Response**

    Response Code: 200 - OK
    Body:
    {
        "user": {
          "id": "e2f0108d-7fba-443c-ae84-edc807df14d7",
          "name": "john",
          "email": "example@hotmail.com",
          "password": "$2b$08$pSGIw0yNEte6Hbambs42KO7gqyO7cZT66B8Iur9Y0zNZp8b5qBwSK",
          "created_at": "2021-05-22T18:19:49.000Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjE3MDc1OTIsImV4cCI6MTYyMTc5Mzk5Miwic3ViIjoiZTJmMDEwOGQtN2ZiYS00NDNjLWFlODQtZWRjODA3ZGYxNGQ3In0.IeEyZNtXDQaHa-
        a9-NY9c2nsKzWISt6jpRVgWSuBZP0"
    }
    
### 1.2 Create User

**Resource URL (public resource)**

    POST /users

**Parameters**

|Parameter|Type|Description|Required|
|---------|----|-----------|--------|
|name|string|Name of the user|true|
|email|string|Email of the user |true|
|password|string|Password of the user|true|


Returns name and email of the user.

**Example Request**

    {
      "name": "john",
	    "email": "example@hotmail.com",
	    "password": "example"
    }

**Example Response**

    Response Code: 201 - Created
    Body:
    {
      "name": "john",
      "email": "me@hotmail.com"
    }
    
# 2. Movie Services

### IMPORTANT: All these services require the user to be logged on, and the user token must be sent in the Authorization Header in the Bearer token format.

### 2.1 Get All Movies

**Resource URL (public resource)**

    GET /movies

**Parameters**

No parameters required.

Returns a list with all movies registered in the system.

**Example Request**


No body necessary in the request.


**Example Response**

    Response Code: 200 - OK
    Body:
    [
    {
      "id": "$2a$10$NYFZ/8WaQ3Qb6FCs.00jce4nxX9w7AkgWVsQCG6oUwTAcZqP9Flqu",
      "title": "Grease",
      "director": "Randal Kleiser",
      "rented": true,
      "created_at": "2021-05-22T18:10:30.000Z"
    },
    {
    "id": "$2y$12$8vplEbMRsgO1zKID3DpWgu6KfqePdnDMO2o/ns3Hr0D1/exijwKZi",
    "title": "Pulp Fiction",
    "director": "Tarantino",
    "rented": true,
    "created_at": "2021-05-22T18:10:30.000Z"
    }]

### 2.2 Get Movie By Title

**Resource URL (public resource)**

    GET /movies/title

**Parameters**

|Parameter|Type|Description|Required|
|---------|----|-----------|--------|
|title|string|Title of the movie|true|

Returns list with all movies with that title.

**Example Request**

    {
	    "title": "Pulp Fiction"
    }

**Example Response**

    Response Code: 200 - OK
    Body:
    [
    {
      "id": "$2y$12$8vplEbMRsgO1zKID3DpWgu6KfqePdnDMO2o/ns3Hr0D1/exijwKZi",
      "title": "Pulp Fiction",
      "director": "Tarantino",
      "rented": false,
      "created_at": "2021-05-22T18:10:30.000Z"
    }
    ]

### 2.3 Rent A Movie

**Resource URL (public resource)**

    PATCH /movies/rent

**Parameters**

|Parameter|Type|Description|Required|
|---------|----|-----------|--------|
|title|string|Title of the movie|true|

Returns movie that was rented.

**Example Request**

    {
	    "title": "Pulp Fiction"
    }

**Example Response**

    Response Code: 200 - OK
    Body:
    {
      "id": "$2y$12$8vplEbMRsgO1zKID3DpWgu6KfqePdnDMO2o/ns3Hr0D1/exijwKZi",
      "title": "Pulp Fiction",
      "director": "Tarantino",
      "rented": true,
      "created_at": "2021-05-22T18:10:30.000Z"
    }
    
### 2.4 Return A Movie

**Resource URL (public resource)**

    PATCH /movies/return

**Parameters**

|Parameter|Type|Description|Required|
|---------|----|-----------|--------|
|movieId|string|Id of the movie rented|true|

Returns movie that was returned.

**Example Request**

    {
      "movieId": "$2y$12$8vplEbMRsgO1zKID3DpWgu6KfqePdnDMO2o/ns3Hr0D1/exijwKZi"
    }

**Example Response**

    Response Code: 200 - OK
    Body:
    {
      "id": "$2y$12$8vplEbMRsgO1zKID3DpWgu6KfqePdnDMO2o/ns3Hr0D1/exijwKZi",
      "title": "Pulp Fiction",
      "director": "Tarantino",
      "rented": false,
      "created_at": "2021-05-22T18:10:30.000Z"
    }
   

## Built with

- NodeJS
- Typescript
- MySql
- Express
- TSyringe
- Typeorm


## Author

  **Guilherme Azevedo dos Santos**

* Github: [@g-asantos](https://github.com/g-asantos)
* Linkedin: [@guilherme-azevedo-dos-santos-417a70159](https://www.linkedin.com/in/guilherme-azevedo-dos-santos-417a70159/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
