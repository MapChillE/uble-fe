import { CalendarIcon } from "lucide-react";
import { Calendar } from "@workspace/ui/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";

interface DatePickerPopoverProps {
  isModal: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | undefined;
  month: Date | undefined;
  onMonthChange: (month: Date | undefined) => void;
  onSelect: (date: Date | undefined) => void;
}

export function DatePickerPopover({
  isModal,
  open,
  onOpenChange,
  date,
  month,
  onMonthChange,
  onSelect,
}: DatePickerPopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          id="date-picker"
          aria-label="날짜 선택"
          className="absolute right-0 top-0 h-full p-1 text-gray-300 hover:text-gray-900"
          type="button"
        >
          <CalendarIcon className={isModal ? "h-4 w-4" : "h-5 w-5"} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
          month={month}
          onMonthChange={onMonthChange}
          onSelect={onSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
