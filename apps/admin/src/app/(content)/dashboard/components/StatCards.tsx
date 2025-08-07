import React from "react";
import { Users, ShoppingBag, Building2, MapPin } from "lucide-react";
import StatCard from "./ui/StatCard";
import { StatCardData } from "@/types/dashboard";

interface StatCardsProps {
  dashboardData: StatCardData;
}

const StatCards: React.FC<StatCardsProps> = ({ dashboardData }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
      {/* 월간 활성 이용자 수 */}
      <StatCard
        icon={Users}
        title="이번달 활성 사용자 수"
        value={dashboardData.mau}
        previousValue={dashboardData.lastMau}
        subtitle="MAU"
        color="green"
        showChange={true}
      />

      {/* 이번 달 전체 혜택 이용 수 */}
      <StatCard
        icon={ShoppingBag}
        title="이번 달 혜택 이용"
        value={dashboardData.usageCount}
        previousValue={dashboardData.lastUsageCount}
        subtitle="모든 유저"
        color="orange"
        showChange={true}
      />

      {/* 전체 제휴처 브랜드 수 */}
      <StatCard
        icon={Building2}
        title="전체 제휴처"
        value={dashboardData.totalBrandCount}
        subtitle="브랜드"
        color="purple"
        showChange={false}
      />

      {/* 전국 제휴처 매장 수 */}
      <StatCard
        icon={MapPin}
        title="전국 제휴처 매장 수"
        value={dashboardData.totalStoreCount}
        subtitle="스토어"
        color="blue"
        showChange={false}
      />
    </div>
  );
};

export default StatCards;
