import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // if login successful, redirect to home page
      await login(username);
      navigate("/");
    } catch (err) {
      alert("Login failed, please check your username or network connection.");
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ height: 1 }}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <Stack
        direction={"column"}
        spacing={1}
        sx={{ p: 4, height: 0.8, justifyContent: "space-between" }}
      >
        <Typography variant="h4" component={"h1"}>
          {"Welcome to *Project Forum*!"}
        </Typography>
        <Typography variant="body1" component={"p"}>
          A place to ask, share and learn.
        </Typography>
        <TextField
          required
          label="Username"
          placeholder="What do you go by?"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <ButtonGroup
          variant="outlined"
          aria-label="login button group"
          sx={{ my: 3, alignSelf: "center" }}
        >
          <Button
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
          >
            {"Login"}
          </Button>
          <Button variant="outlined" color="inherit">
            {"Continue as Guest"}
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  );
}
