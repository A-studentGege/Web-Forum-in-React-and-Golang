package models

import (
	"errors"
)

// Define types of errors that may be encountered in model
var (
	ErrNotFound   = errors.New("Resource not found")
	ErrForbidden  = errors.New("Forbidden")
)
