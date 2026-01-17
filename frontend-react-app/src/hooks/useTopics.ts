import Topic from "../types/Topic";

import { useState, useEffect } from "react";
import { fetchTopics } from "../services/topicService";

/**
 * Fetch a list of topics
 * 
 * @returns An object containing:
 * - topics: A list of all topics
 * - loading: whether the topics are currently being loaded
 * - error: error message if fetching fails
 */
export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopics()
      .then(setTopics)
      .catch(() => setError("Failed to load topics"))
      .finally(() => setLoading(false));
  }, []);

  return { topics, loading, error };
}
