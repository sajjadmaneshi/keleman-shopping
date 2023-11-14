export interface FaqViewModel {
  id: number;
  text: string;
  user: Questioner;
  answer: {
    text: string;
  };
  dateTime: string;
}

export interface Questioner {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}
