import Post from "../types/Post";

import { useEffect, useState } from "react";
import {
  fetchPostsByTopicId,
  fetchTopicById,
} from "../services/topicService";

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
