export interface UserQuestionViewModel {
  id: number;
  text: string;
  answer: {
    text: string;
  };
  product: {
    name: string;
    thumbnailImage: string;
  };
  dateTime: string;
}
