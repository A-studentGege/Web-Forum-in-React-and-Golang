import Comment from "@/types/Comment";

const BASE_URL = "http://localhost:8080";

/**
 * Fetch all comments belonging to a specific post.
 * 
 * @param postId - ID of the post
 * @returns A list of comments for the post
 * @throws Error if the request fails
 */
export async function getCommentsByPostID(postId : string) : Promise<Comment[]> {
  const res = await await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch the comments for the post");
  return res.json();
}

/**
 * Create a new comment for a post
 * 
 * Requires authentication
 * 
 * @param postId - ID of the post
 * @param token - JWT token
 * @param payload - comment content
 * @throws Error if creation fails
 */
export async function createComment(
  postId : string,
  token: string,
  payload: {
    content: string;
  }
) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create comment");
  }
}

/**
 * Delete a comment by its ID
 * 
 * Requires authentication and ownership
 * 
 * @param commentId - ID of the comment
 * @param token - JWT token
 * @throws Error if deletion fails or user is unauthorized 
 */
export async function deleteComment(commentId : number, token : string) {
  const res = await await fetch(`${BASE_URL}/comments/${commentId}`,{
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to delete comment");
}

/**
 * Update an existing comment
 * 
 * Requires authentication and ownership
 * 
 * @param commentId - ID of the comment
 * @param token - JWT token
 * @param payload - updated comment content
 * @throws Error if update fails or user is unauthorized
 */
export async function updateComment(commentId : number, token : string, payload: {
    content: string;
  }) {
  const res = await await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update comment"); 
}