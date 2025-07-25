import { Dispatch, SetStateAction } from "react";

interface PeriodFilterProps {
  year: number;
  month: number;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
}

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

const getMonthOptions = () => Array.from({ length: 12 }, (_, i) => i + 1);

const PeriodFilter = ({ year, month, setYear, setMonth }: PeriodFilterProps) => {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-4">
      <div className="flex items-center space-x-2">
        <select
          className="rounded border px-2 py-1 text-sm"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {getYearOptions().map((y) => (
            <option key={y} value={y}>
              {y}년
            </option>
          ))}
        </select>
        <select
          className="rounded border px-2 py-1 text-sm"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {getMonthOptions().map((m) => (
            <option key={m} value={m}>
              {m}월
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PeriodFilter;
