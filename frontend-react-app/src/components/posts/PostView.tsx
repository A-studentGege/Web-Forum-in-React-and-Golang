import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import React from "react";
import { useParams } from "react-router-dom";

import LoadingState from "../states/LoadingState";
import usePostByID from "../../hooks/usePostByID";
import { useAuth } from "../../context/AuthContext";

import { FormatDateHelper } from "../../utils/FormatDateHelper";

export default function PostView() {
  const { postID } = useParams<{ postID: string }>();
  const { post, loading } = usePostByID(postID);
  const { user, isAuthenticated } = useAuth();
  const isOwner =
    isAuthenticated && post !== null && user?.id === post.author_id;

  // controls comment option menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // if post is not ready, show loading for early return
  if (!post || loading) {
    return <LoadingState message="looking for the post..." />;
  }

  return (
    <Card variant="outlined">
      <CardContent sx={{ textAlign: "left", py: 2, px: 3 }}>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ py: 1 }}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Typography variant="h4" component="h1">
            {post.title}
            <Chip label={post.topic} color={"primary"} sx={{ ml: 1 }} />
            {/* for long title, chip still sticks at the end of text */}
          </Typography>

          {/* only show post option menu when curr user is post owner */}
          {isOwner && (
            <>
              <IconButton
                aria-label="open post options"
                id="post-option-button"
                aria-controls={open ? "post-option-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="post-option-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "post-option-button",
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

        <Divider />

        <Typography
          variant="body1"
          component={"p"}
          sx={{ py: 2, whiteSpace: "pre-line" }}
        >
          {post.content}
        </Typography>

        <Stack direction={"column"} alignItems={"end"}>
          <Typography variant="caption">{"~ " + post.author}</Typography>
          <Typography variant="caption">
            At {FormatDateHelper(new Date(post.created_at))}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
