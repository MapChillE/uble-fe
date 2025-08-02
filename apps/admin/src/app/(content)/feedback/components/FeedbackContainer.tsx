"use client";
import { Fragment, useState } from "react";
import FeedbackStatistics from "./FeedbackStatistics";
import FeedbackList from "./FeedbackList";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchFeedbackList } from "@/service/feedback";
import FeedbackSkeleton from "./ui/FeedbackSkeleton";
import FeedbackError from "./ui/FeedbackError";

const FeedbackContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  /** 향후 구현 fetching 함수 */
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["feedbacks", currentPage],
    queryFn: () => fetchFeedbackList(currentPage - 1),
  });

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
      <FeedbackStatistics totalCount={totalCount} />
      <FeedbackList feedbacks={content} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </Fragment>
  );
};

export default FeedbackContainer;
