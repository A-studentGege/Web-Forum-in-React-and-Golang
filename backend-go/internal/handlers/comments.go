package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/A-studentGege/backend-go/internal/models"
	"github.com/A-studentGege/backend-go/internal/auth"
	"github.com/go-chi/chi/v5"	
)

// createCommentRequest represents the json object for create comment request
type createCommentRequest struct {
    Content  string `json:"content"`
    PostID  int    `json:"post_id"`
}

// updateCommentRequest represents the json object for update comment request
type updateCommentRequest struct {
	Content	string `json:"content"`
}

// GetCommentsByPostID handles GET /posts/{id}/comments
// 
// Response:
//   200 OK - JSON array of comments
// 	 400 Bad request - invalid post ID 
//   500 Internal Server Error - database failure
//
// Authentication: not required
func GetCommentsByPostID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(idStr)
	if err != nil || postID <= 0 {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
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

// CreateComment handles POST /posts/{id}/comments
// 
// Response:
//   201 Created - JSON object containing new comment ID
// 	 400 Bad request - invalid request body/included empty content
// 	 401 Unauthorized - user not authorized
//   500 Internal Server Error - database failure
//
// Authentication: required
func CreateComment(w http.ResponseWriter, r *http.Request){
	// retrieve user id from auth middleware extraction 
	authorID, ok := r.Context().Value(auth.UserIDKey).(int)
    if !ok {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

	// get target post id
	idStr := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(idStr)
	if err != nil || postID <= 0 {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
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

	// validation to check comment char limits
	if len(req.Content) > 2000 {
		http.Error(w, "Content cannot exceed 2000 characters", http.StatusBadRequest)
		return
	}	

	newID, err := models.CreateComment(authorID, postID, req.Content)
    if err != nil {
        http.Error(w, "Failed to create comment", http.StatusInternalServerError)
        return
    }

	w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]int{"id": newID})
}

// DeleteComment handles DELETE /comments/{id}
// 
// Response:
//   204 No content - successful deletion
// 	 400 Bad request - invalid comment ID 
// 	 401 Unauthorized - user not authorized
//   403 Forbidden - user not owner of the comment
//   404 Not Found - comment does not exist
//   500 Internal Server Error - database failure
//
// Authentication: required
func DeleteComment(w http.ResponseWriter, r *http.Request){
	// retrieve user id from auth middleware extraction 
	authorID, ok := r.Context().Value(auth.UserIDKey).(int)
    if !ok {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

	// get comment id from url param 
	commentIDStr := chi.URLParam(r, "id")
	commentID, err := strconv.Atoi(commentIDStr)
	if err != nil || commentID <= 0 {
		http.Error(w, "Invalid comment ID", http.StatusBadRequest)
		return
	}

	err = models.DeleteComment(authorID, commentID)
	if err != nil {
		switch err {
		case models.ErrNotFound:
			http.Error(w, "Comment not found", http.StatusNotFound)
		case models.ErrForbidden:
			http.Error(w, "Forbidden", http.StatusForbidden)
		default:
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// UpdateComment handles PUT /comments/{id}
// 
// Response:
//   204 No content - successful update
// 	 400 Bad request - invalid post ID / invalid request body
// 	 401 Unauthorized - user not authorized
//   403 Forbidden - user not owner of the comment
//   404 Not Found - comment does not exist
//   500 Internal Server Error - database failure
//
// Authentication: required
func UpdateComment(w http.ResponseWriter, r *http.Request){
	// retrieve user id from auth middleware extraction 
	authorID, ok := r.Context().Value(auth.UserIDKey).(int)
    if !ok {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

	// get comment id from url param 
	commentIDStr := chi.URLParam(r, "id")
	commentID, err := strconv.Atoi(commentIDStr)
	if err != nil || commentID <= 0 {
		http.Error(w, "Invalid comment ID", http.StatusBadRequest)
		return
	}

	var req updateCommentRequest	
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

	// validation to check comment char limits
	if len(req.Content) > 2000 {
		http.Error(w, "Content cannot exceed 2000 characters", http.StatusBadRequest)
		return
	}	

	err = models.UpdateComment(authorID, commentID, req.Content)
	if err != nil {
		switch err {
		case models.ErrNotFound:
			http.Error(w, "Comment not found", http.StatusNotFound)
		case models.ErrForbidden:
			http.Error(w, "Forbidden", http.StatusForbidden)
		default:
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}