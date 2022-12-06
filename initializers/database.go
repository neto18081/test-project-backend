package initializers

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Declares the variable DB as a pointer gorm struct DB
var DB *gorm.DB

// Function for creating a connection with the Database
func ConnectToDB() {
	// Variable for storing possible errors
	var err error
	// Variable for storing Database connection informations
	dsn := "host=localhost user=postgres password=admin dbname=gorm port=5432 sslmode=disable"
	// Create connection and stores in the DB variable
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	// Handle errors
	if err != nil {
		log.Fatal("Failed to connect to database")
	}
}
