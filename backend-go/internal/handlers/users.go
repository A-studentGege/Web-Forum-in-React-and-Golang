package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/A-studentGege/backend-go/internal/models"
	"github.com/A-studentGege/backend-go/internal/auth"
	"github.com/A-studentGege/backend-go/internal/util"
)

type User struct {
	Username	string    `json:"username"`
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

	if len(u.Username) > 20 || !util.IsValidUsername(u.Username) {
		http.Error(w, "Invalid username: username must be letters and numbers only, max 20 characters.", http.StatusBadRequest)
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

// GetMe handles GET /auth/me
// validate JWT token only
// 
// Responses:
//   204 No Content - token is valid
//   401 Unauthorized - token is invalid / expired (handled by middleware)
// 
func GetMe(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNoContent)
}