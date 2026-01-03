import Post from "../../types/Post";
import PostListItem from "./PostListItem";
import NoPosts from "./NoPosts";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

type Props = {
  posts: Post[];
  title?: string;
};

export default function PostList({ posts, title = "Posts" }: Props) {
  if (posts === null) {
    return <NoPosts />;
  }

  return (
    <Card variant="outlined" sx={{ textAlign: "left", p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </Card>
  );
}
