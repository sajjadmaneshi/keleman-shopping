export interface FaqModel {
  id: number;
  questioner: string;
  question: string;
  answer?: {
    text: string;
    date: string;
  };
  date: string;
}
