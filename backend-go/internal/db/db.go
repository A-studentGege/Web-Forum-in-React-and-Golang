package db

import (
	"database/sql"
	"log"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

// Init initializes a global connection to postgresql database 
// 
// It reads database configuration from environment variables:
//   - DB_HOST
//   - DB_PORT
//   - DB_USER
//   - DB_PASSWORD
//   - DB_NAME
//
// Init establishes the connection and verifies it with a ping.
// The application will terminate if the connection cannot be established.
//
// This function should be called once during application startup. 
func Init() {
	var err error
	
	// load db details from .env
	psqlInfo := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)

	DB, err = sql.Open("postgres", psqlInfo)

	// check if got errors when connecting
	if err != nil {
		log.Fatal(err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal(err)
	}

	log.Println("Database connected")
}
