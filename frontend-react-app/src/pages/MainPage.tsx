import LatestPostList from "../components/posts/LatestPostList";
import MainLayout from "./layout/MainLayout";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // if state has content, trigger snackbar to show
  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbarMessage(location.state.snackbar);
      setSnackbarOpen(true);

      // clear state so refresh won't re-trigger
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <MainLayout>
      <LatestPostList />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
