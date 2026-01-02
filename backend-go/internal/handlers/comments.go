package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"test-go-app/internal/models"
	"github.com/go-chi/chi/v5"
	
)

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

	w.Header().Set("Access-Control-Allow-Origin", "*") // for allowing CORS, otherwise req can't go through
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(comments)
}