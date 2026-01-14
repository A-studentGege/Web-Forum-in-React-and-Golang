import Comment from "../../types/Comment";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import React from "react";

import { FormatDateHelper } from "../../utils/FormatDateHelper";
import { useAuth } from "../../context/AuthContext";
import { deleteComment } from "../../services/commentService";
import CommentOptionsMenu from "./CommentOptionsMenu";

type Props = {
  comment: Comment;
  onDeleted: () => void;
};

export default function CommentItem({ comment, onDeleted }: Props) {
  const { token, user, isAuthenticated } = useAuth();
  const isOwner = isAuthenticated && user?.id === comment.author_id;

  // controls comment option menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // controls the confirm dialog
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const open = Boolean(anchorEl);

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
          {isOwner && <CommentOptionsMenu onDeleteConfirm={handleDelete} />}
        </Stack>
      </CardContent>
    </Card>
  );
}
