import EmptyState from "../states/EmptyState";

import React from "react";

export default function NoComments() {
  return (
    <EmptyState
      title="No comments yet..."
      message="Wanna share your idea with more?"
    />
  );
}
