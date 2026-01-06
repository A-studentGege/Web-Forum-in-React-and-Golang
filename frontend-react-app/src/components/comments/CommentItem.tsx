import Comment from "../../types/Comment";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import React from "react";

import { FormatDateHelper } from "../../utils/FormatDateHelper";
import { useAuth } from "../../context/AuthContext";
import { deleteComment } from "../../services/commentService";

type Props = {
  comment: Comment;
  onDeleted: () => void;
};

export default function CommentItem({ comment, onDeleted }: Props) {
  const { token, user, isAuthenticated } = useAuth();
  const isOwner = isAuthenticated && user?.id === comment.author_id;

  // controls the confirm dialog
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  // controls comment option menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // when user clicks delete, send delete req
  const handleDelete = async () => {
    setConfirmOpen(false);

    try {
      await deleteComment(comment.id, token!);
      onDeleted(); // trigger refresh on parent component CommentList
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ textAlign: "left", p: 3 }}>
        <Stack direction={"row"} alignItems={"flex-start"}>
          <Stack direction={"column"} alignItems={"start"} width={0.98}>
            <Typography
              variant="body1"
              component="p"
              sx={{ display: "block", py: 1 }}
            >
              {comment.content}
            </Typography>
            <Typography variant="caption">~ {comment.author}</Typography>
            <Typography variant="caption">
              At {FormatDateHelper(new Date(comment.created_at))}
            </Typography>
          </Stack>

          {/* only show comment options if current user is the comment's owner */}
          {isOwner && (
            <>
              <IconButton
                aria-label="open comment options"
                id="comment-option-button"
                aria-controls={open ? "comment-option-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="comment-option-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "comment-option-button",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleClose}>{"Edit"}</MenuItem>
                <MenuItem
                  onClick={() => {
                    setConfirmOpen(true);
                  }}
                >
                  {"Delete"}
                </MenuItem>

                {/* delete confirmation dialog */}
                <Dialog
                  open={confirmOpen}
                  onClose={() => setConfirmOpen(false)}
                >
                  <DialogTitle>{"Delete Comment"}</DialogTitle>

                  <DialogContent>
                    <DialogContentText whiteSpace={"pre-line"}>
                      {
                        "Are you sure you want to delete this comment?\nThis action cannot be undone."
                      }
                    </DialogContentText>
                  </DialogContent>

                  <DialogActions>
                    <Button
                      onClick={() => {
                        setConfirmOpen(false);
                        handleClose();
                      }}
                    >
                      {"Cancel"}
                    </Button>

                    <Button color="error" onClick={handleDelete}>
                      {"Delete"}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Menu>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
