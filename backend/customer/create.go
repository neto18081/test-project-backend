package customer

import (
	"github.com/gin-gonic/gin"
	"github.com/neto18081/test-project-backend/initializers"
	"github.com/neto18081/test-project-backend/models"
	"golang.org/x/crypto/bcrypt"
)

// Function for hashing passwords
func HashPassword(password string) (string, error) {
	// Try to hash the password. If can't, returns an error
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// Function for creating a customer
func CreateCustomer(c *gin.Context) {

	// Set body type
	var body struct {
		First_Name string
		Last_Name  string
		Email      string
		Password   string
	}
	// Binds request body to variable
	c.Bind(&body)

	// Hashes password or returns an error
	hash, err := HashPassword(body.Password)

	// Handles password hashing errors
	if err != nil {
		c.JSON(400, gin.H{
			"message": err.Error(),
		})
	}

	// Creates a customer model with the information from body
	customer := models.Customer{
		First_Name: body.First_Name,
		Last_Name:  body.Last_Name,
		Email:      body.Email,
		Password:   hash,
	}

	// Save the model in the Database
	result := initializers.DB.Create(&customer)

	// Handles possible errors while saving in the Database
	if result.Error != nil {
		c.JSON(400, gin.H{
			"msg": result.Error,
		})
	}

	// Retuns the customer created
	c.JSON(200, gin.H{
		"customer": customer,
	})
}
