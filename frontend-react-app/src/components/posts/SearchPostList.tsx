import { usePostsByKeyword } from "@/hooks/usePostsByKeyword";

import LoadingState from "@/components/states/LoadingState";
import PostList from "@/components/posts/PostList";

type Props = {
  keyword: string;
};

/**
 * Renders a list of forum posts filtered by keyword.
 *
 * @param props.keyword - search keyword from URL query param
 */
export default function SearchPostList({ keyword }: Props) {
  const { posts, loading } = usePostsByKeyword(keyword);

  if (loading) {
    return <LoadingState message="Looking for relevant posts..." />;
  }

  return (
    <PostList posts={posts} title={"Search Result for [" + keyword + "]"} />
  );
}
