import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LatestPostList from "@/components/posts/LatestPostList";
import MainLayout from "@/pages/layout/MainLayout";
import AppSnackbar from "@/components/common/AppSnackBar";

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

      <AppSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </MainLayout>
  );
}
