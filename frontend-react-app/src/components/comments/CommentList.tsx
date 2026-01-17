import { useParams } from "react-router-dom";

import useCommentsByPostID from "../../hooks/useCommentsByPostID";
import LoadingState from "../states/LoadingState";
import CommentItem from "./CommentItem";
import NoComments from "./NoComments";

type Props = {
  refreshKey: number;
  onCommentDeleted: () => void;
  onCommentUpdated: () => void;
};

export default function CommentList({
  refreshKey,
  onCommentDeleted,
  onCommentUpdated,
}: Props) {
  const { postID } = useParams<{ postID: string }>();
  const { comments, loading } = useCommentsByPostID(postID, refreshKey); // retrieve comment list for the post

  if (loading) {
    return <LoadingState message="looking for the post..." />;
  }

  // handle case where the post has no comments
  if (comments === null) {
    return <NoComments />;
  }
  return (
    <>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDeleted={onCommentDeleted} // signal upward to CommentSection to refresh comment list
          onUpdated={onCommentUpdated}
        />
      ))}
    </>
  );
}
