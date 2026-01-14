import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import LoadingState from "../states/LoadingState";
import usePostByID from "../../hooks/usePostByID";
import { useAuth } from "../../context/AuthContext";
import PostOptionsMenu from "./PostOptionsMenu";

import { FormatDateHelper } from "../../utils/FormatDateHelper";
import { deletePost } from "../../services/postService";

export default function PostView() {
  const navigate = useNavigate();
  const { postID } = useParams<{ postID: string }>();
  const { post, loading } = usePostByID(postID);
  const { token, user, isAuthenticated } = useAuth();
  const isOwner =
    isAuthenticated && post !== null && user?.id === post.author_id;

  // controls the confirm dialog
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  // when user clicks delete, send delete req
  const handleDelete = async () => {
    setConfirmOpen(false);

    try {
      if (!postID) return;

      await deletePost(postID, token!);
      navigate("/", {
        replace: true,
        state: { snackbar: "Post deleted successfully" }, // carry snackbar message
      }); // direct to home page
    } catch (err) {
      console.error("Failed to delete post", err);
    }
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
          {isOwner && <PostOptionsMenu onDeleteConfirm={handleDelete} />}
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
