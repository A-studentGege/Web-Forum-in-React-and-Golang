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


func GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := models.GetAllUsers()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func GetUserByID(w http.ResponseWriter, r *http.Request) {
	// get "id" from path
	idStr := chi.URLParam(r, "id")

	// convert string -> int
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	// call model (example)
	user, err := models.GetUserByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

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
