import Comment from "../types/Comment";
import CommentItem from "./CommentItem";

import Typography from "@mui/material/Typography";

import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NoComments from "./NoComments";

export default function CommentList() {
  const { postID } = useParams<{ postID: string }>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!postID) return;

    // fetch comments under this post
    fetch(`http://localhost:8080/posts/${postID}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(console.error);
  }, [postID]);

  // handle case where the post has no comments
  if (comments === null) {
    return <NoComments />;
  }
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}
