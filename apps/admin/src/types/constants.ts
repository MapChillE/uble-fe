export const filterOptions = {
  rankTarget: ["BRAND", "CATEGORY"] as const,
  gender: ["MALE", "FEMALE", null] as const,
  ageRange: [10, 20, 30, 40, 50, 60, 70, null] as const,
  rank: ["NORMAL", "PREMIUM", "VIP", "VVIP", null] as const,
  benefitType: ["VIP", "LOCAL", "NORMAL", null] as const,
};

export type StatisticsFilterOption = typeof filterOptions;

import { ChartOptions } from "chart.js";

export const barOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: { size: 12 },
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "white",
      bodyColor: "white",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 } },
    },
    y: {
      beginAtZero: true,
      grid: { color: "rgba(0, 0, 0, 0.1)" },
      ticks: { font: { size: 11 } },
    },
  },
};

export const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: { size: 12 },
        padding: 20,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "white",
      bodyColor: "white",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 1,
      cornerRadius: 8,
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 } },
    },
    y: {
      beginAtZero: true,
      grid: { color: "rgba(0, 0, 0, 0.1)" },
      ticks: { font: { size: 11 } },
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
};

export const statTypes = [
  { id: "click", label: "제휴처/카테고리 클릭 순위" },
  { id: "interest-change", label: "상위 10개 제휴처 대상 관심사 변화 추이" },
  { id: "keywords/daily-top", label: "일별 인기 검색어 순위" },
  { id: "keywords/empty-top", label: "결과 미포함 검색어 순위" },
  { id: "local", label: "서울 지역구 이용 순위" },
  { id: "usage", label: "제휴처/카테고리 이용 순위" },
];
