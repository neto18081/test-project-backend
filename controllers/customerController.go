package controllers

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

	// Handles possible erros while saving in the Database
	if result.Error != nil {
		c.Status(400)
		return
	}

	// Retuns the customer created
	c.JSON(200, gin.H{
		"customer": customer,
	})
}

// Function for retrieving first 50 customers
func GetCustomers(c *gin.Context) {
	// Creates a customers array model
	var customers []models.Customer
	// Finds in the Database the first 50 customers using the model
	initializers.DB.Limit(50).Find(&customers)

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
	initializers.DB.First(&customer, id)

	// Returns the customer
	c.JSON(200, gin.H{
		"customer": customer,
	})
}

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
	initializers.DB.First(&customer, id)

	// Updates the customer using the data from body
	// Only the data passed in the body will be updated
	initializers.DB.Model(&customer).Updates(models.Customer{
		First_Name: body.First_Name,
		Last_Name:  body.Last_Name,
		Email:      body.Email,
		Password:   body.Password,
	})

	// Retuns the updated customer
	c.JSON(200, gin.H{
		"customer": customer,
	})
}
