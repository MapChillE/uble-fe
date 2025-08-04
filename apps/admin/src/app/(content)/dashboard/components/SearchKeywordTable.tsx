import React from "react";
import { RankItem } from "@/types/dashboard";
import ChartCard from "./ui/ChartCard";

// 숫자 포맷팅 함수
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

interface SearchKeywordTableProps {
  topSearchKeywordList: RankItem[];
}

const SearchKeywordTable: React.FC<SearchKeywordTableProps> = ({ topSearchKeywordList }) => {
  // 순위별 배경색 클래스
  const getRankClass = (index: number) => {
    if (index === 0) {
      return "bg-yellow-100 text-yellow-700"; // 1위: 금색
    } else if (index === 1) {
      return "bg-gray-200 text-gray-700"; // 2위: 은색
    } else if (index === 2) {
      return "bg-orange-100 text-orange-700"; // 3위: 동색
    } else {
      return "bg-gray-100 text-gray-600"; // 4위 이하: 회색
    }
  };

  return (
    <ChartCard title="상위 10개 검색어" fixedHeight={false}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">순위</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">검색어</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">검색 횟수</th>
            </tr>
          </thead>
          <tbody>
            {topSearchKeywordList.slice(0, 10).map((keyword, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${getRankClass(
                      index
                    )}`}
                  >
                    {index + 1}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{keyword.name}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                  {formatNumber(keyword.count)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
};

export default SearchKeywordTable;
