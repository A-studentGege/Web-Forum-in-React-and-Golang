package models

import (
	"time"
	
	"github.com/A-studentGege/backend-go/internal/db"
)

type Comment struct {
	ID    int    `json:"id"`
	Content  string `json:"content"`
	PostID int `json:"postid"`
	Author string `json:"author"`
	CreatedAt time.Time `json:"createdAt"`
}


func GetCommentsByPostID(post_id int) ([]Comment, error) {
	rows, err := db.DB.Query(
		`SELECT c.id, c.content, c.post_id, u.username, c.created_at
		FROM comments c
		JOIN users u ON c.author_id = u.id
		WHERE c.post_id = $1
		ORDER BY c.created_at DESC`,
		post_id,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []Comment
	for rows.Next() {
		var c Comment
		if err := rows.Scan(&c.ID, &c.Content,&c.PostID, &c.Author, &c.CreatedAt); err != nil {
			return nil, err
		}
		comments = append(comments, c)
	}

	return comments, nil
}