
# Test Backend Project

Backend project created as a test using the language go.

## Stack

**Back-end:** Go, Gin, Gorm, Postgres


## Installation

First, you'll have to set a database. Run the command in the terminal, with Docker installed, to run a postgres database
```bash
  docker run -e POSTGRES_PASSWORD=postgres -p 5432:5432 --network bridge postgres:14.5-alpine
```
The POSTGRES_PASSWORD sets a password for the database, the -p flag binds the port 5432 to be used by the database and the --network sets a bridge network for the container, so we can access it from another container

The next command we have to run is to verify the IP Address of the Database container. You must replace the "container_id" with your Database container's id. It is located above the container's name.
```bash
    docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_id
```
It will return an IP Address. You must copy this IP and paste it in the .env file, in the POSTGRES_HOST variable value.


After that, in the project folder, we are going to create the Docker image by running the following command
```bash
    docker build . -t golang-backend
```

And then, we are going to run our container at the port 3000, that is exposed in the Dockerfile
```bash
    docker run -p 3000:3000 golang-backend
```

And finally, we have our project running. Just access 
```http
  http://localhost:3000/
```
using one of the routes below.

## Routes

#### Retrieves the first 50 customers

```http
  GET /customers
```

#### Retrieves a single customer by ID

```http
  GET /customer/:id
```

| Parameter   | Type       | Description      | Query | Body |
| :---------- | :--------- | :--------------- | :-----| :----|
| `id` | `integer` | Customer id | &nbsp;&nbsp;&nbsp;&nbsp;X     |      |

#### Creates a customer

```http
  POST /customer
```

| Parameter   | Type       | Description      | Query | Body |
| :---------- | :--------- | :--------------- | :-----| :----|
| `first_name` | `string` | First name | |&nbsp;&nbsp;&nbsp;X |
| `last_name` | `string` | Last name | |&nbsp;&nbsp;&nbsp;X |
| `email` | `string` | Email | |&nbsp;&nbsp;&nbsp;X |
| `password` | `string` | Password | |&nbsp;&nbsp;&nbsp;X |


#### Updates a customer

```http
  PUT /customer/:id
```

| Parameter   | Type       | Description      | Query | Body |
| :---------- | :--------- | :--------------- | :-----| :----|
| `id` | `integer` | Customer id | &nbsp;&nbsp;&nbsp;&nbsp;X     |      |
| `first_name` | `string` | First name | |&nbsp;&nbsp;&nbsp;X |
| `last_name` | `string` | Last name | |&nbsp;&nbsp;&nbsp;X |
| `email` | `string` | Email | |&nbsp;&nbsp;&nbsp;X |
| `password` | `string` | Password | |&nbsp;&nbsp;&nbsp;X |

