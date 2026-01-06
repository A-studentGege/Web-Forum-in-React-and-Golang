package models

import (
	"time"
	"errors"
	
	"github.com/A-studentGege/backend-go/internal/db"
)

type Comment struct {
	ID    int    `json:"id"`
	Content  string `json:"content"`
	PostID int `json:"post_id"`
	Author string `json:"author"`
	AuthorID int `json:"author_id"`
	CreatedAt time.Time `json:"created_at"`
}


func GetCommentsByPostID(postID int) ([]Comment, error) {
	rows, err := db.DB.Query(
		`SELECT c.id, c.content, c.post_id, u.username, u.id, c.created_at
		FROM comments c
		JOIN users u ON c.author_id = u.id
		WHERE c.post_id = $1
		ORDER BY c.created_at DESC`,
		postID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []Comment
	for rows.Next() {
		var c Comment
		if err := rows.Scan(&c.ID, &c.Content,&c.PostID, &c.Author, &c.AuthorID, &c.CreatedAt); err != nil {
			return nil, err
		}
		comments = append(comments, c)
	}

	return comments, nil
}

func CreateComment(authorID int, postID int, content string) (int, error){
	var lastInsertID int
	
    // insert new comment and return new record's id 
    query := `INSERT INTO comments (author_id, post_id, content) 
              VALUES ($1, $2, $3) 
              RETURNING id`

    err := db.DB.QueryRow(query, authorID, postID, content).Scan(&lastInsertID)
    
    if err != nil {
        return 0, err
    }

    return lastInsertID, nil
}

func DeleteComment(authorID int, commentID int) error {
	// check whether author owns this comment and delete
	result, err := db.DB.Exec(`
		DELETE FROM comments
		WHERE id = $1 AND author_id = $2`, 
		commentID, authorID)

	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return errors.New("comment not found or not owned by user")
	}

	return nil
}