import { useSearchParams } from "react-router-dom";

import MainLayout from "@/pages/layout/MainLayout";
import SearchPostList from "@/components/posts/SearchPostList";

export default function ViewPostByKeywordPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q");

  if (!keyword || keyword.trim() === "") {
    return (
      <MainLayout>
        <p>{"Search keyword is missing."}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SearchPostList keyword={keyword} />
    </MainLayout>
  );
}
