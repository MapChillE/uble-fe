import { useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { DatePickerPopover } from "@/components/user/DatePickerPopover";

const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};


interface BirthDateSelectorProps {
  value: string;
  onChange: (date: string) => void;
}

const BirthDateSelector = ({ value, onChange }: BirthDateSelectorProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [month, setMonth] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">생년월일</Label>
      <div className="relative">
        <Input
          variant="modalCalendar"
          placeholder="YYYY.MM.DD"
          value={selectedDate ? formatDate(selectedDate) : ''}
          readOnly
          onClick={() => setIsCalendarOpen(true)}
        />
        <DatePickerPopover
          isModal={true}
          open={isCalendarOpen}
          onOpenChange={setIsCalendarOpen}
          date={selectedDate}
          month={month}
          onMonthChange={setMonth}
          onSelect={(date) => {
            setSelectedDate(date);
            onChange(date ? formatDate(date) : '');
            setIsCalendarOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default BirthDateSelector; 