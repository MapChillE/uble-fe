export default function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-red-500">
      <div className="text-lg font-medium">제휴처 정보를 불러오는 중 오류가 발생했습니다.</div>
      <div className="text-sm">잠시 후 다시 시도해 주세요.</div>
    </div>
  );
}