import Topic from "../types/Topic";
import Post from "../types/Post";

const BASE_URL = "http://localhost:8080";

/**
 * Fetch a list of topics
 * 
 * @returns A list of all topics
 * @throws Error if the request fails
 */
export async function fetchTopics(): Promise<Topic[]> {
  const res = await await fetch(`${BASE_URL}/topics`);
  if (!res.ok) throw new Error("Failed to fetch topics");
  return res.json();
}

/**
 * Fetch a topic by its ID
 * 
 * @param topicId - ID for the topic
 * @returns A topic's details (topic name, topic ID)
 * @throws Error if the request fails
 */
export async function fetchTopicById(topicId: string): Promise<Topic> {
  const res = await fetch(`${BASE_URL}/topics/${topicId}`);
  if (!res.ok) throw new Error("Failed to fetch topic");
  return res.json();
}

/**
 * Fetch a list of posts under a specific topic
 * 
 * @param topicId - ID for the topic
 * @returns A list of posts belonging to a specific topic
 */
export async function fetchPostsByTopicId(topicId: string): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts/topic/${topicId}`);
  if (!res.ok) throw new Error("Failed to fetch posts by topic");
  return res.json();
}