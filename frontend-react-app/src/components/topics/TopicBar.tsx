import { useState } from "react";

import {
  Button,
  Stack,
  Card,
  Typography,
  Modal,
  Box,
  List,
  Divider,
} from "@mui/material";

import { useTopics } from "@/hooks/useTopics";
import { useAuth } from "@/context/AuthContext";

import TopicListItem from "@/components/topics/TopicListItem";
import TopicManageList from "@/components/topics/TopicManageList";

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
  const { topics, refetch } = useTopics();
  const { user } = useAuth();
  const isAdmin = user?.is_admin === true;

  // control all topic list opening
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // control manage topic modal open
  const [manageOpen, setManageOpen] = useState(false);
  const handleManageOpen = () => setManageOpen(true);
  const handleManageClose = () => setManageOpen(false);

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

        <Button onClick={handleOpen} color={"inherit"}>
          {"- All topics -"}
        </Button>

        <div>
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

        {/* admin-only topic management modal */}
        {isAdmin && (
          <>
            <Button variant="contained" onClick={handleManageOpen}>
              {"Manage Topics"}
            </Button>
            <TopicManageList
              open={manageOpen}
              onClose={handleManageClose}
              topics={topics}
              onRefresh={refetch}
            />
          </>
        )}
      </Stack>
    </Card>
  );
}
