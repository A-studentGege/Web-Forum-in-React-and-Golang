package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/A-studentGege/backend-go/internal/models"
	"github.com/A-studentGege/backend-go/internal/auth"
	"github.com/go-chi/chi/v5"
	
)

// createPostRequest represents the json object for create post request
type createPostRequest struct {
    Title    string `json:"title"`
    Content  string `json:"content"`
    TopicID  int    `json:"topic_id"`
}

// updatePostRequest represents the json object for update post request
type updatePostRequest struct {
	Title 	string 	`json:"title"`
	Content string	`json:"content"`
}


// GetLatestPosts handles GET /posts
// 
// Response:
//   200 OK - JSON array of posts
//   500 Internal Server Error - database failure
//
// Authentication: not required
func GetLatestPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := models.GetLatestPosts()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

// GetPostsByTopicID handles GET /posts/topic/{topicID}
// 
// Response:
//   200 OK - JSON array of posts
// 	 400 Bad request - invalid post ID 
//   500 Internal Server Error - database failure
//
// Authentication: not required
func GetPostsByTopicID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "topicID")
	topicID, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid topic ID", http.StatusBadRequest)
		return
	}

	posts, err := models.GetPostsByTopicID(topicID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

// GetPostByID handles GET /posts/{id}
// 
// Response:
//   200 OK - post object
// 	 400 Bad request - invalid post ID 
//   500 Internal Server Error - database failure
//
// Authentication: not required
func GetPostByID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid post ID", http.StatusBadRequest)
		return
	}

	post, err := models.GetPostByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}

// CreatePost handles POST /posts
// 
// Response:
//   201 Created - JSON object containing new post ID
// 	 400 Bad request - invalid request body/included empty title or content
// 	 401 Unauthorized - user not authorized
//   500 Internal Server Error - database failure
//
// Authentication: required
func CreatePost(w http.ResponseWriter, r *http.Request){
	// retrieve user id from auth middleware extraction 
	authorID, ok := r.Context().Value(auth.UserIDKey).(int)
    if !ok {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

	var req createPostRequest
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

	// validation to check if title or content is empty 
	if req.Title == "" || req.Content == "" {
        http.Error(w, "Title and Content are required", http.StatusBadRequest)
        return
    }

	newID, err := models.CreatePost(authorID, req.Title, req.Content, req.TopicID)
    if err != nil {
        http.Error(w, "Failed to create post", http.StatusInternalServerError)
        return
    }

	w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]int{"id": newID})
}

// DeletePost handles DELETE /posts/{id}
// 
// Response:
//   204 No content - successful deletion
// 	 400 Bad request - invalid post ID 
// 	 401 Unauthorized - user not authorized
//   403 Forbidden - user not owner of the post
//   404 Not Found - post does not exist
//   500 Internal Server Error - database failure
//
// Authentication: required
func DeletePost(w http.ResponseWriter, r *http.Request) {
	// retrieve user id from auth middleware extraction 
	authorID, ok := r.Context().Value(auth.UserIDKey).(int)
    if !ok {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

	// get post id from url param 
	postIDStr := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	err = models.DeletePost(authorID, postID)
	if err != nil {
		switch err {
		case models.ErrNotFound:
			http.Error(w, "Post not found", http.StatusNotFound)
		case models.ErrForbidden:
			http.Error(w, "Forbidden", http.StatusForbidden)
		default:
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// UpdatePost handles PUT /posts/{id}
// 
// Response:
//   204 No content - successful update
// 	 400 Bad request - invalid post ID / invalid request body / include empty title or content
// 	 401 Unauthorized - user not authorized
//   403 Forbidden - user not owner of the post
//   404 Not Found - post does not exist
//   500 Internal Server Error - database failure
//
// Authentication: required
func UpdatePost(w http.ResponseWriter, r *http.Request) {
	// retrieve user id from auth middleware extraction 
	authorID, ok := r.Context().Value(auth.UserIDKey).(int)
    if !ok {
        http.Error(w, "User identity not found", http.StatusInternalServerError)
        return
    }

	// get post id from url param 
	postIDStr := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	var req updatePostRequest
    err = json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

	// validation to check if title or content is empty 
	if req.Title == "" || req.Content == "" {
        http.Error(w, "Title and Content are required", http.StatusBadRequest)
        return
    }

	err = models.UpdatePost(authorID, postID, req.Title, req.Content)
	if err != nil {
		switch err {
		case models.ErrNotFound:
			http.Error(w, "Post not found", http.StatusNotFound)
		case models.ErrForbidden:
			http.Error(w, "Forbidden", http.StatusForbidden)
		default:
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}


	w.WriteHeader(http.StatusNoContent)
}