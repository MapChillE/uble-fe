"use client";
import { useQuery } from "@tanstack/react-query";

import { Fragment, useEffect, useRef, useState, useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import { fetchTimeRecommend } from "@/service/brand";
import { useRouter } from "next/navigation";
import SectionSkeleton from "./ui/SectionSkeleton";
import SectionError from "./ui/SectionError";
import EmptyRecommend from "./ui/EmptyRecommend";
import { DEFAULT_MESSAGE, TIME_MESSAGES } from "@/types/constants";

const TimeSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["timeRecommend"],
    queryFn: fetchTimeRecommend,
  });
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.getHours());
  }, []);

  // 현재 시간에 해당하는 시간대 메시지
  const timeMessage = useMemo(() => {
    const message =
      TIME_MESSAGES.find((timeSlot) => currentTime >= timeSlot.min && currentTime < timeSlot.max) ??
      DEFAULT_MESSAGE;

    return (
      <span>
        {message.firstLine},
        <br />
        {message.secondLine}
      </span>
    );
  }, [currentTime]);

  // 로딩 상태
  if (isLoading) {
    return <SectionSkeleton />;
  }

  // 에러 상태
  if (isError || !data) {
    return <SectionError />;
  }

  const { recommendationsList } = data.data;

  return (
    <Fragment>
      <div className="space-y-4">
        <SectionHeader title={timeMessage} isScroll Scrollref={scrollContainerRef} />
        <div
          className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          ref={scrollContainerRef}
        >
          {recommendationsList.length === 0 ? (
            <EmptyRecommend>
              아직 추천할 만한 제휴처가 없습니다.
              <br />곧 더 많은 추천 제휴처가 준비될 예정입니다!
            </EmptyRecommend>
          ) : (
            recommendationsList.map((item) => (
              <DynamicCard
                data={item}
                key={item.brandId}
                onClick={() => router.push(`/partnerships/${item.brandId}`)}
              />
            ))
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default TimeSection;
