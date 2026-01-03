package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/A-studentGege/backend-go/internal/models"
	"github.com/go-chi/chi/v5"
	
)

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

	posts, err := models.GetPostByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}