package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/A-studentGege/backend-go/internal/models"

	"github.com/go-chi/chi/v5"
)

func GetTopics(w http.ResponseWriter, r *http.Request) {
	topics, err := models.GetAllTopics()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*") // for allowing CORS, otherwise req can't go through
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(topics)
}

func GetTopicNameByID(w http.ResponseWriter, r *http.Request) {
	// get "id" from path
	idStr := chi.URLParam(r, "topicID")

	// convert string -> int
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid topic id", http.StatusBadRequest)
		return
	}

	topics, err := models.GetTopicNameByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*") // for allowing CORS, otherwise req can't go through
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(topics)
}
