import { useState, useEffect } from "react";

import { fetchTopics } from "@/services/topicService";

import Topic from "@/types/Topic";

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

  // handle topic list refresh
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchTopics()
      .then(setTopics)
      .catch(() => setError("Failed to load topics"))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  return { topics, loading, error, refetch: handleRefresh };
}
