import CommentField from "./CommentField";
import CommentList from "./CommentList";

import React from "react";
import { useParams } from "react-router-dom";

type Props = {
  onCommentDeleted: () => void;
};

export default function CommentSection({ onCommentDeleted }: Props) {
  const { postID } = useParams<{ postID: string }>();
  const [refreshKey, setRefreshKey] = React.useState(0); // controls refresh of comment list
  const handleCommentDeleted = () => {
    setRefreshKey((prev) => prev + 1); // trigger refresh list after delete
    onCommentDeleted(); // notify page to show snackbar
  };

  if (!postID) return null;

  return (
    <>
      {/* when refreshKey increments from parent component, the hook runs again to get updated comment list */}
      <CommentField onCommentCreated={() => setRefreshKey((k) => k + 1)} />
      <CommentList
        refreshKey={refreshKey}
        onCommentDeleted={handleCommentDeleted}
        onCommentUpdated={() => setRefreshKey((k) => k + 1)} // refresh comment section
      />
    </>
  );
}
