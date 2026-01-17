// Package main is the entry point for the backend server.
// 
// It performs the following startup sequence:
//   1. Loads environment variables
//   2. Initializes the database connection
//   3. Sets up HTTP routes
//   4. Starts the HTTP server
package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/A-studentGege/backend-go/internal/db"
	"github.com/A-studentGege/backend-go/internal/routes"
)

// main initializes application dependencies and starts the HTTP server.
//
// The application terminates if the database connection or HTTP server
// fails to start.
func main() {
	// load env vars
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// connect DB
	db.Init()

	// setup router
	r := routes.SetupRoutes()

	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe("localhost:8080", r)) 
	// Binding to localhost to avoid Windows firewall prompts during development.
	// Change to ":8080" for production or external access.
}
