"use client";
import { Badge } from "@workspace/ui/components/badge";
import ProfileEditBtn from "./ProfileEditBtn";
import useUserStore from "@/store/useUserStore";

const gradeColors = {
  VIP: "#FFD700",
  VVIP: "#FF6B6B",
  우수: "#FFA500",
  일반: "#C0C0C0",
};

const ProfileInfo = () => {
  const { user } = useUserStore();
  const { nickname, rank, gender, birthDate } = user;
  const displayRank = rank === "NORMAL" ? "일반" : rank === "PREMIUM" ? "우수" : rank;
  if (!nickname || nickname === "") {
    return (
      <div className="flex h-20 w-full items-center justify-center text-sm text-gray-400">
        유저 정보가 존재하지 않습니다.
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-action-green flex h-16 w-16 items-center justify-center rounded-full">
          <span className="text-xl font-semibold text-white"></span>
        </div>
        <div>
          <div className="mb-1 flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">{nickname}</h2>
            <Badge
              className="border-0 text-xs font-medium text-white"
              style={{ backgroundColor: gradeColors[displayRank as keyof typeof gradeColors] }}
            >
              {displayRank}
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
