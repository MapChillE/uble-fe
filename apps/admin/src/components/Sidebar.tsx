"use client";

import { BarChart3, MessageSquare, Home, X } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

export function Sidebar({ isMobileMenuOpen, onMobileMenuClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { id: "dashboard", label: "대시보드", icon: Home, href: "/" },
    { id: "statistics", label: "통계 조회", icon: BarChart3, href: "/statistics" },
    { id: "feedback", label: "사용자 피드백", icon: MessageSquare, href: "/feedback" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
              <span className="text-sm font-bold text-white">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Uble Admin</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onMobileMenuClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop header */}
        <div className="hidden p-6 md:block">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
              <span className="text-sm font-bold text-white">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Uble Admin</span>
          </div>
        </div>

        <nav className="mt-2 md:mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onMobileMenuClose}
                className={cn(
                  "flex w-full items-center space-x-3 px-6 py-3 text-left transition-colors hover:bg-gray-50",
                  active
                    ? "border-r-2 border-green-500 bg-green-50 text-green-700"
                    : "text-gray-700"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
