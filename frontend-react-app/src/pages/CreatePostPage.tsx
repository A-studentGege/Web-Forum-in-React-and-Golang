import NavBar from "../components/common/NavBar";
import TopicBar from "../components/common/TopicBar";
import Footer from "../components/common/Footer";
import CreatePostForm from "../components/CreatePostForm";

import Grid from "@mui/material/Grid";

import React from "react";

export default function CreatePostPage() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        px: 2,
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12}>
        <NavBar />
      </Grid>

      <Grid item xs={2}>
        <TopicBar />
      </Grid>
      <Grid item xs={10}>
        <CreatePostForm />
      </Grid>

      {/* Spacer */}
      <Grid item xs={12} sx={{ flexGrow: 1 }} />

      <Grid item xs={12} sx={{ mt: "auto" }}>
        <Footer />
      </Grid>
    </Grid>
  );
}
