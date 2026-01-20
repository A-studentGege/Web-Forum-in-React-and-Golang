import { useEffect, useState } from "react";

import {
  fetchPostsByTopicId,
  fetchTopicById,
} from "@/services/topicService";

import Post from "@/types/Post";

/**
 * Fetch a list of posts based on a specific topic
 * 
 * @param topicId - ID for the topic
 * @returns An object containing:
 * - posts: A list of posts for a specific topic
 * - loading: whether the posts are currently being loaded
 * - error: error message if fetching fails
 */
export function usePostsByTopic(topicId?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topicName, setTopicName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topicId) return;

    setLoading(true);

    Promise.all([
      fetchPostsByTopicId(topicId),
      fetchTopicById(topicId),
    ])
      .then(([postsData, topicData]) => {
        setPosts(postsData);
        setTopicName(topicData.name);
      })
      .catch(() => setError("Failed to load topic posts"))
      .finally(() => setLoading(false));
  }, [topicId]);

  return { posts, topicName, loading, error };
}
