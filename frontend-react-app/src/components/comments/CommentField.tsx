import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

import React from "react";

export default function CommentField() {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
      }}
    >
      <Stack direction={"column"} spacing={2} alignItems="flex-start">
        <TextField
          label="Leave a comment"
          multiline
          fullWidth
          rows={4}
          placeholder="While you have the freedom to share your opinion, please remain respectful!"
          variant="standard"
          sx={{ pb: 1 }}
        />

        <ButtonGroup
          variant="outlined"
          aria-label="comment action button group"
          sx={{ display: "inline-block" }}
        >
          <Button
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<SendIcon />}
          >
            {"Share"}
          </Button>
          <Button variant="outlined" color="inherit" endIcon={<CancelIcon />}>
            {"Cancel"}
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  );
}
