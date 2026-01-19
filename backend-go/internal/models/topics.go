package models

import (
	"errors"

	"github.com/lib/pq"
	"github.com/A-studentGege/backend-go/internal/db"
)

// Topic represent a topic (a category) for posts
type Topic struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
}

// GetAllTopics returns a list of all topics 
func GetAllTopics() ([]Topic, error) {
	rows, err := db.DB.Query(
		"SELECT id, name FROM topics",
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var topics []Topic
	for rows.Next() {
		var t Topic
		if err := rows.Scan(&t.ID, &t.Name); err != nil {
			return nil, err
		}
		topics = append(topics, t)
	}

	return topics, nil
}

// GetTopicNameByID returns topic name associated with a given topic ID 
func GetTopicNameByID(id int) (*Topic, error) {
	row := db.DB.QueryRow(
		"SELECT id, name FROM Topics WHERE id = $1",
		id,
	)

	var t Topic
	if err := row.Scan(&t.ID, &t.Name); err != nil {
		return nil, err
	}

	return &t, nil
}

// CreateTopic creates a new topic using given name and color code string 
func CreateTopic(name string, color string) (int, error) {
	var lastInsertID int
	
    // insert new comment and return new record's id 
    query := `INSERT INTO topics (name, color) 
              VALUES ($1, $2) 
              RETURNING id`

    err := db.DB.QueryRow(query, name, color).Scan(&lastInsertID)

	if err != nil {
		// detect postgres unique violation
		var pqErr *pq.Error
		if errors.As(err, &pqErr) && pqErr.Code == "23505" {
			return 0, ErrAlreadyExists
		}
		
		return 0, err
	}

	return lastInsertID, nil
}

// DeleteTopic deletes an existing topic with its ID
func DeleteTopic(id int) error {
	result, err := db.DB.Exec(`
		DELETE FROM topics
		WHERE id = $1`, 
		id)
	
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rows == 0 {
		return ErrNotFound
	}
	
	return nil
}