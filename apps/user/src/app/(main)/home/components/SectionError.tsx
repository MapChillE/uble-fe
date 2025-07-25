import SectionHeader from "@/components/ui/SectionHeader";

const SectionError = () => {
  return (
    <div className="space-y-4">
      <SectionHeader title="추천 제휴처" />
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <span className="mb-2 text-4xl">⚠️</span>
        <span>
          추천 정보를 불러오지 못했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </span>
      </div>
    </div>
  );
};

export default SectionError;
