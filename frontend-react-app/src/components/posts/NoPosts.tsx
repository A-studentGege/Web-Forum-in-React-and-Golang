import EmptyState from "@/components/states/EmptyState";

export default function NoPosts() {
  return (
    <EmptyState
      title="No posts yet..."
      message="Be the first one to post something!"
    />
  );
}
