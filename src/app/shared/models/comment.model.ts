export interface CommentModel {
  commenter: string;
  comment: string;
  date: string;
  status: CommentStatus;
}

export enum CommentStatus {
  good,
  middle,
  bad,
}
