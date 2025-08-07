"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ScanBarcode } from "lucide-react";
import { useState } from "react";
import BarcodeDrawer from "@/app/(main)/home/components/BarcodeDrawer";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [barcodeDrawerOpen, setBarcodeDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        {pathname === "/mypage/history" ||
        pathname === "/mypage/statistics" ||
        pathname.startsWith("/partnerships/") ? (
          <div className="flex items-center space-x-4">
            <button onClick={() => router.back()} className="p-1" aria-label="뒤로 이동">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {pathname === "/mypage/history"
                ? "혜택 사용 내역"
                : pathname === "/mypage/statistics"
                  ? "나의 멤버십 사용 리포트"
                  : "제휴처 안내"}
            </h1>
          </div>
        ) : (
          <>
            <button
              onClick={() => router.push("/home")}
              className="font-futura text-action-green text-2xl font-bold"
              aria-label="홈으로 이동"
            >
              UBLE
            </button>
            {pathname === "/home" && (
              <>
                <button aria-label="바코드 오픈" onClick={() => setBarcodeDrawerOpen(true)}>
                  <ScanBarcode />
                </button>
                <BarcodeDrawer
                  open={barcodeDrawerOpen}
                  onOpenChange={setBarcodeDrawerOpen}
                  initialRevealed={true}
                />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}
