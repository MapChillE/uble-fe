"use client";

import { Input } from "@workspace/ui/components/input";
import { format } from "date-fns";
import { DatePickerPopover } from "./DatePickerPopover";
import { useState } from "react";

export default function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return format(date, "yyyy.MM.dd");
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DateInput(isModal: boolean) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));

  //input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 8) raw = raw.slice(0, 8);

    let formatted = raw;
    if (raw.length > 4) {
      formatted = raw.slice(0, 4) + "." + raw.slice(4);
    }
    if (raw.length > 6) {
      formatted = raw.slice(0, 4) + "." + raw.slice(4, 6) + "." + raw.slice(6);
    }

    setValue(formatted);

    const date = new Date(e.target.value);

    if (isValidDate(date)) {
      setDate(date);
      setMonth(date);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
    }
  };

  //calendar
  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    setValue(formatDate(date));
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative m-[10px] flex gap-2">
        <Input
          variant={isModal ? "modalCalendar" : "calendar"}
          id="date"
          value={value}
          placeholder="YYYY.MM.DD"
          className="bg-background pr-10"
          onChange={handleChange}
          onKeyDown={handleKey}
        />
        <DatePickerPopover
          open={open}
          onOpenChange={setOpen}
          date={date}
          month={month}
          onMonthChange={setMonth}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
