import DashBoardProvider from "./components/DashboardProvider";

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">대시보드</h2>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Uble 서비스 현황을 한눈에 확인하세요
        </p>
      </div>
      <DashBoardProvider />
    </div>
  );
};

export default page;
