const USERNAME_REGEX = /^[a-zA-Z0-9]{1,20}$/;

export function isValidUsername(username: string): boolean {
  return USERNAME_REGEX.test(username);
}
