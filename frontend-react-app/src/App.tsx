import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { blue, orange } from "@mui/material/colors";
import MainPage from "./pages/MainPage";
import ViewPostPage from "./pages/ViewPostPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ViewPostByTopicPage from "./pages/ViewPostByTopicPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const theme = createTheme({
  // palette: {
  //   primary: blue,
  //   secondary: orange,
  // },
  // to change font
  typography: {
    fontFamily: "Fira Mono, Roboto, Arial, sans-serif",
    fontWeightRegular: 500,
    fontWeightLight: 400,
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* public route, user must login to view forum pages */}
            <Route path="/login" element={<LoginPage />} />

            {/* protected routes, user must log in to access */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/post/:postID" element={<ViewPostPage />} />
              <Route path="/topic/:topicID" element={<ViewPostByTopicPage />} />
              <Route path="/create" element={<CreatePostPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
