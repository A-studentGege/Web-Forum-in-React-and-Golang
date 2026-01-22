const BASE_URL = "http://localhost:8080";

/**
 * handles user login
 * 
 * @param payload - a json object including username
 * @returns a JWT token
 */
export async function userLogin (
    payload : {
        username: string
    }
) {
    const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
    throw new Error(data.message || "Login failed.");
    }
    return data;
}

/**
 * validate user jwt token at backend
 * 
 * @param token - JWT token
 * @returns no content if token is valid, 401 if token invalid(expired)
 */
export async function fetchMe(token : string) {
    const res = await await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        throw new Error("SESSION_EXPIRED");
    }
    
    if (!res.ok) {
        throw new Error("SERVER_ERROR");
    }
    return;
}