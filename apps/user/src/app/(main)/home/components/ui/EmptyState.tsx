export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-400">
      <div className="text-lg font-medium">제휴처가 없습니다.</div>
      <div className="text-sm">선택하신 조건에 맞는 제휴처가 없습니다.</div>
    </div>
  );
}