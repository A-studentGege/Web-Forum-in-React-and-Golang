import { useLatestPosts } from "@/hooks/useLatestPosts";

import LoadingState from "@/components/states/LoadingState";
import PostList from "@/components/posts/PostList";

export default function LatestPostList() {
  const { posts, loading } = useLatestPosts();

  if (loading) {
    return <LoadingState message="receiving latest posts..." />;
  }
  return <PostList posts={posts} title="Latest" />;
}
