import ByTopicPostList from "../components/posts/ByTopicPostList";
import MainLayout from "./layout/MainLayout";

import React from "react";

export default function ViewPostByTopicPage() {
  return (
    <MainLayout>
      <ByTopicPostList />
    </MainLayout>
  );
}
