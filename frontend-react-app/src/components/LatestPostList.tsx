import Post from "../types/Post";

import PostList from "./ForumPostList";

import React, { useState, useEffect } from "react";
import LoadingState from "./states/LoadingState";

export default function LatestPostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch latest sposts from db
  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (loading) {
    return <LoadingState message="receiving latest posts..." />;
  }
  return <PostList posts={posts} title="Latest" />;
}
