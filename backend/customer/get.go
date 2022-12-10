package customer

import (
	"github.com/gin-gonic/gin"
	"github.com/neto18081/test-project-backend/initializers"
	"github.com/neto18081/test-project-backend/models"
)

// Function for retrieving first 50 customers
func GetCustomers(c *gin.Context) {
	// Creates a customers array model
	var customers []models.Customer

	// Finds in the Database the first 50 customers using the model
	// Handles possible errors while getting from the Database
	if err := initializers.DB.Limit(50).Find(&customers); err.Error != nil {
		c.JSON(400, gin.H{
			"msg": err.Error,
		})
	}

	// Returns the customers
	c.JSON(200, gin.H{
		"customers": customers,
	})
}

// Function for retrieving a customer by ID
func GetCustomer(c *gin.Context) {
	// Gets the ID from the query params
	id := c.Param("id")

	// Creates an customer model
	var customer models.Customer

	// Finds the first occurrence of the model by ID
	// Handles possible errors while getting from the Database
	if err := initializers.DB.First(&customer, id); err.Error != nil {
		c.JSON(400, gin.H{
			"msg": err.Error,
		})
	}

	// Returns the customer
	c.JSON(200, gin.H{
		"customer": customer,
	})
}
