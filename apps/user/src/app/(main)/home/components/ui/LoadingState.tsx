export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500 animate-pulse">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400 mb-3" />
      <div className="text-lg font-medium">제휴처 정보를 불러오고 있습니다...</div>
    </div>
  );
}