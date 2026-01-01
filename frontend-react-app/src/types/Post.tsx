import { ChipProps } from "@mui/material/Chip";

type Post = {
  id: number;
  author: string;
  title: string;
  content: string;
  topic: string;
  // topicColor: ChipProps["color"];
  // topicColor: string;
  createdAt: Date;
};

export default Post;
