import Comment from "../types/Comment";

import { useEffect, useState } from "react";
import { getCommentsByPostID } from "../services/commentService";

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
  }, [postId, refreshKey]); // hook runs again when refreshKey changes to get comment list

  return { comments, loading, error };
}