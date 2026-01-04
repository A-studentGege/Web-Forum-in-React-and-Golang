import Post from "../types/Post";

import { useEffect, useState } from "react";
import { getLatestPosts } from "../services/postService";

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