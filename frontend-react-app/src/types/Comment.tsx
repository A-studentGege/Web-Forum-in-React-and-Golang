type Comment = {
  id: number;
  post_id: number;
  content: string;
  author_id: number;
  author: string;
  created_at: Date;
};

export default Comment;
