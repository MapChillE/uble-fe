"use client"
import { Badge } from '@workspace/ui/components/badge';
import ProfileEditBtn from './ProfileEditBtn';
import useUserStore from '@/store/useUserStore';

const gradeColors = {
  VIP: "#FFD700",
  VVIP: "#FF6B6B",
  우수: "#FFA500",
  일반: "#C0C0C0",
}

const ProfileInfo = () => {
  const { user } = useUserStore();
  const { nickname, rank, gender, birthDate } = user;
  if (!nickname || nickname === "") {
    return (
      <div className="flex items-center justify-center w-full h-20 text-gray-400 text-sm">
        유저 정보가 존재하지 않습니다.
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-[#41d596] rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-xl"></span>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h2 className="text-lg font-semibold text-gray-900">{nickname}</h2>
            <Badge
              className="text-xs font-medium text-white border-0"
              style={{ backgroundColor: gradeColors[rank as keyof typeof gradeColors] }}
            >
              {rank}
            </Badge>
          </div>
          <p className="text-xs text-gray-400">
            {gender === "MALE" ? "남성" : "여성"} • {birthDate.replace(/-/g, ".")}
          </p>
        </div>
      </div>
      <ProfileEditBtn />
    </div>
  );
};

export default ProfileInfo;