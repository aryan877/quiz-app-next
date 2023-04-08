export interface QuestionProps {
  _id: string;
  title: string;
  prompt: string;
  options?: {
    _id: string;
    title: string;
  }[];
}
