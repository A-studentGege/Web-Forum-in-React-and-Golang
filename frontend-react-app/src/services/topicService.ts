import Topic from "@/types/Topic";
import Post from "@/types/Post";

const BASE_URL = "http://localhost:8080";

/**
 * Fetch a list of topics
 * 
 * @returns A list of all topics
 * @throws Error if the request fails
 */
export async function fetchTopics(): Promise<Topic[]> {
  const res = await fetch(`${BASE_URL}/topics`);
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
  const res = await fetch(`${BASE_URL}/posts?topic=${encodeURIComponent(topicId)}`);
  if (!res.ok) throw new Error("Failed to fetch posts by topic");
  return res.json();
}

/**
 * Create a new topic
 * 
 * @param token - JWT token
 * @param payload - new topic details (name and color hex code)
 */
export async function createTopic(
  token: string,
  payload: {
    name : string,
    color : string 
  }
) : Promise<Topic> {
  const res = await fetch(`${BASE_URL}/topics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = new Error("Failed to create topic");
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
}

/**
 * Delete an existing topic by its ID
 * 
 * @param token - JWT token
 * @param topicId - ID of the topic
 */
export async function deleteTopic(token : string, topicId : number) {
  const res = await fetch(`${BASE_URL}/topics/${topicId}`,{
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const error = new Error("Failed to delete topic");
    (error as any).status = res.status;
    throw error;
  }
}