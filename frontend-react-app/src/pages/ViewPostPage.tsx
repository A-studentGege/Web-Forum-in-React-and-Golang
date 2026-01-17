import Stack from "@mui/material/Stack";

import PostView from "../components/posts/PostView";
import MainLayout from "./layout/MainLayout";
import AppSnackbar from "../components/common/AppSnackBar";
import CommentSection from "../components/comments/CommentSection";

import React, { useState } from "react";

export default function ViewPostPage() {
  // controls snackbar showing
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <MainLayout>
      <Stack direction={"column"} spacing={1}>
        <PostView onPostUpdated={() => showSnackbar("Post updated")} />
        <CommentSection
          onCommentDeleted={() => showSnackbar("Comment deleted")}
        />
      </Stack>

      <AppSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </MainLayout>
  );
}
