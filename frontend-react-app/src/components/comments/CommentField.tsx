import { useState, FormEvent } from "react";
import { useParams } from "react-router-dom";

import { Stack, Button, ButtonGroup, Card, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

import { useAuth } from "@/context/AuthContext";
import { createComment } from "@/services/commentService";

export default function CommentField({
  onCommentCreated,
}: {
  onCommentCreated: () => void;
}) {
  const { token } = useAuth();
  const { postID } = useParams<{ postID: string }>();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent) => {
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
