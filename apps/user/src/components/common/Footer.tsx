"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Heart, UserIcon, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { path: "/home", icon: Home, label: "홈" },
    { path: "/map", icon: MapPin, label: "지도" },
    { path: "/favorites", icon: Heart, label: "즐겨찾기" },
    { path: "/mypage", icon: UserIcon, label: "마이페이지" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="border-border mx-auto max-w-[1080px] rounded-t-md border-t bg-white">
        <nav className="h-[56px]">
          <div className="flex h-full w-full justify-around">
            {navItems.map(({ path, icon: Icon, label }) => (
              <button
                key={path}
                onClick={() => router.replace(path)}
                className={`flex flex-1 flex-col items-center py-2 transition-colors ${
                  pathname === path ? "text-gray-900" : "text-gray-400"
                }`}
              >
                <Icon className="mb-0.5 h-5 w-5" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
