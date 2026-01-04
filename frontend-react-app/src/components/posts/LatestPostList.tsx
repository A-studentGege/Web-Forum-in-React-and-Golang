import { useLatestPosts } from "../../hooks/useLatestPosts";
import LoadingState from "../states/LoadingState";
import PostList from "./PostList";

export default function LatestPostList() {
  const { posts, loading } = useLatestPosts();

  if (loading) {
    return <LoadingState message="receiving latest posts..." />;
  }
  return <PostList posts={posts} title="Latest" />;
}
