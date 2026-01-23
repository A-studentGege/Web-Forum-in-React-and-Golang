import Post from "@/types/Post";

const BASE_URL = "http://localhost:8080";

/** 
 * Fetch a list of posts starting in reverse chronological order
 * 
 * @returns A list of all posts starting from the latest
 * @throws Error if the request fails
 */
export async function getLatestPosts() : Promise<Post[]> {
  const res = await await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch the latest posts");
  return res.json();
}

/** 
 * Fetch a post's details by its ID
 * 
 * @param postId - ID of a post
 * @returns A post's details (title, content, topic, author, created_at)
 * @throws Error if the request fails
 */
export async function getPostByID(postId : string) : Promise<Post> {
  const res = await await fetch(`${BASE_URL}/posts/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch the post's details");
  return res.json();
}

/** 
 * Create a new post
 * 
 * Requires authentication
 * 
 * @param token - JWT token
 * @param payload - new post's details
 * @throws Error if creation fails
 */
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

/**
 * Delete a post by its ID
 * 
 * Requires authentication and ownership
 * 
 * @param postId - ID for the post
 * @param token - JWT token
 * @throws Error if deletion fails or user is unauthroized
 */
export async function deletePost(postId : string, token : string) {
  const res = await await fetch(`${BASE_URL}/posts/${postId}`,{
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to delete post");
}

/**
 * Update an existing post 
 * 
 * Requires authentication and ownership
 * 
 * @param postId - ID for the post
 * @param token - JWT token
 * @param payload - updated post details
 * @throws Error if deletion fails or user is unauthroized
 */
export async function updatePost(postId : string, token : string, payload: {
    title: string,
    content: string;
  }) {
  const res = await await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update post"); 
}

/**
 * Retrieve a list of posts that contain the interested keyword
 * 
 * @param keyword - keyword for searching posts
 * @returns a list of posts that contain keyword in their title/content
 */
export async function searchPost(keyword : string): Promise<Post[]> {
  const res = await await fetch(`${BASE_URL}/posts?q=${keyword}`);
  if (!res.ok) throw new Error("Failed to search post by keyword"); 

  return res.json();
}