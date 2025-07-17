import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Calendar, CalendarIcon } from "lucide-react";
import useProfileEditModalStore from "@/store/useProfileEditModalStore";

const ProfileEditModal = () => {
  const { isOpen, close } = useProfileEditModalStore();

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
                  <button
                    key={grade}
                    onClick={() => setFormData({ ...formData, grade })}
                    className={`py-2 px-3 rounded-lg transition-all text-sm font-medium ${formData.grade === grade
                      ? "bg-[#41d596]/10 text-[#41d596]"
                      : "bg-gray-100 text-gray-600 hover:bg-[#41d596]/10 hover:text-[#41d596]"
                      }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* 성별 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">성별</Label>
              <div className="space-y-2">
                {["남성", "여성"].map((gender) => (
                  <label key={gender} className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all ${formData.gender === gender ? "border-[#41d596] bg-[#41d596]" : "border-gray-300"
                          }`}
                      >
                        {formData.gender === gender && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 생년월일 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">생년월일</Label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="YYYY.MM.DD"
                  value={dateInput}
                  onChange={(e) => handleDateInputChange(e.target.value)}
                  className="w-full text-sm font-medium text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#41d596] focus:outline-none pb-2 pr-8 placeholder-gray-400"
                  maxLength={10}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="absolute right-0 top-0 p-1 text-gray-400 hover:text-gray-600">
                      <CalendarIcon className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                      locale={ko}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* 관심 분야 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">관심 분야</Label>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS.map((interest) => {
                  const isSelected = formData.interests.includes(interest)
                  const isDisabled = !isSelected && formData.interests.length >= 3

                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      disabled={isDisabled}
                      className={`py-2 px-2 rounded-lg transition-all text-sm font-medium ${isSelected
                        ? "bg-[#41d596]/10 text-[#41d596]"
                        : isDisabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-gray-600 hover:bg-[#41d596]/10 hover:text-[#41d596]"
                        }`}
                    >
                      {interest}
                    </button>
                  )
                })}
              </div>
              {formData.interests.length > 0 && (
                <div className="text-center">
                  <span className="text-xs text-[#41d596] font-medium">{formData.interests.length}/3개 선택됨</span>
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

        {/* 버튼 */}
        <div className="flex-shrink-0 flex space-x-3 pt-4">
          <Button variant="outline" onClick={close} className="flex-1 bg-transparent">
            취소
          </Button>
          <Button
            onClick={handleSave}
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