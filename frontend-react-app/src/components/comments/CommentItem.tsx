import Comment from "../../types/Comment";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import React from "react";

import { FormatDateHelper } from "../../utils/FormatDateHelper";
import { useAuth } from "../../context/AuthContext";

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  const { user, isAuthenticated } = useAuth();
  const isOwner = isAuthenticated && user?.id === comment.author_id;

  // controls comment option menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                <MenuItem onClick={handleClose}>{"Delete"}</MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
