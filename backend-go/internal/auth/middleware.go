package auth

import (
    "context"
    "net/http"
    "strings"
	"os"
	
    "github.com/golang-jwt/jwt/v5"
)

// Define a custom type for context keys to avoid collisions
// contextKey <- string (backed by string) but is a diff type, don't collide with other package
type contextKey string
const (
    UserIDKey contextKey = "userID"
    IsAdminKey contextKey = "isAdmin"
)
// AuthMiddleware verifies user's JWT token and extracts user ID from the claim
func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
		// get the jwt token from header
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            http.Error(w, "Missing Authorization Header", http.StatusUnauthorized)
            return
        }

        tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		secret := os.Getenv("JWT_SECRET")
        if secret == "" {
            http.Error(w, "Server misconfiguration", http.StatusInternalServerError)
            return
        }
        
        // Parse and validate token
        token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
            if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, jwt.ErrSignatureInvalid
            }
            return []byte(secret), nil
        })
        if err != nil || !token.Valid {
            http.Error(w, "Invalid token", http.StatusUnauthorized)
            return
        }

		claims, ok := token.Claims.(jwt.MapClaims)
        if !ok {
            http.Error(w, "Invalid claims", http.StatusUnauthorized)
            return
        }

        // extract user id 
        idVal, ok := claims["id"].(float64)
        if !ok {
            http.Error(w, "Invalid user id", http.StatusUnauthorized)
            return
        }
        userID := int(idVal)
        
        // extract admin identity (is_admin) 
        isAdmin, ok := claims["is_admin"].(bool)
        if !ok {
            isAdmin = false
        }

        ctx := context.WithValue(r.Context(), UserIDKey, userID)
        ctx = context.WithValue(ctx, IsAdminKey, isAdmin)

        next.ServeHTTP(w, r.WithContext(ctx))
    }
}