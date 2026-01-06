package models

import (
	"time"
	"errors"

	"github.com/A-studentGege/backend-go/internal/db"
)

type Post struct {
	ID    int    `json:"id"`
	Title  string `json:"title"`
	Content string `json:"content"`
	Topic string `json:"topic"`
	Author string `json:"author"`
	AuthorID int `json:"author_id"`
	CreatedAt time.Time `json:"created_at"`
}

func GetLatestPosts() ([]Post, error) {
	rows, err := db.DB.Query(
		`SELECT p.id, p.title, p.content, t.name, u.username, u.id, p.created_at 
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
		if err := rows.Scan(&p.ID, &p.Title, &p.Content,&p.Topic,&p.Author, &p.AuthorID, &p.CreatedAt); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}

	return posts, nil
}

func GetPostsByTopicID(topicID int) ([]Post, error) {
	rows, err := db.DB.Query(
		`SELECT p.id, p.title, p.content, t.name as topic, u.username, u.id, p.created_at 
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
		if err := rows.Scan(&p.ID, &p.Title, &p.Content,&p.Topic,&p.Author, &p.AuthorID, &p.CreatedAt); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}

	return posts, nil
}

func GetPostByID(id int) (*Post, error) {
	rows, err := db.DB.Query(
		`SELECT p.id, p.title, p.content, t.name as topic, u.username, u.id, p.created_at 
		FROM posts p
		JOIN users u ON p.author_id = u.id
	 	JOIN topics t ON p.topic_id = t.id
		WHERE p.id = $1`,
		id,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var p Post
	for rows.Next() {
		if err := rows.Scan(&p.ID, &p.Title, &p.Content,&p.Topic,&p.Author, &p.AuthorID,  &p.CreatedAt); err != nil {
			return nil, err
		}
	}

	return &p, nil // return a single post object
}

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
		return errors.New("post not found or not owned by user")
	}

	return nil
}