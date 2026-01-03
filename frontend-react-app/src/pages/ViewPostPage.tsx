import PostView from "../components/posts/PostView";
import CommentField from "../components/comments/CommentField";
import CommentList from "../components/comments/CommentList";
import MainLayout from "./layout/MainLayout";

import Stack from "@mui/material/Stack";

import React from "react";

export default function ViewPostPage() {
  return (
    <MainLayout>
      <Stack direction={"column"} spacing={1}>
        <PostView />
        <CommentField />
        <CommentList />
      </Stack>
    </MainLayout>
  );
}
