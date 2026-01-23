package models

import (
	"database/sql"

	"github.com/A-studentGege/backend-go/internal/db"
)

// User represents a user on the forum
type UserInternal struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	IsAdmin  bool   `json:"is_admin"`
}

// LoginByusername logs user in by the given username
// If user doesn't exist, will proceed to create a new user in createUser 
func LoginByUsername(username string) (*UserInternal, error){
	var u UserInternal
	
	err := db.DB.QueryRow(
		`SELECT id, username, is_admin FROM users WHERE username = $1`,
		username,
	).Scan(&u.ID, &u.Username, &u.IsAdmin)

	if err == nil {
		// if user already exists, let him login
		return &u, nil
	}

	// if unexpected error occurs (not no rows found error,), abort the operation
	if err != sql.ErrNoRows {
		return nil, err
	}

	// if user does not exist (not found), go create this user
	return createUser(username)
}

// createUser creates a new user with a given username
func createUser(username string) (*UserInternal, error){
	var u UserInternal

	err := db.DB.QueryRow(
		`INSERT INTO users (username)
		 VALUES ($1)
		 RETURNING id, username`,
		username,
	).Scan(&u.ID, &u.Username)

	if err != nil {
		return nil, err
	}

	return &u, nil
}