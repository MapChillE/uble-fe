"use client";
import { Fragment, useMemo, useState } from "react";
import BenefitStatistics from "./BenefitStatistics";
import BenefitListItem from "./BenefitListItem";
import PeriodFilter from "./PeriodFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsageHistory } from "@/service/usage";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { UsageHistoryData, UsageHistoryResponse } from "@/types/usage";
const PAGE_SIZE = 10;

const BenefitList = () => {
  const now = new Date();
  const [year, setYear] = useState<number>(now.getFullYear());
  const [month, setMonth] = useState<number>(now.getMonth() + 1);

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
    });

  const scrollRef = useInfiniteScroll({ hasNextPage: !!hasNextPage, fetchNextPage });
  const historyList = data?.pages ? data.pages.flatMap((page) => page.data.historyList ?? []) : [];
  const totalCount = data?.pages?.[0]?.data.totalCount ?? 0;

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
