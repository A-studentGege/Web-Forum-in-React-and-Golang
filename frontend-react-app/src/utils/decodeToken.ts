import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: number;
  username: string;
  is_admin: boolean;
  exp: number;
}

export function decodeToken(token: string): JwtPayload {
  return jwtDecode<JwtPayload>(token);
}
