export interface Comment {
  id: number;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  productId: number | null;
  articleId: number | null;
}
