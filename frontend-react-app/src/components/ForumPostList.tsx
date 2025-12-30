import Post from "../types/Post";
import PostListItem from "./ForumPostListItem";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import React from "react";

export default function PostList() {
  const posts: Post[] = [
    {
      id: 1,
      author: "John Doe",
      title: "Why is windows so problematic??",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      topic: "Technology",
      topicColor: "primary",
      createdAt: new Date("08-09-2025"),
    },
    {
      id: 2,
      author: "John Doe",
      title: "Looking for 2026 Anime Recommendations",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      topic: "Anime",
      topicColor: "secondary",
      createdAt: new Date("12-30-2025"),
    },
    {
      id: 3,
      author: "John Doe",
      title: "How to find internships for CS Major",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      topic: "Academic",
      topicColor: "success",
      createdAt: new Date("11-18-2025"),
    },
  ];

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
