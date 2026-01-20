import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Typography,
  TextField,
  Stack,
  Button,
  ButtonGroup,
} from "@mui/material";

import { useAuth } from "@/context/AuthContext";
import { isValidUsername } from "@/utils/isValidUsername";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidUsername(username)) {
      alert("Username must be letters and numbers only, max 20 characters.");
      setUsername(""); // reset
      return;
    }

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
          {"A place to ask, share and learn."}
        </Typography>
        <TextField
          required
          label="Username"
          placeholder="What do you go by?"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText="Tips: letters and numbers only, no space/symbols, max 20 char."
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
            {"- Login -"}
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  );
}
