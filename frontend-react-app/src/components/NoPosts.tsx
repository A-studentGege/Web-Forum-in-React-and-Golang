import EmptyState from "./states/EmptyState";

import React from "react";

export default function NoPosts() {
  return (
    <EmptyState
      title="No posts yet..."
      message="Be the first one to post something!"
    />
  );
}
