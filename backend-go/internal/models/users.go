package models

import (
	"database/sql"

	"github.com/A-studentGege/backend-go/internal/db"
)

// User represents a user on the forum
type User struct {
	ID    int    `json:"id"`
	Username  string `json:"username"`
}

// GetUserByID returns a user's id and username associated with a given user ID 
func GetUserByID(id int) (*User, error) {
	row := db.DB.QueryRow(
		"SELECT id, username FROM users WHERE id = $1",
		id,
	)

	var u User
	if err := row.Scan(&u.ID, &u.Username); err != nil {
		return nil, err
	}

	return &u, nil
}

// LoginByusername logs user in by the given username
// If user doesn't exist, will proceed to create a new user in createUser 
func LoginByUsername(username string) (*User, error){
	var u User
	
	err := db.DB.QueryRow(
		`SELECT id, username FROM users WHERE username = $1`,
		username,
	).Scan(&u.ID, &u.Username)

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
func createUser(username string) (*User, error){
	var u User

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