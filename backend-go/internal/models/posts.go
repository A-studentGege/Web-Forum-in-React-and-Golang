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
		FROM posts p, users u, topics t 
		WHERE p.author_id = u.id AND p.topic_id = t.id 
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