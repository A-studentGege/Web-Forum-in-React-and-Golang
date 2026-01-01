package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"test-go-app/internal/models"
	"github.com/go-chi/chi/v5"
	
)

func GetLatestPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := models.GetLatestPosts()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*") // for allowing CORS, otherwise req can't go through
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

func GetPostsByTopicID(w http.ResponseWriter, r *http.Request) {
	
	idStr := chi.URLParam(r, "topicID")

	// convert string -> int
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

	w.Header().Set("Access-Control-Allow-Origin", "*") // for allowing CORS, otherwise req can't go through
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}
