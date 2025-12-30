import Comment from "../types/Comment";
import CommentItem from "./CommentItem";

import React from "react";

export default function CommentList() {
  const comments: Comment[] = [
    {
      id: 1,
      postID: 1,
      content: "Test a short comment like this",
      author: "Jane Smith",
      createdAt: new Date("2023-10-22T11:04:28"),
    },
    {
      id: 2,
      postID: 1,
      content:
        "A longer comment: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate ",
      author: "Bob Jackson",
      createdAt: new Date("2025-11-29T18:25:01"),
    },
    {
      id: 3,
      postID: 1,
      content:
        "Still long comment: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate ",
      author: "Alice33",
      createdAt: new Date("2025-11-31T09:11:01"),
    },
  ];

  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}
