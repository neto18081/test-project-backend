package main

import (
	"github.com/gin-gonic/gin"
	"github.com/neto18081/test-project-backend/controllers"
	"github.com/neto18081/test-project-backend/initializers"
)

func init() {
	// Load Env Variables and connects to Database
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {

	r := gin.Default()

	// Creates routes
	r.GET("/customers", controllers.GetCustomers)
	r.GET("/customers/:id", controllers.GetCustomer)
	r.POST("/customers", controllers.CreateCustomer)
	r.PUT("/customers/:id", controllers.UpdateCustomer)

	// Run server on port declares in the .env file (3000)
	r.Run()

}
