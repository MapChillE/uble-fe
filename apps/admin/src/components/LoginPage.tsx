"use client";
import { User } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { apiHandler } from "@api/apiHandler";
import { adminLogin } from "@/service/login";
import Image from "next/image";

const LoginPage = () => {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await apiHandler(() => adminLogin(code));
    if (response.data?.statusCode === 0) {
      toast.info("로그인 되었습니다.");
      router.push("/dashboard");
    } else {
      toast.error("코드가 일치하지 않습니다.");
    }
    setIsLoading(false);
  };
  return (
    <div className="flex h-[100dvh] items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <Image src="/profileImg.png" alt="Uble Character" width={100} height={100} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Uble Admin</h1>
          <p className="mt-2 text-gray-600">관리자 페이지에 로그인하세요</p>
        </div>

        <Card className="border-none p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">코드 입력</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="인증 코드를 입력하세요"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">© 2025 Uble Admin. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
