import Post from "../types/Post";

import { useEffect, useState } from "react";
import { getPostByID } from "../services/postService";

/**
 * Fetch a post's details
 * 
 * @param postId - ID for the post
 * 
 * @returns An object containing:
 * - post: A post's details (title, content, topic, author)
 * - loading: whether the posts are currently being loaded
 * - error: error message if fetching fails
 * - refresh: a handle for triggering re-fetch the post
 */
export default function usePostByID(postId?: string){
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // controls refresh of post details
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!postId) {
        setLoading(false);
        setError("Post ID is missing");
        return;
    }

    setLoading(true);
    setError(null);

    getPostByID(postId)
      .then(setPost)
      .catch(() => setError("Failed to load the post"))
      .finally(() => setLoading(false));
  }, [postId, refreshKey]);
  
  return { post, loading, error, refresh: handleRefresh  };
}