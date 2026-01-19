package auth

import (
	"net/http"
)

// RequireAdmin checks user's role in jwt token
// returns forbidden if user is not admin
func RequireAdmin(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        isAdmin, ok := r.Context().Value(IsAdminKey).(bool)
        if !ok || !isAdmin {
            http.Error(w, "Admin access required", http.StatusForbidden)
            return
        }
        next.ServeHTTP(w, r)
    }
}