"use client";
import { fetchUserStatistics } from "@/service/user";
import { StaticsPreviewResponse, UserStatistics } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import { BarChart3 } from "lucide-react";
import { Fragment } from "react";

const ProfileStatistics = () => {
  const month = new Date().getMonth() + 1;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userStatistics"] as const,
    queryFn: fetchUserStatistics,
    select: (res: StaticsPreviewResponse) => res.data,
  });

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <BarChart3 className="h-6 w-6 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-600">{`${month}월 통계 로딩 중…`}</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        {`${month}월 통계를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.`}
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-gray-500">{`${month}월 통계 데이터가 없습니다.`}</div>;
  }

  const { monthlyUsedCount, mostUsedBrandName, mostUsedCategoryName } = data;

  // 아직 한 번도 사용한 카테고리가 없을 때
  if (mostUsedCategoryName === null) {
    return (
      <Fragment>
        <div className="mb-4 flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">{`나의 ${month}월 통계`}</h3>
        </div>
        <div className="flex h-20 flex-col items-center justify-center space-y-1 text-center">
          <p>{month}월엔 아직 혜택을 사용하지 않으셨네요!</p>
          <p>지도에서 주변 혜택을 찾아보세요!</p>
        </div>
      </Fragment>
    );
  }

  // 정상 렌더링
  return (
    <Fragment>
      <div className="mb-4 flex items-center space-x-2">
        <BarChart3 className="h-5 w-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">{`나의 ${month}월 통계`}</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{`최고의 카테고리`}</span>
          <span className="text-sm font-semibold text-gray-900">{mostUsedCategoryName}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{`나를 사로잡은 브랜드`}</span>
          <span className="text-sm font-semibold text-gray-900">{mostUsedBrandName}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{`내가 받은 혜택 수`}</span>
          <span className="text-sm font-semibold text-gray-900">{monthlyUsedCount} 회</span>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileStatistics;
