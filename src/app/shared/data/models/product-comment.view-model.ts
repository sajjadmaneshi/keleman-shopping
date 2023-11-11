export interface ProductCommentViewModel {
  dateTime: string;
  comment: string;
  id: number;
  user: {
    firstname: string;
    lastname: string;
    profilePicture: string;
  };
}
