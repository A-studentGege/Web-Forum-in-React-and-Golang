package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"errors"

	"github.com/A-studentGege/backend-go/internal/models"
	"github.com/A-studentGege/backend-go/internal/auth"
	"github.com/A-studentGege/backend-go/internal/util"

	"github.com/go-chi/chi/v5"
)

// createTopicRequest represents the json object for create topic request
type createTopicRequest struct {
	Name 	string	`json:"name"`
	Color 	string	`json:"color`
}

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
//   404 Not Found - topic does not exist 
//   500 Internal Server Error - database failure
//
// Authentication: not required
func GetTopicNameByID(w http.ResponseWriter, r *http.Request) {
	// get "id" from path
	idStr := chi.URLParam(r, "id")
	topicID, err := strconv.Atoi(idStr)

	if err != nil || topicID <= 0 {
		http.Error(w, "Invalid topic id", http.StatusBadRequest)
		return
	}

	topic, err := models.GetTopicNameByID(topicID)
	if err != nil {
		if err == models.ErrNotFound {
			http.Error(w, "Topic not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(topic)
}

// CreateTopic handles POST /topics
//
// Response:
//   201 Created - JSON object containing new post ID
// 	 400 Bad request - invalid request body
// 	 403 Forbidden - reject non-admin user req
// 	 409 Conflict - duplicate topic already exists
//   500 Internal Server Error - database failure
//
// Authentication: required (admin required)
func CreateTopic(w http.ResponseWriter, r *http.Request){
	// retrieve user role
	isAdmin, _ := r.Context().Value(auth.IsAdminKey).(bool)
    if !isAdmin {
        http.Error(w, "Admin access required", http.StatusForbidden)
        return
    }

	var req createTopicRequest
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

	// validation to check if new topic name and color code is valid
	if req.Name == "" {
		http.Error(w, "Topic name is required", http.StatusBadRequest)
		return
	}

	// validation for topic name character limits
	if len(req.Name) > 30 {
		http.Error(w, "Topic name cannot exceed 30 characters", http.StatusBadRequest)
		return
	}
		
	if !util.IsValidHexColor(req.Color) {
        http.Error(w, "Invalid color code. Expected format: #RRGGBB", http.StatusBadRequest)
        return
    }

	newID, err := models.CreateTopic(req.Name, req.Color)
	if err != nil {
		if errors.Is(err, models.ErrAlreadyExists) {
			http.Error(w, "Topic already exists", http.StatusConflict) // duplicate topic exists
			return
		}
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]int{"id": newID})
}


// DeleteTopic handles DELETE /topics/{id}
// 
// Response:
//   204 No content - successful deletion
// 	 400 Bad request - invalid post ID 
// 	 403 Forbidden - reject non-admin user req
//   404 Not Found - topic does not exist 
//   500 Internal Server Error - database failure
//
// Authentication: required (admin required)
func DeleteTopic(w http.ResponseWriter, r *http.Request) {
	// retrieve user role
	isAdmin, _ := r.Context().Value(auth.IsAdminKey).(bool)
    if !isAdmin {
        http.Error(w, "Admin access required", http.StatusForbidden)
        return
    }

	topicIDStr := chi.URLParam(r, "id")
	topicID, err := strconv.Atoi(topicIDStr)
	if err != nil || topicID <= 0 {
		http.Error(w, "Invalid topic ID", http.StatusBadRequest)
		return
	}

	err = models.DeleteTopic(topicID)
	if err != nil {
		if err == models.ErrNotFound {
			http.Error(w, "Topic not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Failed to delete topic", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}