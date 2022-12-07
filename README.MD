
# Test Backend Project

Backend project created as a test using the language go.

## Stack

**Back-end:** Go, Gin, Gorm, Postgres


## Installation

To install all the project dependencies, run the command
```bash
  go get ./...
```


To start the server, run the command
```bash
    CompileDaemon -command=./test-project-backend
```
If you get some error, try verifying if the name of the .exe file is the same as ./test-project-backend. If it isn't, try changing in the command line.
    

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

