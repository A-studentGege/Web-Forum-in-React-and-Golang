import Post from "../../types/Post";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";

import React from "react";

import { MakePostPreview } from "../../utils/MakePostPreview";

type Props = {
  post: Post;
};

export default function PostListItem({ post }: Props) {
  return (
    <div>
      {/* use inline sx prop for react, p for padding m for margin; there are pt/px/mb */}
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h5" component="div">
            <Link href={"/post/" + post.id} underline="hover" color={"inherit"}>
              {post.title}
            </Link>
          </Typography>
          <Chip label={post.topic} color={"primary"} sx={{ ml: 1 }} />
          {/* <Chip label={post.topic} sx={{ ml: 1, backgroundColor: post.topicColor, color: "#fff" }} /> */}
        </Stack>

        <Typography variant="body2">{MakePostPreview(post.content)}</Typography>
      </Card>
    </div>
  );
}
