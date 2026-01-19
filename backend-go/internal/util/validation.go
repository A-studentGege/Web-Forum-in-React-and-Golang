package util

import (
	"regexp"
)

var hexColorRegex = regexp.MustCompile(`^#[0-9a-fA-F]{6}$`)

func IsValidHexColor(color string) bool {
    return hexColorRegex.MatchString(color)
}
