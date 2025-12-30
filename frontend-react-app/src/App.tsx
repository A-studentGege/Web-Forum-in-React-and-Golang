import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { blue, orange } from "@mui/material/colors";
import HomePage from "./pages/MainPage";
import ViewPostPage from "./pages/ViewPostPage";
import CreatePostPage from "./pages/CreatePostPage";

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
            <Route path="/post/1" element={<ViewPostPage />} />
            <Route path="/create" element={<CreatePostPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
