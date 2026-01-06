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

type createCommentRequest struct {
    Content  string `json:"content"`
    PostID  int    `json:"post_id"`
}


func GetCommentsByPostID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid post ID", http.StatusBadRequest)
		return
	}

	comments, err := models.GetCommentsByPostID(postID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(comments)
}

func CreateComment(w http.ResponseWriter, r *http.Request){
	// retrieve user id from auth middleware extraction 
	authorID, ok := r.Context().Value(auth.UserIDKey).(int)
    if !ok {
        http.Error(w, "User identity not found", http.StatusInternalServerError)
        return
    }

	// get target post id
	idStr := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid post ID", http.StatusBadRequest)
		return
	}

	// decode json body to get values
	var req createCommentRequest
    err = json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

	// validation to check if comment content is empty 
	if req.Content == "" {
        http.Error(w, "Content is required", http.StatusBadRequest)
        return
    }

	newID, err := models.CreateComment(authorID, postID, req.Content)
    if err != nil {
        log.Printf("Database error: %v", err)
        http.Error(w, "Failed to create comment", http.StatusInternalServerError)
        return
    }

	w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]int{"id": newID})
}

func DeleteComment(w http.ResponseWriter, r *http.Request){
	// retrieve user id from auth middleware extraction 
	authorID, ok := r.Context().Value(auth.UserIDKey).(int)
    if !ok {
        http.Error(w, "User identity not found", http.StatusInternalServerError)
        return
    }

	// get comment id from url param 
	commentIDStr := chi.URLParam(r, "id")
	commentID, err := strconv.Atoi(commentIDStr)
	if err != nil {
		http.Error(w, "Invalid comment ID", http.StatusBadRequest)
		return
	}

	err = models.DeleteComment(authorID, commentID)
	if err != nil {
		// http.Error(w, err.Error(), http.StatusForbidden)
		log.Printf("error: %v", err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}