package customer

import (
	"github.com/gin-gonic/gin"
	"github.com/neto18081/test-project-backend/initializers"
	"github.com/neto18081/test-project-backend/models"
)

func DeleteCustomer(c *gin.Context) {
	// Gets the ID from the query params
	id := c.Param("id")

	// Creates an customer model
	var customer models.Customer

	// Delete the customer by ID
	// Handles possible errors while getting from the Database
	if err := initializers.DB.Delete(&models.Customer{}, id); err.Error != nil {
		c.JSON(400, gin.H{
			"msg": err.Error,
		})
	}

	// Returns the deleted customer
	c.JSON(200, gin.H{
		"customer": customer,
	})
}
