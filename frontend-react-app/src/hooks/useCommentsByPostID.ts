import { useEffect, useState } from "react";

import { getCommentsByPostID } from "@/services/commentService";

import Comment from "@/types/Comment";

/**
 * React hook to fetch a list of comments for a specific post
 * 
 * @param postId - ID for the post
 * @param refreshKey - Optional value to force re-fetch when changed
 * @returns An object containing:
 * - comments: list of comments for the post
 * - loading: whether the comments are currently being loaded
 * - error: error message if fetching fails
 */
export default function useCommentsByPostID(postId?: string, refreshKey?: number){
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
        setLoading(false);
        setError("Post ID is missing");
        return;
    }

    getCommentsByPostID(postId)
      .then(setComments)
      .catch(() => setError("Failed to load the comments of the post"))
      .finally(() => setLoading(false));
  }, [postId, refreshKey]); // hook re-runs when postId/refreshKey changes 

  return { comments, loading, error };
}