import { ChipProps } from "@mui/material/Chip";

type Post = {
  id: number;
  author: string;
  author_id: number;
  title: string;
  content: string;
  topic: string;
  // topicColor: ChipProps["color"];
  // topicColor: string;
  created_at: Date;
};

export default Post;
