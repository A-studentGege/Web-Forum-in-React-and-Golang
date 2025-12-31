import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import React from "react";

export default function LoginForm() {
  return (
    <Card variant="outlined" sx={{ height: 1 }}>
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
        />
        <ButtonGroup
          variant="outlined"
          aria-label="login button group"
          sx={{ my: 3, alignSelf: "center" }}
        >
          <Button variant="contained" color="primary" disableElevation>
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
