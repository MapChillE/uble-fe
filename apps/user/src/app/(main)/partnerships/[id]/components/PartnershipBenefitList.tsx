"use client"
import MembershipGrade from "@/app/(main)/home/components/ui/MembershipGrade";
import { BrandDetailData } from "@/types/brand";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible";
import { AlertCircle, ChevronDown, Gift, Info } from "lucide-react";
import { useState } from "react";

const PartnershipBenefitList = (data: BrandDetailData) => {
  const { benefits } = data;
  const [openItems, setOpenItems] = useState<number[]>([])
  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }
  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-start gap-3">
        {/* <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full">
          <Gift className="w-6 h-6 text-white" />
        </div> */}
        <h2 className="text-xl font-bold text-gray-900">혜택 내용</h2>
      </div>
      {/* 혜택 카드 목록 */}
      <div className="grid gap-6">
        {benefits.map((benefit, idx) => (
          <Card
            key={benefit.benefitId}
            className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-gray-50 p-6"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MembershipGrade rank={benefit.minRank} isVIPcock={benefit.type === "VIP"} />
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  혜택 {idx + 1}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 혜택 내용 */}
              <div className="space-y-4">
                {benefit.content.split("\n").map((item, contentIdx) => {
                  const isTitle = contentIdx === 0 || item.includes(":") || item.includes("②") || item.includes("우수")
                  return (
                    <div
                      key={contentIdx}
                      className={
                        isTitle
                          ? "text-xl font-bold text-gray-900 leading-relaxed"
                          : "text-base text-gray-700 leading-relaxed pl-4 border-l-2 border-emerald-200"
                      }
                    >
                      {item}
                    </div>
                  )
                })}
              </div>

              {/* 이용방법 토글 */}
              <Collapsible open={openItems.includes(idx)} onOpenChange={() => toggleItem(idx)}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-150 transition-colors">
                    <div className="flex items-center gap-3">
                      <Info className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">이용방법 및 유의사항</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${openItems.includes(idx) ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <ul className="space-y-3">
                      {benefit.manual.split("\n").map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* 이용 제한 */}
              <div className="flex items-center gap-3 p-4">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-amber-800">이용 제한</p>
                  <p className="text-sm text-amber-700">{benefit.provisionCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PartnershipBenefitList;