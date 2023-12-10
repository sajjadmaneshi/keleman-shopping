export interface UserCommentViewModel {
  id: number;
  date: string;
  comment: string;
  allowToShow: boolean;
  product: {
    name: string;
    thumbnailImage: string;
  };
}
