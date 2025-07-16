'use client'
import { Button } from '@workspace/ui/components/button';
import { UserX } from 'lucide-react';

import { useState } from 'react';

const WithdrawBtn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Button
      variant="filter_unselect"
      // onClick={handleDeleteAccount}
      disabled={isLoading}
      className="w-full justify-start h-14 px-4 text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <div className="flex items-center space-x-3">
        <UserX className="h-5 w-5" />
        <span className="font-medium">{isLoading ? "탈퇴 처리 중..." : "회원탈퇴"}</span>
      </div>
    </Button>
  );
};

export default WithdrawBtn;