import { useParams } from "react-router-dom";

import { usePostsByTopic } from "@/hooks/usePostsByTopic";
import LoadingState from "@/components/states/LoadingState";
import PostList from "@/components/posts/PostList";

export default function ByTopicPostList() {
  const { topicID } = useParams<{ topicID: string }>();
  const { posts, topicName, loading } = usePostsByTopic(topicID);

  // show loading page when components not ready
  if (loading) {
    return <LoadingState />;
  }

  return <PostList posts={posts} title={topicName || "By topic"} />;
}
