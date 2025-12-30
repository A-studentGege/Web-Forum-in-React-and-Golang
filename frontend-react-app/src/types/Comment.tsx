type Comment = {
  id: number;
  postID: number;
  content: string;
  //   author_id: number;
  author: string;
  createdAt: Date;
};

export default Comment;
