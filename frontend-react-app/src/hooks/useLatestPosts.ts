import Post from "../types/Post";

import { useEffect, useState } from "react";
import { getLatestPosts } from "../services/postService";

/**
 * Retrieve a list of posts ordered in reverse chronological order
 * 
 * @returns An object containing:
 * - posts: list of posts starting from the latest
 * - loading: whether the posts are currently being loaded
 * - error: error message if fetching fails 
 */
export function useLatestPosts(){
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getLatestPosts()
            .then(setPosts)
            .catch(() => setError("Failed to load topics"))
            .finally(() => setLoading(false));
    }, []);

    return {posts, loading, error};
}