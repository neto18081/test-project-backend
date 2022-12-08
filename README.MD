
# Test Backend Project

Backend project created as a test using the language go.

## Stack

**Back-end:** Go, Gin, Gorm, Postgres


## Installation

For running this project, you will need to have docker installed. With docker opened, run
```bash
  docker-compose up --build
```
For building the project and setting a docker-compose with a Postgres database and a golang backend project.

You can access the project in the folowing address
```http
  http://localhost:8000/
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

