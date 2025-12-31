import Topic from "../types/Topic";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import SendIcon from "@mui/icons-material/Send";

import React from "react";

const topics: Topic[] = [
  { id: 1, name: "Academic" },
  { id: 2, name: "Technology" },
  { id: 3, name: "Anime" },
  { id: 4, name: "Gaming" },
  { id: 5, name: "Cybersecurity" },
  { id: 6, name: "Programming" },
  { id: 7, name: "Cooking" },
  { id: 8, name: "Science" },
  { id: 9, name: "Mathematics" },
  { id: 10, name: "Design" },
  { id: 11, name: "Finance" },
  { id: 12, name: "Health" },
  { id: 13, name: "Travel" },
  { id: 14, name: "Music" },
  { id: 15, name: "Movies" },
  { id: 16, name: "Literature" },
  { id: 17, name: "Philosophy" },
  { id: 18, name: "Startups" },
  { id: 19, name: "Arts" },
  { id: 20, name: "Pets" },
];

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

export default function CreatePostForm() {
  const [topicID, setTopicID] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setTopicID(event.target.value);
  };

  return (
    <Card variant="outlined">
      <CardContent component={"form"} sx={{ textAlign: "left", p: 3 }}>
        <Typography variant="h4" component={"h1"}>
          {"Create a Post"}
        </Typography>

        <Stack direction="row" spacing={2} alignItems={"center"}>
          <FormControl variant="standard" required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              {"Topic"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={topicID}
              onChange={handleChange}
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
            placeholder="Pls make sure your post is relevant to the topic"
            variant="standard"
          />
        </Stack>

        <TextField
          label="Content"
          multiline
          fullWidth
          rows={8}
          placeholder="What do you want to share?"
          variant="standard"
          sx={{ my: 2 }}
        />
        <ButtonGroup
          variant="outlined"
          aria-label="create post button group"
          sx={{ display: "inline-block" }}
        >
          <Button
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<SendIcon />}
          >
            {"Post"}
          </Button>
          {/* <Button variant="outlined" color="inherit" endIcon={<CancelIcon />}>
            {"Cancel"}
          </Button> */}
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
