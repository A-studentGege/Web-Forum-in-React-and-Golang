import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Button,
  ButtonGroup,
  Stack,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useAuth } from "@/context/AuthContext";
import { useTopics } from "@/hooks/useTopics";
import { createPost } from "@/services/postService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};
const MAX_TITLE = 300; // max char limit for post title
const MAX_CONTENT = 2000; // max char limit for post content

export default function CreatePostForm() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { topics } = useTopics();

  const [topicId, setTopicId] = useState<number | "">("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // check if topic id, title or content is empty
    if (!topicId || !title || !content) {
      alert("Please fill in all fields for your post!");
      return;
    }

    // character limit check
    if (title.length > MAX_TITLE) {
      alert(`Title cannot exceed ${MAX_TITLE} characters`);
      return;
    }

    if (content.length > MAX_CONTENT) {
      alert(`Content cannot exceed ${MAX_CONTENT} characters`);
      return;
    }

    const payload = {
      topic_id: topicId,
      title,
      content,
    };

    await createPost(token!, payload);

    // reset form
    setTopicId("");
    setTitle("");
    setContent("");

    navigate("/", {
      replace: true,
      state: { snackbar: "Post created successfully" }, // carry snackbar message
    }); // direct back to home page
  };

  return (
    <Card variant="outlined">
      <CardContent
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ textAlign: "left", p: 3 }}
      >
        <Typography variant="h4" component={"h1"}>
          {"Create a Post"}
        </Typography>

        <Stack direction="row" spacing={2} alignItems={"center"}>
          <FormControl variant="standard" required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="topic-select-label">{"Topic"}</InputLabel>
            <Select
              labelId="topic-select-label"
              id="topic-select"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value as number)}
              label="Topic"
              MenuProps={MenuProps}
            >
              {topics.map((topic) => (
                <MenuItem value={topic.id}> {topic.name} </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            required
            fullWidth
            label="Title"
            placeholder="Pls make sure your post is relevant to the topic (max 300 char)"
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* add a small char count reminder */}
          <small>
            {title.length}/{MAX_TITLE}
          </small>
        </Stack>

        <TextField
          label="Content"
          multiline
          fullWidth
          rows={8}
          placeholder="What do you want to share? (max 2000 char)"
          variant="standard"
          sx={{ my: 2 }}
          onChange={(e) => setContent(e.target.value)}
        />
        <ButtonGroup
          variant="outlined"
          aria-label="create post button group"
          sx={{ display: "inline-block" }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<SendIcon />}
          >
            ({content.length}/{MAX_CONTENT}) {"Post"}
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
