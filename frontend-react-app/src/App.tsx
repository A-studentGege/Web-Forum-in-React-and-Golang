import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { blue, orange } from "@mui/material/colors";
import HomePage from "./pages/MainPage";
import ViewPostPage from "./pages/ViewPostPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ViewPostByTopicPage from "./pages/ViewPostByTopicPage";

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
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:postid" element={<ViewPostPage />} />
            {/*pass in post ID to render view page */}
            <Route path="/topic/:topicID" element={<ViewPostByTopicPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
