"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { StaticsDetailData } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { TrendingUp, BarChart3, Clock, Target } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getCategoryIconStyle } from "@/constants/categoryMarkerStyle";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatisticsChartsProps {
  data: StaticsDetailData;
}

const StatisticsCharts = ({ data }: StatisticsChartsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartKey, setChartKey] = useState(0); // 차트 강제 리렌더링용

  const [animatedValues, setAnimatedValues] = useState({
    averageUsage: 0,
    userUsage: 0,
    averageDiffPercent: 0,
  });

  // Intersection Observer로 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          setChartKey((prev) => prev + 1); // 차트 강제 리렌더링
          observer.disconnect(); // 한 번만 실행
        }
      },
      {
        threshold: 0.3, // 30% 보일 때 실행
        rootMargin: "0px 0px -100px 0px", // 하단에서 100px 전에 실행
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 카운터 애니메이션 (isVisible이 true일 때만 실행)
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateValue = (start: number, end: number, setter: (value: number) => void) => {
      const increment = (end - start) / steps;
      let current = start;
      let step = 0;

      const timer = setInterval(() => {
        current += increment;
        step++;
        setter(Math.round(current * 10) / 10);

        if (step >= steps) {
          setter(end);
          clearInterval(timer);
        }
      }, stepDuration);

      return timer;
    };

    const timers = [
      animateValue(0, data.benefitUsageComparison.averageUsageCount, (value) =>
        setAnimatedValues((prev) => ({ ...prev, averageUsage: value }))
      ),
      animateValue(0, data.benefitUsageComparison.userUsageCount, (value) =>
        setAnimatedValues((prev) => ({ ...prev, userUsage: value }))
      ),
      animateValue(0, data.benefitUsageComparison.averageDiffPercent, (value) =>
        setAnimatedValues((prev) => ({ ...prev, averageDiffPercent: value }))
      ),
    ];

    return () => timers.forEach((timer) => clearInterval(timer));
  }, [data.benefitUsageComparison, isVisible]);
  // 카테고리별 색상 매핑
  const getCategoryColors = (categoryNames: string[]) => {
    return categoryNames.map((categoryName) => {
      const categoryStyle = getCategoryIconStyle(categoryName);
      const markerColor = categoryStyle.markerColor;
      return {
        backgroundColor: markerColor,
        borderColor: markerColor,
      };
    });
  };

  // 카테고리 랭킹 차트 데이터 (도넛 차트용)
  const categoryNames = data.categoryRankList.slice(0, 5).map((item) => item.categoryName);
  const categoryColors = getCategoryColors(categoryNames);

  const categoryChartData = {
    labels: categoryNames,
    datasets: [
      {
        data: data.categoryRankList.slice(0, 5).map((item) => item.usageCount),
        backgroundColor: categoryColors.map((color) => color.backgroundColor),
        borderColor: categoryColors.map((color) => color.borderColor),
        borderWidth: 2,
        hoverOffset: 15,
        hoverBorderWidth: 3,
      },
    ],
  };

  // 브랜드 랭킹 차트 데이터
  const brandChartData = {
    labels: data.brandRankList.slice(0, 5).map((item) => item.brandName),
    datasets: [
      {
        label: "사용 횟수",
        data: data.brandRankList.slice(0, 5).map((item) => item.usageCount),
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  // 월별 사용량 차트 데이터
  const monthlyChartData = {
    labels: data.monthlyBenefitUsageList.map((item) => `${item.year}년 ${item.month}월`),
    datasets: [
      {
        label: "월별 혜택 사용량",
        data: data.monthlyBenefitUsageList.map((item) => item.usageCount),
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  // 사용 패턴 도넛 차트 데이터
  const usagePatternData = {
    labels: ["사용자 평균", "내 사용량"],
    datasets: [
      {
        data: [animatedValues.averageUsage, animatedValues.userUsage],
        backgroundColor: ["rgba(156, 163, 175, 1)", "rgba(59, 130, 246, 1)"],
        borderColor: ["rgba(156, 163, 175, 1)", "rgba(59, 130, 246, 1)"],
        borderWidth: 2,
        hoverOffset: [0, 15],
        hoverBorderWidth: [2, 3],
      },
    ],
  };

  // 차트 옵션들
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: isVisible ? 2000 : 0,
      easing: "easeInOutQuart" as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 0,
        cornerRadius: 8,
        animation: {
          duration: 300,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#6b7280",
        },
        animation: {
          duration: 1500,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
        },
        animation: {
          duration: 1500,
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: isVisible ? 2000 : 0,
      easing: "easeInOutQuart" as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        animation: {
          duration: 300,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#6b7280",
        },
        animation: {
          duration: 1500,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
        },
        animation: {
          duration: 1500,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    animation: {
      duration: isVisible ? 2000 : 0,
      easing: "easeInOutQuart" as const,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#6b7280",
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        animation: {
          duration: 300,
        },
      },
    },
  };

  return (
    <div ref={containerRef} className="space-y-6 py-2">
      {/* 카테고리 랭킹 차트 */}
      <Card className="border border-0 p-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 animate-pulse text-blue-500" />
            카테고리별 사용량 비율
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Doughnut
              key={`category-${chartKey}`}
              data={categoryChartData}
              options={doughnutOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* 브랜드 랭킹 차트 */}
      <Card className="border border-0 p-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 animate-pulse text-green-500" />
            브랜드별 사용량 TOP 5
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center">
            <Bar data={brandChartData} options={barOptions} />
          </div>
        </CardContent>
      </Card>

      {/* 월별 사용량 트렌드 */}
      <Card className="border border-0 p-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 animate-pulse text-purple-500" />
            월별 혜택 사용량 트렌드
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line key={`monthly-${chartKey}`} data={monthlyChartData} options={lineOptions} />
          </div>
        </CardContent>
      </Card>

      {/* 사용 패턴 비교 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border border-0 p-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 animate-pulse text-orange-500" />
              사용량 비교
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Doughnut
                key={`usage-${chartKey}`}
                data={usagePatternData}
                options={doughnutOptions}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                평균 대비{" "}
                <span className="animate-pulse font-semibold text-blue-600">
                  {animatedValues.averageDiffPercent > 0 ? "+" : ""}
                  {animatedValues.averageDiffPercent.toFixed(1)}%
                </span>{" "}
                더 많이 사용하셨습니다!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 사용 패턴 정보 */}
        <Card className="border border-0 p-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 animate-pulse text-indigo-500" />
              나의 사용 패턴
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4 transition-all duration-300 hover:scale-105 hover:bg-blue-100">
                <span className="text-sm text-gray-600">가장 많이 사용한 날</span>
                <span className="animate-pulse font-semibold text-blue-600">
                  {data.benefitUsagePattern.mostUsedDay}일
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-green-50 p-4 transition-all duration-300 hover:scale-105 hover:bg-green-100">
                <span className="text-sm text-gray-600">가장 많이 사용한 요일</span>
                <span className="animate-pulse font-semibold text-green-600">
                  {data.benefitUsagePattern.mostUsedWeekday}요일
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-orange-50 p-4 transition-all duration-300 hover:scale-105 hover:bg-orange-100">
                <span className="text-sm text-gray-600">가장 많이 사용한 시간</span>
                <span className="animate-pulse font-semibold text-orange-600">
                  {data.benefitUsagePattern.mostUsedTime}시
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsCharts;
