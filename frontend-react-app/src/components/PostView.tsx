import Post from "../types/Post";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";

import React from "react";

import { FormatDateHelper } from "../utils/FormatDateHelper";

export default function PostView() {
  const post: Post[] = [
    {
      id: 1,
      author: "John Doe",
      title: "Why is windows so problematic??",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      topic: "Technology",
      // topicColor: "primary",
      createdAt: new Date("2025-12-17T20:30:00"),
    },
  ];

  return (
    <Card variant="outlined">
      <CardContent sx={{ textAlign: "left", py: 2, px: 3 }}>
        <Stack direction={"row"} spacing={1} sx={{ py: 1 }} alignItems="center">
          <Typography variant="h4" component="h1">
            {post[0].title}
            <Chip label={post[0].topic} color={"primary"} />
            {/* for long title, chip still sticks at the end of text */}
          </Typography>
        </Stack>

        <Divider />

        <Typography variant="body1" component={"p"} sx={{ py: 2 }}>
          {post[0].content}
        </Typography>

        <Stack direction={"column"} alignItems={"end"}>
          <Typography variant="caption">{"~ " + post[0].author}</Typography>
          <Typography variant="caption">
            At {FormatDateHelper(post[0].createdAt)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
