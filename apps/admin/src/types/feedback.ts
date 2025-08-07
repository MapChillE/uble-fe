import { ResponseStatus } from "./responseStatus";

export interface Feedback {
  title: string;
  content: string;
  score: number;
  createdAt: string;
  nickname: string;
}

export interface FeedbackData {
  content: Feedback[];
  totalCount: number;
  totalPages: number;
}

export interface FeedbackResponse extends ResponseStatus {
  data: FeedbackData;
}
