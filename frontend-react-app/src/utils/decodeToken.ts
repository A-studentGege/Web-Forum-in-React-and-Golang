import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: number;
  username: string;
  is_admin: boolean;
  exp: number;
}

/**
 * Decode the JWT token to get its claims/payload
 * 
 * @param token - JWT token
 * @returns decoded token claims
 */
export function decodeToken(token: string): JwtPayload {
  return jwtDecode<JwtPayload>(token);
}
