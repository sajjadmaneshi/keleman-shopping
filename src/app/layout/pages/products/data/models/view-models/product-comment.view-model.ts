export interface ProductCommentViewModel {
  dateTime: string;
  comment: string;
  id: number;
  rate: number;
  user: Commenter;
}

export interface Commenter {
  id: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}
