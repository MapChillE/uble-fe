

interface BenefitStatisticsProps {
  listSize: number;
}
const BenefitStatistics = ({ listSize }: BenefitStatisticsProps) => {
  return (
    <div className="bg-white mx-4 mt-4 p-4 rounded-lg border border-gray-200">
      <div className="text-center">
        <p className="text-2xl font-bold text-[#41d596]">{listSize}</p>
        <p className="text-sm text-gray-600">총 혜택 사용 횟수</p>
      </div>
    </div>
  );
};

export default BenefitStatistics;