"use client";
import { Fragment, useState, useRef, useEffect } from "react";
import FeedbackStatistics from "./FeedbackStatistics";
import FeedbackList from "./FeedbackList";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchFeedbackList } from "@/service/feedback";
import FeedbackSkeleton from "./ui/FeedbackSkeleton";
import FeedbackError from "./ui/FeedbackError";

const FeedbackContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackListRef = useRef<HTMLDivElement>(null);

  /** 향후 구현 fetching 함수 */
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["feedbacks", currentPage],
    queryFn: () => fetchFeedbackList(currentPage - 1),
  });

  // currentPage가 바뀔 때마다 FeedbackList의 최상단으로 스크롤
  useEffect(() => {
    if (feedbackListRef.current) {
      feedbackListRef.current.scrollIntoView({
        block: "start",
      });
    }
  }, [currentPage]);

  if (isLoading) {
    return <FeedbackSkeleton />;
  }

  if (isError || !data) {
    return <FeedbackError refetch={refetch} />;
  }
  console.log(data.data.totalCount);
  const { content, totalCount, totalPages } = data.data;
  return (
    <Fragment>
      <div ref={feedbackListRef}>
        <FeedbackStatistics totalCount={totalCount} />
      </div>
      <FeedbackList feedbacks={content} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </Fragment>
  );
};

export default FeedbackContainer;
