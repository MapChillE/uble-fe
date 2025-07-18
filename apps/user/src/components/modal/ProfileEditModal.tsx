"use client"
import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import useProfileEditModalStore from "@/store/useProfileEditModalStore";
import { CATEGORIES, MEMBERSHIP_GRADES } from "@/types/constants";
import useUserStore from "@/store/useUserStore";
import { selectToEng } from "@/utils/gender";
import { DatePickerPopover } from "@/components/user/DatePickerPopover";
import useCalendarModalStore from "@/store/useCalendarModalStore";
import { UserInfo } from "@/types/profile";

const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const ProfileEditModal = () => {
  const { isOpen, close } = useProfileEditModalStore();
  const { isOpen: isCalendarOpen, open: openCalendar, close: closeCalendar } = useCalendarModalStore();
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

  // 생년월일 관련 state (DatePickerPopover 연동)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    birthDate ? new Date(birthDate) : undefined
  );
  const [month, setMonth] = useState<Date | undefined>(undefined);

  // 핸들러들
  const handleRankChange = (grade: string) => setFormData((prev) => ({ ...prev, rank: grade }));
  const handleGenderChange = (korGender: string) => setFormData((prev) => ({ ...prev, gender: selectToEng(korGender) }));
  const handleBirthDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setFormData((prev) => ({ ...prev, birthDate: date ? formatDate(date) : '' }));
  };
  const toggleCategory = (categoryId: number) => setFormData((prev) => {
    const exists = prev.categoryIds.includes(categoryId);
    if (exists) {
      return { ...prev, categoryIds: prev.categoryIds.filter((id) => id !== categoryId) };
    } else if (prev.categoryIds?.length < 3) {
      return { ...prev, categoryIds: [...prev.categoryIds, categoryId] };
    }
    return prev;
  });
  const handleBarcodeChange = (value: string) => setFormData((prev) => ({ ...prev, barcodeNumber: value }));

  // canSave: store의 user와 formData를 비교
  const isChanged =
    formData.rank !== rank ||
    formData.gender !== gender ||
    formData.birthDate !== birthDate ||
    formData.barcodeNumber !== (barcodeNumber || '') ||
    formData.categoryIds?.length !== categoryIds?.length ||
    !formData.categoryIds.every((id) => categoryIds.includes(id));

  const canSave =
    !!formData.rank &&
    !!formData.gender &&
    !!formData.birthDate &&
    formData.categoryIds?.length > 0 &&
    isChanged;

  const saveUserInfo = async (params: UserInfo) => {
    console.log(params);
  }

  const handleSave = () => {
    if (canSave) {
      saveUserInfo(formData);
      close();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-lg font-semibold">프로필 수정</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1">
          <div className="space-y-6 py-4">
            {/* 요금제 등급 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">요금제 등급</Label>
              <div className="grid grid-cols-2 gap-2">
                {MEMBERSHIP_GRADES.map((grade) => (
                  <Button
                    key={grade}
                    onClick={() => handleRankChange(grade)}
                    variant={formData.rank === grade ? "onb_selected" : "onb_unselected"}
                  >
                    {grade}
                  </Button>
                ))}
              </div>
            </div>

            {/* 성별 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">성별</Label>
              <div className="space-y-2">
                {["남성", "여성"].map((korGender) => (
                  <label key={korGender} className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name="gender"
                        value={selectToEng(korGender)}
                        checked={formData.gender === selectToEng(korGender)}
                        onChange={() => handleGenderChange(korGender)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all ${formData.gender === selectToEng(korGender) ? "border-[#41d596] bg-[#41d596]" : "border-gray-300"}`}
                      >
                        {formData.gender === selectToEng(korGender) && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{korGender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 생년월일 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">생년월일</Label>
              <div className="relative">
                <Input
                  variant="modalCalendar"
                  placeholder="YYYY.MM.DD"
                  value={selectedDate ? formatDate(selectedDate) : ''}
                  readOnly
                  onClick={openCalendar}
                />
                <DatePickerPopover
                  isModal={true}
                  open={isCalendarOpen}
                  onOpenChange={(v) => v ? openCalendar() : closeCalendar()}
                  date={selectedDate}
                  month={month}
                  onMonthChange={setMonth}
                  onSelect={(date) => {
                    handleBirthDateChange(date);
                    closeCalendar();
                  }}
                />
              </div>
            </div>

            {/* 관심 분야 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">관심 분야</Label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = formData.categoryIds.includes(cat.categoryId);
                  const isDisabled = !isSelected && formData.categoryIds?.length >= 3;
                  return (
                    <button
                      key={cat.categoryId}
                      onClick={() => toggleCategory(cat.categoryId)}
                      disabled={isDisabled}
                      className={`py-2 px-2 rounded-lg transition-all text-sm font-medium ${isSelected
                        ? "bg-[#41d596]/10 text-[#41d596]"
                        : isDisabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-gray-600 hover:bg-[#41d596]/10 hover:text-[#41d596]"
                        }`}
                    >
                      {cat.categoryName}
                    </button>
                  );
                })}
              </div>
              {formData.categoryIds?.length > 0 && (
                <div className="text-center">
                  <span className="text-xs text-[#41d596] font-medium">{formData.categoryIds?.length}/3개 선택됨</span>
                </div>
              )}
            </div>

            {/* 멤버십 바코드 번호 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">멤버십 바코드 번호</Label>
              <Input
                type="text"
                placeholder="바코드 번호 입력 (숫자만)"
                value={formData.barcodeNumber}
                onChange={(e) => handleBarcodeChange(e.target.value)}
                className="h-10 text-sm"
                maxLength={16}
              />
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">
                  바코드 번호는 16자리 숫자입니다. 입력하지 않아도 서비스 이용이 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex space-x-3 pt-4">
          <Button variant="outline" onClick={close} className="flex-1 bg-transparent">
            취소
          </Button>
          <Button
            onClick={() => {/* 저장 로직 */ }}
            disabled={!canSave}
            className="flex-1 bg-[#41d596] hover:bg-[#41d596]/90 disabled:bg-gray-300"
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;