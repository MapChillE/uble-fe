"use client";

import { User, Menu } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";

interface AdminHeaderProps {
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: AdminHeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white px-4 py-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMobileMenuToggle}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Uble 관리자</h1>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
