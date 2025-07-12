import React from 'react';

import { UserInfo } from '@/types/profile';
import { Badge } from '@workspace/ui/components/badge';
import { Edit3 } from 'lucide-react';

const gradeColors = {
  VIP: "#FFD700",
  VVIP: "#FF6B6B",
  우수: "#FFA500",
  일반: "#C0C0C0",
}

const ProfileInfo = () => {
  const userData: UserInfo = {
    nickname: "김유블",
    rank: "VIP",
    gender: "FEMALE",
    birthDate: "2025-07-11",
    categoryIds: [
      1,
      3,
      5
    ]
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-[#41d596] rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-xl"></span>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h2 className="text-lg font-semibold text-gray-900">{userData.nickname}</h2>
            <Badge
              className="text-xs font-medium text-white border-0"
              style={{ backgroundColor: gradeColors[userData.rank as keyof typeof gradeColors] }}
            >
              {userData.rank}
            </Badge>
          </div>
          <p className="text-xs text-gray-400">
            {userData.gender} • {userData.birthDate.replace(/-/g, ".")}
          </p>
        </div>
      </div>
      <button
        // onClick={() => setIsEditModalOpen(true)}
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Edit3 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProfileInfo;