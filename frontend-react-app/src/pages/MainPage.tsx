import LatestPostList from "../components/posts/LatestPostList";
import MainLayout from "./layout/MainLayout";

import React from "react";

export default function MainPage() {
  return (
    <MainLayout>
      <LatestPostList />
    </MainLayout>
  );
}
