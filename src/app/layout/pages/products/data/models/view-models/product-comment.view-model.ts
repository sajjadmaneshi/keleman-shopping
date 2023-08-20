export interface ProductCommentViewModel {
  dateTime: string;
  comment: string;
  id: number;
  user: Commenter;
}

export interface Commenter {
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}
