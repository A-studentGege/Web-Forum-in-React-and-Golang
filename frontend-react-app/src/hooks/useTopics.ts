import Topic from "../types/Topic";

import { useState, useEffect } from "react";
import { fetchTopics } from "../services/topicService";

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
