"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Heart, UserIcon, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { path: "/home", icon: Home, label: "홈" },
    { path: "/map", icon: MapPin, label: "지도" },
    { path: "/favorite", icon: Heart, label: "즐겨찾기" },
    { path: "/profile", icon: UserIcon, label: "마이페이지" },
  ];

  return (
    <div className="border-border fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="flex w-full justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => router.push(path)}
            className={`flex flex-1 flex-col items-center py-2 transition-colors ${
              pathname === path ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <Icon className="mb-1 h-5 w-5" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
