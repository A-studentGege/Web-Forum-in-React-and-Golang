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

export default function CreatePostForm() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
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
              value={age}
              onChange={handleChange}
              label="Topic"
            >
              <MenuItem value={1}>{"Academic"}</MenuItem>
              <MenuItem value={2}>{"Technology"}</MenuItem>
              <MenuItem value={3}>{"Relationship"}</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            fullWidth
            id="standard-required"
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
