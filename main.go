package main

import (
	"github.com/gin-gonic/gin"
	"github.com/neto18081/test-project-backend/customer"
	"github.com/neto18081/test-project-backend/initializers"
	"github.com/neto18081/test-project-backend/models"
)

func init() {
	// Load Env Variables and connects to Database
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()

	// Makes migrations
	initializers.DB.AutoMigrate(&models.Customer{})
}

func main() {

	r := gin.Default()

	// Creates routes
	r.GET("/customers", customer.GetCustomers)
	r.GET("/customers/:id", customer.GetCustomer)
	r.POST("/customers", customer.CreateCustomer)
	r.PUT("/customers/:id", customer.UpdateCustomer)

	// Run server on port declares in the .env file (3000)
	r.Run()

}
