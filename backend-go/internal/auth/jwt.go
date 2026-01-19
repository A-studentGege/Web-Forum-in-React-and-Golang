package auth

import (
	"fmt"
 	"time"
	"os"

	"github.com/A-studentGege/backend-go/internal/models"
	"github.com/golang-jwt/jwt/v5"
)

// CreateToken generates a signed JWT token for an authenticated user
//
// The token includes the following claims:
//   - id: user ID
//   - username: username
//   - exp: expiration time (2 hours from issuance)
//   - iat: issued-at time
//
// The token is signed using HMAC-SHA256 with the secret key
// provided via the JWT_SECRET environment variable.
//
// Returns an error if JWT_SECRET is not set or token signing fails.
func CreateToken(user *models.UserInternal) (string, error) {
	// read jwt secret key at runtime 
	secretKey := []byte(os.Getenv("JWT_SECRET"))
	
    if len(secretKey) == 0 {
        return "", fmt.Errorf("JWT_SECRET not set")
    }

	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": user.Username,
			"id": user.ID,
			"is_admin": user.IsAdmin,
			"exp":      time.Now().Add(time.Hour * 2).Unix(), // valid for 2hrs
			"iat":      time.Now().Unix(),
		})
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// VerifyToken validates a JWT string 
// 
// It verifies:
//   - the token signature using JWT_SECRET
//   - token expiration and standard claims
//
// Returns an error if the token is invalid or expired.
func VerifyToken(tokenString string) error {
	secretKey := []byte(os.Getenv("JWT_SECRET"))
	
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}
		return secretKey, nil
	})

	if err != nil {
		return err
	}
	if !token.Valid {
		return fmt.Errorf("Invalid token")
	}
	return nil
}
