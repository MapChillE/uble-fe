"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ScanBarcode } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        {pathname === "/mypage/history" ? (
          <div className="flex items-center space-x-4">
            <button onClick={() => router.back()} className="p-1">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">혜택 내역</h1>
          </div>
        ) : (
          <>
            <button onClick={() => router.push("/home")} className="text-2xl font-bold">
              Uble
            </button>
            <button>
              <ScanBarcode />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
