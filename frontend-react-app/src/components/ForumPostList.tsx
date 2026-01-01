import Post from "../types/Post";
import PostListItem from "./ForumPostListItem";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import React, { useState, useEffect } from "react";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  // fetch posts from db
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

  return (
    <Card variant="outlined" sx={{ textAlign: "left", p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Latest
      </Typography>

      {posts.map((post) => (
        <PostListItem key={post.title} post={post} />
      ))}
    </Card>
  );
}
