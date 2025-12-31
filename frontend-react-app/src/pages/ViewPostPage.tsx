import NavBar from "../components/common/NavBar";
import TopicBar from "../components/common/TopicBar";
import PostView from "../components/PostView";
import CommentField from "../components/CommentField";
import CommentList from "../components/CommentList";
import Footer from "../components/common/Footer";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import React from "react";

export default function ViewPostPage() {
  return (
    <Grid container spacing={2} sx={{ px: 2, minHeight: "100vh" }}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>

      <Grid item xs={2}>
        <TopicBar />
      </Grid>
      <Grid item xs={10}>
        <Stack direction={"column"} spacing={1}>
          <PostView />
          <CommentField />
          <CommentList />
        </Stack>
      </Grid>

      {/* Spacer */}
      <Grid item xs={12} sx={{ flexGrow: 1 }} />

      <Grid item xs={12} sx={{ mt: "auto" }}>
        <Footer />
      </Grid>
    </Grid>
  );
}
