import { ReactNode } from "react";

import { Grid } from "@mui/material";

import NavBar from "@/components/common/NavBar";
import TopicBar from "@/components/topics/TopicBar";
import Footer from "@/components/common/Footer";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <Grid container spacing={2} sx={{ px: 2, minHeight: "100vh" }}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>

      <Grid item xs={2}>
        <TopicBar />
      </Grid>

      <Grid item xs={10}>
        {children}
      </Grid>

      {/* Spacer */}
      <Grid item xs={12} sx={{ flexGrow: 1 }} />

      <Grid item xs={12} sx={{ mt: "auto" }}>
        <Footer />
      </Grid>
    </Grid>
  );
}
