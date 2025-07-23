interface BenefitStatisticsProps {
  listSize: number;
}
const BenefitStatistics = ({ listSize }: BenefitStatisticsProps) => {
  return (
    <div className="mx-4 mt-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="text-center">
        <p className="text-action-green text-2xl font-bold">{listSize}</p>
        <p className="text-sm text-gray-600">총 혜택 사용 횟수</p>
      </div>
    </div>
  );
};

export default BenefitStatistics;
