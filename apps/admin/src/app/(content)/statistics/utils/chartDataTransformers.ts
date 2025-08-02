import {
  ClickRankApiResponse,
  InterestRankApiResponse,
  UsageRankApiResponse,
  LocalRankApiResponse,
  KeywordsRankResponse,
  RankData,
  InterestRankData,
  InterestRankItem,
} from "@/types/rank";

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth?: number;
    borderRadius?: number;
    tension?: number;
    fill?: boolean;
    pointRadius?: number;
    pointHoverRadius?: number;
  }[];
}

// 클릭 랭킹 차트 데이터 변환
export const transformClickData = (data: ClickRankApiResponse["data"]): ChartData | null => {
  if (!data.clickRankList) return null;

  return {
    labels: data.clickRankList.map((item: RankData) => item.name),
    datasets: [
      {
        label: "클릭 수",
        data: data.clickRankList.map((item: RankData) => item.count),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };
};

// 이용 랭킹 차트 데이터 변환
export const transformUsageData = (data: UsageRankApiResponse["data"]): ChartData | null => {
  if (!data.usageRankList) return null;

  return {
    labels: data.usageRankList.map((item: RankData) => item.name),
    datasets: [
      {
        label: "이용 수",
        data: data.usageRankList.map((item: RankData) => item.count),
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };
};

// 로컬 랭킹 차트 데이터 변환
export const transformLocalData = (data: LocalRankApiResponse["data"]): ChartData | null => {
  if (!data.usageRankList) return null;

  return {
    labels: data.usageRankList.map((item: RankData) => item.name),
    datasets: [
      {
        label: "이용 수",
        data: data.usageRankList.map((item: RankData) => item.count),
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };
};

// 관심도 변화 차트 데이터 변환
export const transformInterestChangeData = (
  data: InterestRankApiResponse["data"]
): ChartData | null => {
  if (!data.interestRankList || data.interestRankList.length === 0) return null;

  // 날짜별로 정렬
  const sortedData = data.interestRankList.sort(
    (a: InterestRankItem, b: InterestRankItem) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // 날짜 라벨 생성 (월-일 형식)
  const labels = sortedData.map((item: InterestRankItem) => {
    const date = new Date(item.date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  // 모든 브랜드 이름 수집
  const allBrands = new Set<string>();
  sortedData.forEach((dateItem: InterestRankItem) => {
    dateItem.rankList.forEach((brand: InterestRankData) => {
      allBrands.add(brand.name);
    });
  });

  // 각 브랜드별로 데이터셋 생성
  const colors: string[] = [
    "rgba(59, 130, 246, 1)", // blue
    "rgba(34, 197, 94, 1)", // green
    "rgba(251, 191, 36, 1)", // yellow
    "rgba(239, 68, 68, 1)", // red
    "rgba(168, 85, 247, 1)", // purple
    "rgba(249, 115, 22, 1)", // orange
    "rgba(6, 182, 212, 1)", // cyan
    "rgba(236, 72, 153, 1)", // pink
    "rgba(34, 197, 94, 1)", // emerald
    "rgba(139, 92, 246, 1)", // violet
  ];

  const datasets = Array.from(allBrands).map((brandName, index) => {
    const brandData = sortedData.map((dateItem: InterestRankItem) => {
      const brandItem = dateItem.rankList.find(
        (brand: InterestRankData) => brand.name === brandName
      );
      return brandItem ? brandItem.totalScore : 0;
    });

    const color = colors[index % colors.length] || colors[0];
    return {
      label: brandName,
      data: brandData,
      borderColor: color as string,
      backgroundColor: (color as string).replace("1)", "0.1)"),
      tension: 0.4,
      fill: false,
      pointRadius: 4,
      pointHoverRadius: 6,
    };
  });

  return {
    labels,
    datasets,
  };
};

// 키워드 차트 데이터 변환 (daily-top, empty-top)
export const transformKeywordsData = (
  data: KeywordsRankResponse,
  selectedDate?: string
): ChartData | null => {
  if (!data.rankList) return null;

  // 중첩된 구조인 경우 (daily-top, empty-top)
  if (Array.isArray(data.rankList) && data.rankList.length > 0 && data.rankList[0]?.date) {
    // 날짜별로 정렬
    const sortedData = data.rankList.sort(
      (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // 선택된 날짜 또는 가장 최근 날짜 사용
    const targetDate = selectedDate || sortedData[sortedData.length - 1]?.date;
    const selectedDateData = sortedData.find((item: any) => item.date === targetDate);

    if (selectedDateData) {
      const topKeywords = selectedDateData.rankList
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 10); // 상위 10개

      return {
        labels: topKeywords.map((keyword: any) => keyword.name),
        datasets: [
          {
            label: `검색 횟수 (${targetDate})`,
            data: topKeywords.map((keyword: any) => keyword.count),
            backgroundColor: "rgba(249, 115, 22, 0.8)",
            borderColor: "rgba(249, 115, 22, 1)",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      };
    }
  } else {
    // 일반적인 구조인 경우 (local 등)
    return {
      labels: data.rankList.map((item: any) => item.name),
      datasets: [
        {
          label: "검색 횟수",
          data: data.rankList.map((item: any) => item.count),
          backgroundColor: "rgba(249, 115, 22, 0.8)",
          borderColor: "rgba(249, 115, 22, 1)",
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  }

  return null;
};

// 기본 차트 데이터 (데이터가 없을 때)
export const getDefaultChartData = (): ChartData => {
  return {
    labels: ["데이터 없음"],
    datasets: [
      {
        label: "데이터",
        data: [0],
        backgroundColor: "rgba(156, 163, 175, 0.8)",
        borderColor: "rgba(156, 163, 175, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };
};

// 키워드 차트용 날짜 목록 가져오기
export const getKeywordsDateList = (data: any): { date: string; formattedDate: string }[] => {
  if (
    !data.rankList ||
    !Array.isArray(data.rankList) ||
    data.rankList.length === 0 ||
    !data.rankList[0].date
  ) {
    return [];
  }

  const sortedData = data.rankList.sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return sortedData.map((item: any) => {
    const date = new Date(item.date);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return {
      date: item.date,
      formattedDate,
    };
  });
};
