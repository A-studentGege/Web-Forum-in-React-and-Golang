import Footer from "../components/common/Footer";
import NavBar from "../components/common/NavBar";
import LoginForm from "../components/LoginForm";

import Grid from "@mui/material/Grid";

import React from "react";

export default function LoginPage() {
  return (
    <Grid container spacing={2} sx={{ px: 2, minHeight: "100vh" }}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>

      <Grid container sx={{ justifyContent: "center" }}>
        <LoginForm />
      </Grid>

      {/* Spacer */}
      <Grid item xs={12} sx={{ flexGrow: 1 }} />

      <Grid item xs={12} sx={{ mt: "auto" }}>
        <Footer />
      </Grid>
    </Grid>
  );
}
