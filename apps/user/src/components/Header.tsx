"use client";

import { useRouter } from "next/navigation";
import { ScanBarcode } from "lucide-react";

export default function Header() {
  const router = useRouter();

  return (
    <header className="border-border sticky top-0 z-50 border-b bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => router.push("/home")} className="text-2xl font-bold">
          Uble
        </button>
        <button>
          <ScanBarcode />
        </button>
      </div>
    </header>
  );
}
