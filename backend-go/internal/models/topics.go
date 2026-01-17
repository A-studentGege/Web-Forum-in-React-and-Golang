package models

import (
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
