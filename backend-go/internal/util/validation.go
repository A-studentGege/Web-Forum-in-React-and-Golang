package util

import (
	"regexp"
)

var hexColorRegex = regexp.MustCompile(`^#[0-9a-fA-F]{6}$`)
var usernameRegex = regexp.MustCompile(`^[a-zA-Z0-9]{1,20}$`)


// IsValidHexColor checks if the input string is in valid hex color code format
// start with #, followed by 6 characters (numbers 0-9, character a-f or A-F)
func IsValidHexColor(color string) bool {
    return hexColorRegex.MatchString(color)
}

// IsValidUsername checks if the username mathces the rule: 
// made of letters (upper & lowercase) and/or numbers only, max 20 characters 
func IsValidUsername(username string) bool {
	return usernameRegex.MatchString(username)
}