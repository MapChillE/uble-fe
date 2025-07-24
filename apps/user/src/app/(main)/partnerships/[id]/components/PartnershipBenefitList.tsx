"use client";
import MembershipGrade from "@/app/(main)/home/components/ui/MembershipGrade";
import { BrandDetailData } from "@/types/brand";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { AlertCircle, ChevronDown, Gift, Info } from "lucide-react";
import { useState } from "react";

const PartnershipBenefitList = (data: BrandDetailData) => {
  const { benefits } = data;
  const [openItems, setOpenItems] = useState<number[]>([]);
  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
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
            className="overflow-hidden border-0 bg-gradient-to-r from-white to-gray-50 pb-6 pt-6 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MembershipGrade rank={benefit.minRank} isVIPcock={benefit.type === "VIP"} />
                </div>
                <Badge
                  variant="outline"
                  className="border-emerald-200 bg-emerald-50 text-emerald-700"
                >
                  혜택 {idx + 1}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 혜택 내용 */}
              <div className="space-y-4">
                {benefit.content.split("\n").map((item, contentIdx) => {
                  const isTitle =
                    contentIdx === 0 ||
                    item.includes(":") ||
                    item.includes("②") ||
                    item.includes("우수");
                  return (
                    <div
                      key={contentIdx}
                      className={
                        isTitle
                          ? "text-xl font-bold leading-relaxed text-gray-900"
                          : "border-l-2 border-emerald-200 pl-4 text-base leading-relaxed text-gray-700"
                      }
                    >
                      {item}
                    </div>
                  );
                })}
              </div>

              {/* 이용방법 토글 */}
              <Collapsible open={openItems.includes(idx)} onOpenChange={() => toggleItem(idx)}>
                <CollapsibleTrigger className="w-full">
                  <div className="hover:to-gray-150 flex items-center justify-between rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-4 transition-colors hover:from-gray-100">
                    <div className="flex items-center gap-3">
                      <Info className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">이용방법 및 유의사항</span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        openItems.includes(idx) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4">
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
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
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
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
