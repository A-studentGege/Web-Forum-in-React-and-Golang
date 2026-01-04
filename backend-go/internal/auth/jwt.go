package auth

import (
	"fmt"
 	"time"
	"os"

	"github.com/A-studentGege/backend-go/internal/models"
	"github.com/golang-jwt/jwt/v5"
)

func CreateToken(user *models.User) (string, error) {
	// read jwt secret key at runtime 
	secretKey := []byte(os.Getenv("JWT_SECRET"))
	
    if len(secretKey) == 0 {
        return "", fmt.Errorf("JWT_SECRET not set")
    }

	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": user.Username,
			"id": user.ID,
			"exp":      time.Now().Add(time.Hour * 24).Unix(), // valid for 1d
			"iat":      time.Now().Unix(),
		})
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", nil
	}
	return tokenString, nil
}

func VerifyToken(tokenString string) error {
	secretKey := []byte(os.Getenv("JWT_SECRET"))
	
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
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
