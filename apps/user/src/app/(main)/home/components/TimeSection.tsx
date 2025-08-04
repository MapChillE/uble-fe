"use client";
import { useQuery } from "@tanstack/react-query";

import { Fragment, useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import { fetchTimeRecommend } from "@/service/brand";
import { useRouter } from "next/navigation";
import SectionSkeleton from "./ui/SectionSkeleton";
import SectionError from "./ui/SectionError";
import EmptyRecommend from "./ui/EmptyRecommend";

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

  // 로딩 상태
  if (isLoading) {
    return <SectionSkeleton />;
  }

  // 에러 상태
  if (isError || !data) {
    return <SectionError />;
  }

  const { recommendationsList } = data.data;

  // 시간대별 멘트 설정
  const getTimeMessage = () => {
    const timeMessages = {
      morning: (
        <span>
          상쾌한 아침,
          <br />
          기분 좋은 시작을 여는 인기 제휴처
        </span>
      ),
      lunch: (
        <span>
          활기찬 점심,
          <br />
          가장 북적이는 인기 제휴처는 어디일까요?
        </span>
      ),
      afternoon: (
        <span>
          여유로운 오후,
          <br />
          잠시 머물고 싶은 인기 제휴처
        </span>
      ),
      evening: (
        <span>
          따스한 저녁,
          <br />
          하루의 마침표를 찍는 인기 제휴처
        </span>
      ),
      night: (
        <span>
          하루의 끝,
          <br />
          마지막으로 사람들이 모이는 곳
        </span>
      ),
      dawn: (
        <span>
          고요한 새벽,
          <br />
          당신을 기다리는 특별한 제휴처
        </span>
      ),
      default: (
        <span>
          지금 이 시간,
          <br />
          이런 제휴처는 어떠세요?
        </span>
      ),
    };

    if (currentTime >= 0 && currentTime < 6) return timeMessages.dawn;
    if (currentTime >= 6 && currentTime < 10) return timeMessages.morning;
    if (currentTime >= 10 && currentTime < 14) return timeMessages.lunch;
    if (currentTime >= 14 && currentTime < 17) return timeMessages.afternoon;
    if (currentTime >= 17 && currentTime < 20) return timeMessages.evening;
    if (currentTime >= 20 && currentTime < 24) return timeMessages.night;

    return timeMessages.default;
  };

  return (
    <Fragment>
      <div className="space-y-4">
        <SectionHeader title={getTimeMessage()} isScroll Scrollref={scrollContainerRef} />
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
