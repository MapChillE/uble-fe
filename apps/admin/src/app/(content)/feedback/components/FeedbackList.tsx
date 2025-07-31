import { Feedback } from "@/types/feedback";
import { Star } from "lucide-react";
import FeedbackListItem from "./FeedbackListItem";

interface FeedbackListProps {
  feedbacks: Feedback[];
}
const FeedbackList = ({ feedbacks }: FeedbackListProps) => {
  return (
    <div className="space-y-4">
      {feedbacks.map((item, idx) => (
        <FeedbackListItem feedback={item} key={idx} />
      ))}
    </div>
  );
};

export default FeedbackList;
