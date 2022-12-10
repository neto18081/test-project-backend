package customer

import (
	"github.com/gin-gonic/gin"
	"github.com/neto18081/test-project-backend/initializers"
	"github.com/neto18081/test-project-backend/models"
)

// Function for updating a customer
func UpdateCustomer(c *gin.Context) {
	// Gets the ID from the query params
	id := c.Param("id")

	// Set body type
	var body struct {
		First_Name string
		Last_Name  string
		Email      string
		Password   string
	}
	// Binds request body to variable
	c.Bind(&body)

	// Creates a customer model
	var customer models.Customer

	// Finds the first occurrence of the model by ID
	// Handles possible errors while getting from the Database
	if err := initializers.DB.First(&customer, id); err.Error != nil {
		c.JSON(400, gin.H{
			"msg": err.Error,
		})
	}

	// Updates the customer using the data from body
	// Only the data passed in the body will be updated
	// Handles possible errors while updating in the Database
	if err := initializers.DB.Model(&customer).Updates(models.Customer{
		First_Name: body.First_Name,
		Last_Name:  body.Last_Name,
		Email:      body.Email,
		Password:   body.Password,
	}); err.Error != nil {
		c.JSON(400, gin.H{
			"msg": err.Error,
		})
	}

	// Retuns the updated customer
	c.JSON(200, gin.H{
		"customer": customer,
	})
}
