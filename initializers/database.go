package initializers

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Declares the variable DB as a pointer gorm struct DB
var DB *gorm.DB

// Function for creating a connection with the Database
func ConnectToDB() {
	// Variable for storing possible errors
	var err error

	host := os.Getenv("POSTGRES_HOST")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")

	// Variable for storing Database connection informations
	// dsn := "host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable"

	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=postgres port=5432 sslmode=disable", host, user, password)

	// Create connection and stores in the DB variable
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	// Handle errors
	if err != nil {
		log.Fatal("Failed to connect to database")
	}
}
