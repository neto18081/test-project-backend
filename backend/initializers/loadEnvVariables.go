package initializers

import (
	"log"

	"github.com/joho/godotenv"
)

// Function for loading environment variables
func LoadEnvVariables() {
	// Load variables and stores possible error
	err := godotenv.Load()

	// Handle errors
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
