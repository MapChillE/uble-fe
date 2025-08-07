"use client";
import { Fragment, useMemo, useState } from "react";
import BenefitStatistics from "./BenefitStatistics";
import BenefitListItem from "./BenefitListItem";
import PeriodFilter from "./PeriodFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsageHistory } from "@/service/usage";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { UsageHistoryData, UsageHistoryResponse } from "@/types/usage";
import useUserStore from "@/store/useUserStore";
import { UserInfo } from "@/types/profile";

const PAGE_SIZE = 10;

// 유저 정보 검증 함수
const validateUserInfo = (user: UserInfo | null) => {
  if (!user) {
    return { isValid: false, message: "로그인이 필요합니다." };
  }

  return { isValid: true, message: "" };
};

const BenefitList = () => {
  const now = new Date();
  const [year, setYear] = useState<number>(now.getFullYear());
  const [month, setMonth] = useState<number>(now.getMonth() + 1);
  const { user } = useUserStore();

  // 유저 정보 검증
  const userValidation = validateUserInfo(user);

  const queryKey = useMemo(() => ["usageHistory", year, month] as const, [year, month]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery<UsageHistoryResponse, Error>({
      queryKey,
      queryFn: ({ pageParam = 0 }) =>
        fetchUsageHistory(pageParam as number, PAGE_SIZE, year, month),
      getNextPageParam: ((lastPage: UsageHistoryResponse, allPages: UsageHistoryResponse[]) => {
        const historyList = lastPage.data?.historyList;
        if (!historyList || historyList.length === 0) return undefined;
        return allPages.length;
      }) as any,
      initialPageParam: 0,
      enabled: userValidation.isValid, // 유저 정보가 유효할 때만 쿼리 실행
    });

  const scrollRef = useInfiniteScroll({ hasNextPage: !!hasNextPage, fetchNextPage });
  const historyList = data?.pages ? data.pages.flatMap((page) => page.data.historyList ?? []) : [];
  const totalCount = data?.pages?.[0]?.data.totalCount ?? 0;

  // 유저 정보가 유효하지 않은 경우
  if (!userValidation.isValid) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="mb-2 text-lg font-semibold text-gray-900">{userValidation.message}</div>
          {!user && (
            <div className="text-sm text-gray-500">로그인 후 이용 내역을 확인할 수 있습니다.</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <PeriodFilter year={year} month={month} setYear={setYear} setMonth={setMonth} />
      <BenefitStatistics listSize={totalCount} />
      <div className="space-y-3 px-4 py-4">
        {isError && (
          <div className="py-8 text-center text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        )}
        {historyList.map((item: UsageHistoryData) => (
          <BenefitListItem data={item} key={item.id} />
        ))}
        <div ref={scrollRef} />
        {isFetchingNextPage && <div className="py-2 text-center text-gray-400">불러오는 중...</div>}
        {!isLoading && historyList.length === 0 && (
          <div className="py-8 text-center text-gray-400">이용 내역이 없습니다.</div>
        )}
      </div>
    </Fragment>
  );
};

export default BenefitList;
