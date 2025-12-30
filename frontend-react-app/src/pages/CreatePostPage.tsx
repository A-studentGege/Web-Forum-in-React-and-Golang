import NavBar from "../components/common/NavBar";
import TopicBar from "../components/common/TopicBar";
import Footer from "../components/common/Footer";

import Grid from "@mui/material/Grid";

import React from "react";
import CreatePostForm from "../components/CreatePostForm";

export default function CreatePostPage() {
  return (
    <Grid container spacing={2} sx={{ px: 2 }}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>

      <Grid item xs={2}>
        <TopicBar />
      </Grid>
      <Grid item xs={10}>
        <CreatePostForm />
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
