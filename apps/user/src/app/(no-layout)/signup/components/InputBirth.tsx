'use client'
import { DatePickerPopover } from "@/components/user/DatePickerPopover";
import { StepProps } from "@/types/profile";
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";
import useCalendarModalStore from "@/store/useCalendarModalStore";

const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const InputBirth = ({ info, setInfo }: StepProps) => {
  const { isOpen, open, close } = useCalendarModalStore();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    info.birthDate ? new Date(info.birthDate) : undefined
  );
  const [month, setMonth] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-gray-900 leading-tight">
          생년월일을
          <br />
          입력해주세요
        </h1>
        <p className="text-sm text-gray-500 font-medium">연령대별 혜택 추천을 위해 필요해요</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            variant="calendar"
            placeholder="YYYY.MM.DD"
            value={selectedDate ? formatDate(selectedDate) : ''}
            readOnly
            onClick={open}
          />
          <DatePickerPopover
            isModal={false}
            open={isOpen}
            onOpenChange={(v) => v ? open() : close()}
            date={selectedDate}
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              setSelectedDate(date);
              close();
              // info.birthDate에 yyyy-mm-dd 형식으로 저장
              setInfo({
                ...info,
                birthDate: date
                  ? formatDate(date)
                  : '',
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputBirth;