"use client"
import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import useProfileEditModalStore from "@/store/useProfileEditModalStore";
import useUserStore from "@/store/useUserStore";
import { UserInfo } from "@/types/profile";
import MembershipGradeSelector from "./ProfileEditModalContents/MembershipGradeSelector";
import GenderSelector from "./ProfileEditModalContents/GenderSelector";
import BirthDateSelector from "./ProfileEditModalContents/BirthDateSelector";
import CategorySelector from "./ProfileEditModalContents/CategorySelector";
import BarcodeInput from "./ProfileEditModalContents/BarcodeInput";
import SaveButton from "./ProfileEditModalContents/SaveButton";


const ProfileEditModal = () => {
  const { isOpen, close } = useProfileEditModalStore();
  const { user } = useUserStore();
  if (!user) {
    return null;
  }
  const { rank, gender, birthDate, categoryIds, barcodeNumber } = user;


  // formData 객체로 state 관리
  const [formData, setFormData] = useState<UserInfo>({
    rank: rank,
    gender: gender,
    birthDate: birthDate,
    categoryIds: categoryIds ?? [],
    barcodeNumber: barcodeNumber || '',
  });


  // 핸들러들
  const handleRankChange = (grade: string) => setFormData((prev) => ({ ...prev, rank: grade }));
  const handleGenderChange = (korGender: "MALE" | "FEMALE") => setFormData((prev) => ({ ...prev, gender: korGender }));
  const handleBirthDateChange = (date: string | undefined) => {
    setFormData((prev) => ({ ...prev, birthDate: date ? date : '' }));
  };
  const handleBarcodeChange = (value: string) => setFormData((prev) => ({ ...prev, barcodeNumber: value }));

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-lg font-semibold">프로필 수정</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1">
          <div className="space-y-6 py-4">
            {/* 요금제 등급 */}
            <MembershipGradeSelector
              grade={formData.rank}
              onChange={handleRankChange}
            />
            {/* 성별 */}
            <GenderSelector
              gender={formData.gender as "MALE" | "FEMALE"}
              onChange={handleGenderChange}
            />
            {/* 생년월일 */}
            <BirthDateSelector
              value={formData.birthDate}
              onChange={handleBirthDateChange}
            />
            {/* 관심 분야 */}
            <CategorySelector
              categoryIds={formData.categoryIds}
              onChange={(ids) => setFormData((prev) => ({ ...prev, categoryIds: ids }))}
            />
            {/* 멤버십 바코드 번호 */}
            <BarcodeInput
              value={formData.barcodeNumber || ""}
              onChange={handleBarcodeChange}
            />
          </div>
        </div>

        <div className="flex-shrink-0 flex space-x-3 pt-4">
          <Button variant="outline" onClick={close} className="flex-1 bg-transparent">
            취소
          </Button>
          <SaveButton
            formData={formData}
            user={user}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;