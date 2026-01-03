import Post from "../../types/Post";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { FormatDateHelper } from "../../utils/FormatDateHelper";

export default function PostView() {
  const { postID } = useParams<{ postID: string }>();
  const [post, setPost] = useState<Post[] | null>(null);

  // get post details by its id
  useEffect(() => {
    if (!postID) return;

    fetch(`http://localhost:8080/posts/${postID}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [postID]);

  // if post is not ready, show loading for early return
  if (!post) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {"Loading post..."}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <CardContent sx={{ textAlign: "left", py: 2, px: 3 }}>
        <Stack direction={"row"} spacing={1} sx={{ py: 1 }} alignItems="center">
          <Typography variant="h4" component="h1">
            {post[0].title}
            <Chip label={post[0].topic} color={"primary"} sx={{ ml: 1 }} />
            {/* for long title, chip still sticks at the end of text */}
          </Typography>
        </Stack>

        <Divider />

        <Typography
          variant="body1"
          component={"p"}
          sx={{ py: 2, whiteSpace: "pre-line" }}
        >
          {post[0].content}
        </Typography>

        <Stack direction={"column"} alignItems={"end"}>
          <Typography variant="caption">{"~ " + post[0].author}</Typography>
          <Typography variant="caption">
            At {FormatDateHelper(new Date(post[0].createdAt))}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
