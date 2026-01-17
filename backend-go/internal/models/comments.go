package models

import (
	"time"
	
	"github.com/A-studentGege/backend-go/internal/db"
)

// Comment represents a comment made by a user on a post.
type Comment struct {
	ID    int    `json:"id"`
	Content  string `json:"content"`
	PostID int `json:"post_id"`
	Author string `json:"author"`
	AuthorID int `json:"author_id"`
	CreatedAt time.Time `json:"created_at"`
}

// GetCommentsByPostID returns all comments associated with a given post ID.
// Comments are ordered by creation time in descending order.
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
		if err := rows.Scan(&c.ID, 
							&c.Content,
							&c.PostID, 
							&c.Author, 
							&c.AuthorID, 
							&c.CreatedAt,
		); err != nil {
			return nil, err
		}
		comments = append(comments, c)
	}

	return comments, nil
}

// CreateComment creates a new comment for a post authored by the given user
// returns the ID of newly created comment
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

// DeleteComment deletes a comment if it's owned by the given author
// returns an error if the comment does not exist or the user is not authorized 
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
		// check if comment exists to determine error type
		var exists bool
		err := db.DB.QueryRow(
			`SELECT EXISTS(SELECT 1 FROM comments WHERE id = $1)`,
			commentID,
		).Scan(&exists)

		if err != nil {
			return err
		}

		if !exists {
			return ErrNotFound
		}

		return ErrForbidden
	}

	return nil
}

// UpdateComment updates the content of a comment if it's owned by the given user
// returns an error if the comment does not exist or the user is not authorized 
func UpdateComment(authorID int, commentID int, content string) error {
	// check if user owns this comment and update
	result, err := db.DB.Exec(`
		UPDATE comments
		SET content = $1
		WHERE id = $2 AND author_id = $3;`, 
		content, commentID, authorID)

	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		// check if comment exists to determine error type
		var exists bool
		err := db.DB.QueryRow(
			`SELECT EXISTS(SELECT 1 FROM comments WHERE id = $1)`,
			commentID,
		).Scan(&exists)

		if err != nil {
			return err
		}

		if !exists {
			return ErrNotFound
		}

		return ErrForbidden
	}

	return nil
}