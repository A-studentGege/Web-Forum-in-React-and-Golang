package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"test-go-app/internal/db"
	"test-go-app/internal/routes"
)

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
	log.Fatal(http.ListenAndServe("localhost:8080", r)) // changed this for faster startup (windows firewall blocking..) change this back later
}
