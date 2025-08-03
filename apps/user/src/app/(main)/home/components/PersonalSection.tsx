"use client";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import useUserStore from "@/store/useUserStore";
import { useLocationStore } from "@/store/useLocationStore";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPersonalRecommend } from "@/service/brand";
import { useRouter } from "next/navigation";
import SectionSkeleton from "./ui/SectionSkeleton";
import SectionError from "./ui/SectionError";
import EmptyRecommend from "./ui/EmptyRecommend";
import Image from "next/image";

const PersonalSection = () => {
  const nickname = useUserStore((state) => state?.user?.nickname);
  const { currentLocation } = useLocationStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["personalRecommend", currentLocation],
    queryFn: ({ queryKey }) => {
      const [, location] = queryKey;
      if (!location) return Promise.resolve(null);
      return fetchPersonalRecommend(location as [number, number]);
    },
    enabled: !!currentLocation,
  });
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!currentLocation) {
    return <SectionSkeleton />;
  }

  if (isLoading) {
    // Skeleton UI
    return <SectionSkeleton />;
  }

  if (isError || !data) {
    // 사용자 친화적 에러 UI
    return <SectionError />;
  }
  const { recommendationsList } = data.data;
  // useEffect(() => {
  //   console.log(recommendationsList);
  // }, [recommendationsList]);
  return (
    <div className="relative pt-4">
      <SectionHeader
        title={`${nickname ? nickname : "회원"}님을 위한 혜택`}
        isScroll
        Scrollref={scrollContainerRef}
      />
      <div className="left-55 z-3 absolute -top-3 -translate-x-1/2">
        <Image src="/assets/uble_character_hi.png" alt="Uble character" width={80} height={80} />
      </div>

      <div className="space-y-4 p-4">
        {/*  rounded-xl bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 shadow-sm*/}
        <div
          className="scrollbar-hide flex gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          ref={scrollContainerRef}
        >
          {recommendationsList.length === 0 ? (
            <EmptyRecommend>
              아직 추천할 만한 제휴처가 없습니다.
              <br />
              서비스를 이용하시고 제휴처 추천을 받아보세요!
            </EmptyRecommend>
          ) : (
            recommendationsList.map((item) => (
              <DynamicCard
                data={item}
                key={item.brandId}
                onClick={() =>
                  router.push(
                    `/map?lat=${item.latitude}&lng=${item.longitude}&storeId=${item.storeId}`
                  )
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalSection;
