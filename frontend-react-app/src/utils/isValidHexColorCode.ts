/**
 * Check if the input color code is valid hex code
 * 
 * @param color - a hex color code string 
 * @returns boolean of if the code is valid hex color code
 */
export function isValidHexColorCode(color : string) : boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
}