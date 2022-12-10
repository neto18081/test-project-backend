package main

import (
	"time"

	"github.com/gin-contrib/cors"
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

	// Disabling CORS. Allowing requests from every origin.
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"PUT", "GET", "POST", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Creates routes
	r.GET("/customers", customer.GetCustomers)
	r.GET("/customers/:id", customer.GetCustomer)
	r.POST("/customers", customer.CreateCustomer)
	r.PUT("/customers/:id", customer.UpdateCustomer)
	r.DELETE("/customers/:id", customer.DeleteCustomer)

	// Run server on port declares in the .env file (8000)
	r.Run()

}
