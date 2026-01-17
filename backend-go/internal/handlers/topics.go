package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/A-studentGege/backend-go/internal/models"

	"github.com/go-chi/chi/v5"
)

// GetTopics handles GET /topics
// 
// Response:
//   200 OK - JSON array of topics
//   500 Internal Server Error - database failure
//
// Authentication: not required
func GetTopics(w http.ResponseWriter, r *http.Request) {
	topics, err := models.GetAllTopics()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(topics)
}

// GetTopicNameByID handles GET /topics/{topicID}
//
// Path Params:
//   topicID (int) - topic identifier
//
// Response:
//   200 OK - topic object
//   400 Bad Request - invalid topicID
//   500 Internal Server Error - database failure
//
// Authentication: not required
func GetTopicNameByID(w http.ResponseWriter, r *http.Request) {
	// get "id" from path
	idStr := chi.URLParam(r, "topicID")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		http.Error(w, "invalid topic id", http.StatusBadRequest)
		return
	}

	topic, err := models.GetTopicNameByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(topic)
}
