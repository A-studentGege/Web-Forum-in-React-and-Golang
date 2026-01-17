package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/A-studentGege/backend-go/internal/models"
	"github.com/A-studentGege/backend-go/internal/auth"

	"github.com/go-chi/chi/v5"	
)

type User struct {
	Username	string    `json:"username"`
}

// GetUserByID handles GET /users/{id}
// 
// Response:
//   200 OK 
// 	 400 Bad request - invalid user id 
//   500 Internal Server Error - database failure
//
func GetUserByID(w http.ResponseWriter, r *http.Request) {
	// get "id" from path
	idStr := chi.URLParam(r, "id")

	// convert string -> int
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	user, err := models.GetUserByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

// LoginHandler handles POST /login
// 
// Response:
//   200 OK - successful login and returns a token
// 	 400 Bad request - invalid request body
//   500 Internal Server Error - database failure
//
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var u User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	// retrieve user info from database
	payload, err := models.LoginByUsername(u.Username)
	
	tokenString, err := auth.CreateToken(payload)
	if err != nil {
		http.Error(w, "failed to generate token", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"token": tokenString,
	})
}
