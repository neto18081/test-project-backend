package models

import "gorm.io/gorm"

// Declare customer model with pair Name type
type Customer struct {
	gorm.Model
	First_Name string
	Last_Name  string
	Email      string
	Password   string
}
