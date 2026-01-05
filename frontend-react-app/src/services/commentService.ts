import Comment from "../types/Comment";

const BASE_URL = "http://localhost:8080";

export async function getCommentsByPostID(postId : string) : Promise<Comment[]> {
  const res = await await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch the comments for the post");
  return res.json();
}

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