"use client"
import { Edit3 } from "lucide-react";
import useProfileEditModalStore from "@/store/useProfileEditModalStore";

const ProfileEditBtn = () => {
  const { open } = useProfileEditModalStore();
  return (
    <button
      onClick={open}
      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
    >
      <Edit3 className="w-5 h-5" />
    </button>
  );
};

export default ProfileEditBtn;