import MembershipGrade from "@/app/(main)/home/components/ui/MembershipGrade";
import { BrandDetailData } from "@/types/brand";

const PartnershipBenefitList = (data: BrandDetailData) => {
  const { benefits } = data;

  return (
    <div className="space-y-4 pt-4">
      <h1 className="font-bold text-xl">혜택 내용</h1>
      <div className="space-y-6">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 space-y-3"
          >
            {/* 등급 뱃지와 혜택명 한 줄에 */}
            <div className="flex items-center space-x-2">
              <MembershipGrade rank={benefit.minRank} isVIPcock={benefit.type === "VIP"} />
            </div>
            {/* 혜택 설명 */}
            {benefit.content.split('\n').map((item, idx) => (
              <div key={idx} className={idx === 0 ? "text-lg font-semibold text-gray-900" : "text-sm text-gray-700"}>
                {item}
              </div>
            ))}
            {/* 이용방법 - 토글 UI */}
            <details className="bg-gray-50 rounded-lg p-3">
              <summary className="flex items-center justify-between text-sm font-medium mb-1 text-gray-900 cursor-pointer list-none">
                이용방법 및 유의사항
                {/* 화살표는 CSS로 바꿀 수도 있고, 간단히 summary 뒤에 텍스트로 표시해도 됨 */}
                <span className="ml-2 text-xs">▼</span>
              </summary>
              <ul className="text-xs text-gray-600 space-y-1 mt-2">
                {benefit.manual.split('\n').map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </details>
            {/* 이용 제한 */}
            <div className="pt-2">
              <p className="text-xs text-gray-500">이용 제한: {benefit.provisionCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnershipBenefitList;