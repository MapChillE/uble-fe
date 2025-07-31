"use client";
import { Fragment, useState } from "react";
import FeedbackStatistics from "./FeedbackStatistics";
import { FeedbackData } from "@/types/feedback";
import FeedbackList from "./FeedbackList";
import Pagination from "./Pagination";

const PAGE_SIZE = 10;

const FeedbackContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  /** 향후 구현 fetching 함수 */
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["feedbacks", currentPage],
  //   queryFn: () => fetchFeedbacks(currentPage),
  //   keepPreviousData: true,
  // });
  const feedbackData: FeedbackData = {
    content: [
      {
        title: "UI 개선 요청",
        content: "지도에서 핀을 더 크게 해주세요.",
        score: 4,
        createdAt: "2025-07-31T05:20:49.219Z",
        nickname: "오잉",
      },
      {
        title: "서비스가 정말 좋아요!",
        content:
          "지도에서 제휴처를 쉽게 찾을 수 있어서 너무 편리합니다. 할인 혜택도 잘 적용되고 있어요.",
        score: 5,
        createdAt: "2025-07-30T14:30:22.123Z",
        nickname: "김민수",
      },
    ],
    totalCount: 30,
    totalPages: 3,
  };
  return (
    <Fragment>
      <FeedbackStatistics feedbackData={feedbackData} currentPage={currentPage} />
      <FeedbackList feedbacks={feedbackData.content} />
      <Pagination
        currentPage={currentPage}
        totalPages={feedbackData.totalPages}
        onPageChange={setCurrentPage}
      />
    </Fragment>
  );
};

export default FeedbackContainer;
