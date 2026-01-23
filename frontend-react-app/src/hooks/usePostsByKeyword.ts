import { useEffect, useState } from "react";

import { searchPost } from "@/services/postService";

import Post from "@/types/Post";

/**
 * Fetch a list of posts that contain the keyword
 * 
 * @param keyword - keyword to filter the posts 
 * @returns a list of posts that contain the keyword
 */
export function usePostsByKeyword(keyword : string){
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!keyword) return;

        setLoading(true);
        setError(null);

        searchPost(keyword)
            .then((data) => setPosts(data))
            .catch(() => setError("Failed to fetch search post result"))
            .finally(() => setLoading(false));
    }, [keyword]);

    return {posts, loading, error};
}