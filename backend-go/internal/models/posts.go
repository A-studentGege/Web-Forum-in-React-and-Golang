package models

import (
	"time"
	"database/sql"

	"github.com/A-studentGege/backend-go/internal/db"
)

// Post represents a post made by a user on a topic
type Post struct {
	ID    int    `json:"id"`
	Title  string `json:"title"`
	Content string `json:"content"`
	Topic string `json:"topic"`
	TopicColor string `json:"topic_color"` // represent the tag color
	Author string `json:"author"`
	AuthorID int `json:"author_id"`
	CreatedAt time.Time `json:"created_at"`
}

// GetLatestPosts returns all posts in reverse chronological order
func GetLatestPosts() ([]Post, error) {
	rows, err := db.DB.Query(
		`SELECT p.id, p.title, p.content, t.name, t.color, u.username, u.id, p.created_at 
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
		if err := rows.Scan(&p.ID, 
							&p.Title, 
							&p.Content,
							&p.Topic,
							&p.TopicColor,
							&p.Author, 
							&p.AuthorID, 
							&p.CreatedAt,
		); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}

	return posts, nil
}

// GetPostsByTopicID returns posts associated with a given topic ID
func GetPostsByTopicID(topicID int) ([]Post, error) {
	rows, err := db.DB.Query(
		`SELECT p.id, p.title, p.content, t.name as topic, t.color, u.username, u.id, p.created_at 
		FROM posts p
		JOIN users u ON p.author_id = u.id
	 	JOIN topics t ON p.topic_id = t.id
		WHERE p.topic_id = $1`,
		topicID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var p Post
		if err := rows.Scan(&p.ID, 
							&p.Title, 
							&p.Content,
							&p.Topic,
							&p.TopicColor,
							&p.Author, 
							&p.AuthorID, 
							&p.CreatedAt,
		); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}

	return posts, nil
}

// GetPostByID returns a Post object by its ID
func GetPostByID(id int) (*Post, error) {
	row := db.DB.QueryRow(
		`SELECT p.id, p.title, p.content, t.name as topic, t.color, u.username, u.id, p.created_at 
		FROM posts p
		JOIN users u ON p.author_id = u.id
	 	JOIN topics t ON p.topic_id = t.id
		WHERE p.id = $1`,
		id,
	)

	var p Post
	if err := row.Scan(&p.ID, 
						&p.Title, 
						&p.Content,
						&p.Topic,
						&p.TopicColor,
						&p.Author, 
						&p.AuthorID,  
						&p.CreatedAt,
	); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}
	

	return &p, nil 
}

// CreatePost creates a new post authored by the given user
// returns the ID of newly created post
func CreatePost(authorID int, title string, content string, topicID int) (int, error) {
	var lastInsertID int
	
    // insert new post and return new record's id 
    query := `INSERT INTO posts (author_id, title, content, topic_id) 
              VALUES ($1, $2, $3, $4) 
              RETURNING id`

    err := db.DB.QueryRow(query, authorID, title, content, topicID).Scan(&lastInsertID)
    
    if err != nil {
        return 0, err
    }

    return lastInsertID, nil
}

// DeletePost deletes a post if it's owned by the given user
// returns an error if the post does not exist or the user is not authorized 
func DeletePost(authorID int, postID int) error {
	// check whether author owns this post and delete
	result, err := db.DB.Exec(`
		DELETE FROM posts
		WHERE id = $1 AND author_id = $2`, 
		postID, authorID)

	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		// check if post exists to determine error type
		var exists bool

		err := db.DB.QueryRow(
			`SELECT EXISTS(SELECT 1 FROM posts WHERE id = $1)`,
			postID,
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

// UpdatePost updates a post if it's owned by the given user
// returns an error if the post does not exist or the user is not authorized 
func UpdatePost(authorID int, postID int, title string, content string) error {
	// check whether author owns this post and update
	result, err := db.DB.Exec(`
		UPDATE posts
		SET title = $1, content = $2
		WHERE id = $3 AND author_id = $4;`, 
		title, content, postID, authorID)

	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		// check if post exists to determine error type
		var exists bool

		err := db.DB.QueryRow(
			`SELECT EXISTS(SELECT 1 FROM posts WHERE id = $1)`,
			postID,
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