import Post from "../types/Post";

import PostList from "./ForumPostList";

import React, { useState, useEffect } from "react";

export default function LatestPostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  // fetch latest sposts from db
  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <PostList posts={posts} title="Latest" />;
}
