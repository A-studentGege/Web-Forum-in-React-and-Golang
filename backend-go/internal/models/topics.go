package models

import (
	"test-go-app/internal/db"
)

type Topic struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
}

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

func GetTopicByID(id int) (*Topic, error) {
	row := db.DB.QueryRow(
		"SELECT id, Topicname FROM Topics WHERE id = $1",
		id,
	)

	var t Topic
	if err := row.Scan(&t.ID, &t.Name); err != nil {
		return nil, err
	}

	return &t, nil
}
