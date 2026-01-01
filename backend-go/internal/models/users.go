package models

import (
	"test-go-app/internal/db"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
}

func GetAllUsers() ([]User, error) {
	rows, err := db.DB.Query(
		"SELECT id, username FROM users",
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var u User
		if err := rows.Scan(&u.ID, &u.Name); err != nil {
			return nil, err
		}
		users = append(users, u)
	}

	return users, nil
}


func GetUserByID(id int) (*User, error) {
	row := db.DB.QueryRow(
		"SELECT id, username FROM users WHERE id = $1",
		id,
	)

	var u User
	if err := row.Scan(&u.ID, &u.Name); err != nil {
		return nil, err
	}

	return &u, nil
}
