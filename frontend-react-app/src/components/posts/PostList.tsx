import { Typography, Card } from "@mui/material";

import PostListItem from "@/components/posts/PostListItem";
import NoPosts from "@/components/posts/NoPosts";

import Post from "@/types/Post";

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
