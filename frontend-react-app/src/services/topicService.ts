import Topic from "../types/Topic";
import Post from "../types/Post";

const BASE_URL = "http://localhost:8080";

export async function fetchTopics(): Promise<Topic[]> {
  const res = await await fetch(`${BASE_URL}/topics`);
  if (!res.ok) throw new Error("Failed to fetch topics");
  return res.json();
}

export async function fetchTopicById(topicId: string): Promise<Topic> {
  const res = await fetch(`${BASE_URL}/topics/${topicId}`);
  if (!res.ok) throw new Error("Failed to fetch topic");
  return res.json();
}

export async function fetchPostsByTopicId(topicId: string): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts/topic/${topicId}`);
  if (!res.ok) throw new Error("Failed to fetch posts by topic");
  return res.json();
}