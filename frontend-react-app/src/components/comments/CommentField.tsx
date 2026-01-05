import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

import { useAuth } from "../../context/AuthContext";
import { createComment } from "../../services/commentService";

import React from "react";
import { useParams } from "react-router-dom";

export default function CommentField({
  onCommentCreated,
}: {
  onCommentCreated: () => void;
}) {
  const { token } = useAuth();
  const { postID } = useParams<{ postID: string }>();
  const [content, setContent] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to comment");
      return;
    }

    // prevent undefined post id is passed to api call
    if (!postID) {
      alert("Invalid post");
      return;
    }

    if (!content) {
      alert("Comment cannot be empty!");
      return;
    }

    const payload = {
      content,
    };

    await createComment(postID, token!, payload);

    setContent(""); // reset  the comment field after submission
    onCommentCreated(); // trigger comment list refresh
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
      }}
    >
      <Stack
        direction={"column"}
        spacing={2}
        alignItems="flex-start"
        component={"form"}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Leave a comment"
          multiline
          fullWidth
          rows={4}
          placeholder="While you have the freedom to share your opinion, please remain respectful!"
          variant="standard"
          sx={{ pb: 1 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <ButtonGroup
          variant="outlined"
          aria-label="comment action button group"
          sx={{ display: "inline-block" }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
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
