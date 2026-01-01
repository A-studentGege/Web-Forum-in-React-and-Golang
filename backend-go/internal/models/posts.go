package models

import (
	"time"

	"test-go-app/internal/db"
)

type Post struct {
	ID    int    `json:"id"`
	Title  string `json:"title"`
	Content string `json:"content"`
	Topic string `json:"topic"`
	Author string `json:"author"`
	CreatedAt time.Time `json:"createdAt"`
}

func GetLatestPosts() ([]Post, error) {
	rows, err := db.DB.Query(
		`SELECT p.id, p.title, p.content, t.name, u.username,  p.created_at 
		FROM posts p
		JOIN users u ON p.author_id = u.id
	 	JOIN topics t ON p.topic_id = t.id
		ORDER BY p.created_at DESC`,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var p Post
		if err := rows.Scan(&p.ID, &p.Title, &p.Content,&p.Topic,&p.Author, &p.CreatedAt); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}

	return posts, nil
}

func GetPostsByTopicID(topic_id int) ([]Post, error) {
	rows, err := db.DB.Query(
		`SELECT p.id, p.title, p.content, t.name as topic, u.username,  p.created_at 
		FROM posts p
		JOIN users u ON p.author_id = u.id
	 	JOIN topics t ON p.topic_id = t.id
		WHERE p.topic_id = $1`,
		topic_id,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var p Post
		if err := rows.Scan(&p.ID, &p.Title, &p.Content,&p.Topic,&p.Author, &p.CreatedAt); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}

	return posts, nil
}