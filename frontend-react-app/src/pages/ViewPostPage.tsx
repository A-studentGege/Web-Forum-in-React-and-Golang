import Stack from "@mui/material/Stack";

import PostView from "../components/posts/PostView";
import MainLayout from "./layout/MainLayout";

import React from "react";
import CommentSection from "../components/comments/CommentSection";

export default function ViewPostPage() {
  return (
    <MainLayout>
      <Stack direction={"column"} spacing={1}>
        <PostView />
        <CommentSection />
      </Stack>
    </MainLayout>
  );
}
