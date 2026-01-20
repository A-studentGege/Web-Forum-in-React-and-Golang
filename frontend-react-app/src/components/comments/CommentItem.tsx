import { Stack, Card, CardContent, Typography } from "@mui/material";

import { useAuth } from "@/context/AuthContext";
import { formatDateHelper } from "@/utils/formatDateHelper";
import { deleteComment, updateComment } from "@/services/commentService";

import CommentOptionsMenu from "@/components/comments/CommentOptionsMenu";

import Comment from "@/types/Comment";

type Props = {
  comment: Comment;
  onDeleted: () => void;
  onUpdated: () => void;
};

export default function CommentItem({ comment, onDeleted, onUpdated }: Props) {
  // extract auth info
  const { token, user, isAuthenticated } = useAuth();
  const isOwner = isAuthenticated && user?.id === comment.author_id;

  // when user clicks delete, send delete req
  const handleDelete = async () => {
    try {
      await deleteComment(comment.id, token!);
      onDeleted(); // trigger refresh on parent component CommentList
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  // when user clicks edit, send update req
  const handleEdit = async (content: string) => {
    try {
      await updateComment(comment.id, token!, { content: content });
      onUpdated();
    } catch (err) {
      console.error("Failed to update comment", err);
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
              At {formatDateHelper(new Date(comment.created_at))}
            </Typography>
          </Stack>

          {/* only show comment options if current user is the comment's owner */}
          {isOwner && (
            <CommentOptionsMenu
              onDeleteConfirm={handleDelete}
              onEditConfirm={handleEdit}
              commentContent={comment.content}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
