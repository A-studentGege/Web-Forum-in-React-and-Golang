import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import React, { useState, useEffect } from "react";
import Topic from "../../types/Topic";
import TopicListItem from "./TopicListItem";

const style = {
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  maxHeight: "70vh", // max visible height
  overflowY: "auto", // scroll inside box
};

export default function TopicBar() {
  // control all topic list opening
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [topics, setTopics] = useState<Topic[]>([]);

  // fetch topics from db
  useEffect(() => {
    fetch("http://localhost:8080/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Card variant="outlined" sx={{ position: "sticky", top: 10 }}>
      {/* sticky position makes the side bar to stay while user scrolls down */}
      <Stack spacing={1} direction="column" sx={{ p: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          {"Explore"}
        </Typography>

        <Divider />

        <List>
          {topics.slice(0, 10).map((topic) => (
            <TopicListItem key={topic.id} topic={topic} />
          ))}
        </List>

        <div>
          <Link href="#" onClick={handleOpen} underline="hover" color={"black"}>
            <Typography>{"- All topics -"}</Typography>
          </Link>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="All topic list modal"
            aria-describedby="Show list of all topics"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              mt: "10vh", // distance from top
            }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {"All topics here:"}
              </Typography>
              <Typography id="modal-modal-description">
                <List
                  sx={{
                    listStyleType: "disc", // Sets the general style
                    pl: 4, // Adds padding-left for proper marker visibility
                    "& .MuiListItem-root": {
                      display: "list-item",
                    },
                  }}
                >
                  {topics.map((topic) => (
                    <TopicListItem key={topic.id} topic={topic} />
                  ))}
                </List>
              </Typography>
            </Box>
          </Modal>
        </div>
      </Stack>
    </Card>
  );
}
