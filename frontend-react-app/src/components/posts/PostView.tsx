import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Stack,
} from "@mui/material";

import usePostByID from "@/hooks/usePostByID";
import { useAuth } from "@/context/AuthContext";
import { formatDateHelper } from "@/utils/formatDateHelper";
import { deletePost, updatePost } from "@/services/postService";
import { getContrastTextColor } from "@/utils/getContrastTextColor";

import LoadingState from "@/components/states/LoadingState";
import PostOptionsMenu from "@/components/posts/PostOptionsMenu";

type Props = {
  onPostUpdated: () => void;
};

export default function PostView({ onPostUpdated }: Props) {
  const navigate = useNavigate();
  const { postID } = useParams<{ postID: string }>();
  const { post, loading, refresh } = usePostByID(postID);
  const { token, user, isAuthenticated } = useAuth();
  const isOwner =
    isAuthenticated && post !== null && user?.id === post.author_id;

  // when user clicks delete, send delete req
  const handleDelete = async () => {
    try {
      if (!postID) return;

      await deletePost(postID, token!);
      navigate(
        "/", // direct to home page
        {
          replace: true,
          state: { snackbar: "Post deleted successfully" }, // carry snackbar message
        },
      );
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  // handles post update req
  const handleUpdate = async (title: string, content: string) => {
    try {
      if (!postID) return;

      if (title === "" || content === "") {
        alert("Title or content cannot be empty...");
        refresh();
        return;
      }

      await updatePost(postID, token!, { content: content, title: title });
      onPostUpdated(); // trigger snackbar msg
      refresh(); // refresh post details
    } catch (err) {
      console.error("Failed to update post", err);
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

            <Chip
              label={post.topic}
              sx={{
                backgroundColor: post.topic_color,
                color: getContrastTextColor(post.topic_color),
                ml: 1,
              }}
            />
            {/* for long title, chip still sticks at the end of text */}
          </Typography>

          {/* only show post option menu when curr user is post owner */}
          {isOwner && (
            <PostOptionsMenu
              onDeleteConfirm={handleDelete}
              onEditConfirm={handleUpdate}
              postTitle={post.title}
              postContent={post.content}
            />
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
            At {formatDateHelper(new Date(post.created_at))}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
