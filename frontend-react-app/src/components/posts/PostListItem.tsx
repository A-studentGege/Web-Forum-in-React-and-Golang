import { Stack, Card, Typography, Chip, Link } from "@mui/material";

import { makePostPreview } from "@/utils/makePostPreview";
import { getContrastTextColor } from "@/utils/getContrastTextColor";

import Post from "@/types/Post";

type Props = {
  post: Post;
};

export default function PostListItem({ post }: Props) {
  return (
    <div>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h5" component="div">
            <Link href={"/post/" + post.id} underline="hover" color={"inherit"}>
              {post.title}
            </Link>
          </Typography>

          <Chip
            label={post.topic}
            sx={{
              backgroundColor: post.topic_color,
              color: getContrastTextColor(post.topic_color),
              ml: 1,
            }}
          />
        </Stack>

        <Typography variant="body2">{makePostPreview(post.content)}</Typography>
      </Card>
    </div>
  );
}
