import Footer from "../components/common/Footer";
import NavBar from "../components/common/NavBar";
import TopicBar from "../components/common/TopicBar";
import PostList from "../components/ForumPostList";

import Grid from "@mui/material/Grid";

import React from "react";

export default function ForumMainPage() {
  return (
    <Grid container spacing={2} sx={{ px: 2 }}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={2}>
        <TopicBar />
      </Grid>
      <Grid item xs={10}>
        <PostList />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
