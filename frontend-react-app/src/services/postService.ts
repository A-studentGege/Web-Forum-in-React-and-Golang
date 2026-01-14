import Post from "../types/Post";

const BASE_URL = "http://localhost:8080";

export async function getLatestPosts() : Promise<Post[]> {
  const res = await await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch the latest posts");
  return res.json();
}

export async function getPostByID(postId : string) : Promise<Post> {
  const res = await await fetch(`${BASE_URL}/posts/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch the post's details");
  return res.json();
}

export async function createPost(
  token: string,
  payload: {
    topic_id: number;
    title: string;
    content: string;
  }
) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }
}

export async function deletePost(postId : string, token : string) {
  const res = await await fetch(`${BASE_URL}/posts/${postId}`,{
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to delete post");
}