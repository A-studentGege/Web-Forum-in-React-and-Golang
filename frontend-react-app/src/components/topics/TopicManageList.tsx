import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Typography,
  Modal,
  Box,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useAuth } from "@/context/AuthContext";
import { createTopic, deleteTopic } from "@/services/topicService";
import { isValidHexColorCode } from "@/utils/isValidHexColorCode";

import Topic from "@/types/Topic";

const style = {
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  maxHeight: "70vh",
  overflowY: "auto", // scroll inside box
};

type Props = {
  topics: Topic[];
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
};

const MAX_NAME = 30;

export default function TopicManageList({
  topics,
  open,
  onClose,
  onRefresh,
}: Props) {
  const navigate = useNavigate();
  const { token } = useAuth();

  // controls delete dialog open
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<number | null>(null);

  // initialize for new topic
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicColor, setNewTopicColor] = useState("#");

  const handleCreateTopic = async () => {
    if (!newTopicName) {
      alert("Please enter a topic name");
      return;
    }

    // topic name char check
    if (newTopicName.length > MAX_NAME) {
      alert(`Topic name cannot exceed ${MAX_NAME} characters`);
      return;
    }

    if (isValidHexColorCode(newTopicColor)) {
      alert(
        "The color code is invalid. \nIt should start with #, followed by 6 characters made by numbers 0-9 or letters A-F",
      );
      return;
    }

    const payload = {
      name: newTopicName,
      color: newTopicColor,
    };

    await createTopic(token!, payload);
    await onRefresh();

    setNewTopicName("");
    setNewTopicColor("#");

    // placeholder msg
    navigate("/", {
      replace: true,
      state: { snackbar: "Topic created successfully" }, // carry snackbar message
    }); // direct back to home page
  };

  const handleDeleteTopic = async (id: number) => {
    try {
      await deleteTopic(token!, id);
      await onRefresh();
    } catch (err) {
      console.log(err);
    }

    // placeholder msg
    navigate("/", {
      replace: true,
      state: { snackbar: "Topic deleted successfully" }, // carry snackbar message
    }); // direct back to home page
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="manage-topics-modal"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        mt: "10vh",
      }}
    >
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {" Manage Topics"}
        </Typography>

        {/* create a topic */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <TextField
            variant="standard"
            size="small"
            label="Topic name"
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
            error={newTopicName.length > MAX_NAME}
            fullWidth
          />

          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              variant="standard"
              size="small"
              label="Hex color"
              value={newTopicColor}
              onChange={(e) => setNewTopicColor(e.target.value)}
              placeholder="#AABBCC"
              sx={{ flex: 1 }}
              // validate hex code
              error={
                newTopicColor.length > 1 && isValidHexColorCode(newTopicColor)
              }
              helperText="Format: #RRGGBB"
            />

            {/* color preview */}
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: isValidHexColorCode(newTopicColor)
                  ? newTopicColor
                  : "transparent",
              }}
            />
          </Stack>
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            onClick={handleCreateTopic}
          >
            {"+ Create New Topic"}
          </Button>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* show all existing topics and delete button */}
        <Stack spacing={1}>
          {topics.map((topic) => (
            <Stack
              key={topic.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                p: 1,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {/* Topic info */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: topic.color,
                  }}
                />
                <Typography>{topic.name}</Typography>
              </Stack>

              {/* action buttons */}
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setTopicToDelete(topic.id); // delete the topic after confirm
                    setDeleteConfirmOpen(true);
                  }}
                >
                  {"Delete"}
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Dialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
        >
          <DialogTitle>{"Delete Topic"}</DialogTitle>
          <DialogContent>
            <DialogContentText whiteSpace="pre-line">
              {`Are you sure you want to delete this topic?\n
                All existing posts will be deleted too.\n
                This action cannot be undone.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(false)}>
              {"Cancel"}
            </Button>
            <Button
              color="error"
              onClick={() => {
                if (topicToDelete !== null) {
                  handleDeleteTopic(topicToDelete);
                }
                setDeleteConfirmOpen(false);
                onClose();
              }}
            >
              {"Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
}
