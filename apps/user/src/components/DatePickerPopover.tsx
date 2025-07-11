// components/DatePickerPopover.tsx
import { CalendarIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";

interface DatePickerPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | undefined;
  month: Date | undefined;
  onMonthChange: (month: Date | undefined) => void;
  onSelect: (date: Date | undefined) => void;
}

export function DatePickerPopover({
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
        <Button
          id="date-picker"
          variant="ghost"
          className="absolute right-2 top-1/2 size-6 -translate-y-1/2"
        >
          <CalendarIcon className="size-3.5" />
        </Button>
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
          month={month}
          onMonthChange={onMonthChange}
          onSelect={onSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
