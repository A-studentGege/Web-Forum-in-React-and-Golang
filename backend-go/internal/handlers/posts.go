package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"log"

	"github.com/A-studentGege/backend-go/internal/models"
	"github.com/A-studentGege/backend-go/internal/auth"
	"github.com/go-chi/chi/v5"
	
)

type createPostRequest struct {
    Title    string `json:"title"`
    Content  string `json:"content"`
    TopicID  int    `json:"topic_id"`
}

type updatePostRequest struct {
	Title 	string 	`json:"title"`
	Content string	`json:"content"`
}

func GetLatestPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := models.GetLatestPosts()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

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

func CreatePost(w http.ResponseWriter, r *http.Request){
	// retrieve user id from auth middleware extraction 
	authorID, ok := r.Context().Value(auth.UserIDKey).(int)
    if !ok {
        http.Error(w, "User identity not found", http.StatusInternalServerError)
        return
    }

	// decode json body to get values
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
        log.Printf("Database error: %v", err)
        http.Error(w, "Failed to create post", http.StatusInternalServerError)
        return
    }

	w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]int{"id": newID})
}

func DeletePost(w http.ResponseWriter, r *http.Request) {
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

	// delete the post
	err = models.DeletePost(authorID, postID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusForbidden)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

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

	// decode json body to get values
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

	// update the post 
	err = models.UpdatePost(authorID, postID, req.Title, req.Content)
	if err != nil {
		http.Error(w, err.Error(), http.StatusForbidden)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}