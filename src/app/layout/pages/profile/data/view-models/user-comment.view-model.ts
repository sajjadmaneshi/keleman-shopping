export interface UserCommentViewModel {
  id: number;
  dateTime: string;
  comment: string;
  allowToShow: boolean;
  product: {
    name: string;
    thumbnailImage: string;
  };
}
