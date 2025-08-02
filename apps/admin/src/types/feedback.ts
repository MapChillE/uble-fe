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
