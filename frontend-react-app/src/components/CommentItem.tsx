import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import React from "react";
import Comment from "../types/Comment";
import { FormatDateHelper } from "../utils/FormatDateHelper";

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
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
              At {FormatDateHelper(comment.createdAt)}
            </Typography>
          </Stack>

          <IconButton aria-label="open comment actions">
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
