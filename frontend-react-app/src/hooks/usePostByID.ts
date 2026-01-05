import Post from "../types/Post";

import { useEffect, useState } from "react";
import { getPostByID } from "../services/postService";

export default function usePostByID(postId?: string){
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
        setLoading(false);
        setError("Post ID is missing");
        return;
    }

    getPostByID(postId)
      .then(setPost)
      .catch(() => setError("Failed to load the post"))
      .finally(() => setLoading(false));
  }, [postId]);
  
  return { post, loading, error };
}