package main

import (
	"github.com/neto18081/test-project-backend/initializers"
	"github.com/neto18081/test-project-backend/models"
)

// Load Env Variables and connects to Database
func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

// Makes the migration. It creates the table in the Database
func main() {
	initializers.DB.AutoMigrate(&models.Customer{})
}
