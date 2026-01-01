import Post from "../types/Post";

import PostList from "./ForumPostList";

import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function ByTopicPostList() {
  const { topicID } = useParams<{ topicID: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [topicName, setTopicName] = useState<string>("");

  // fetch latest sposts from db
  useEffect(() => {
    if (!topicID) return;

    fetch(`http://localhost:8080/posts/topic/${topicID}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error(err);
      });

    // fetch topic details
    fetch(`http://localhost:8080/topics/${topicID}`)
      .then((res) => res.json())
      .then((data) => setTopicName(data.name))
      .catch(console.error);
  }, [topicID]);

  return <PostList posts={posts} title={topicName || "By topic"} />;
}
