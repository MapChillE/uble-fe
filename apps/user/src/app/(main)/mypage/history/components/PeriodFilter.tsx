import { Dispatch, SetStateAction, useMemo } from "react";

interface PeriodFilterProps {
  year: number;
  month: number;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
}

const getRecentMonths = (count = 10) => {
  const result: { year: number; month: number; label: string }[] = [];
  const now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth() + 1;
  for (let i = 0; i < count; i++) {
    result.push({
      year: y,
      month: m,
      label: `${y}년 ${m}월`,
    });
    m--;
    if (m === 0) {
      m = 12;
      y--;
    }
  }
  return result;
};

const PeriodFilter = ({ year, month, setYear, setMonth }: PeriodFilterProps) => {
  const options = useMemo(() => getRecentMonths(10), []);
  const selectedValue = `${year}-${month}`;

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-4">
      <div className="flex items-center justify-center">
        <select
          className="rounded-lg px-3 py-2 text-base font-semibold transition"
          value={selectedValue}
          onChange={(e) => {
            const [yStr, mStr] = e.target.value.split("-");
            const y = Number(yStr);
            const m = Number(mStr);
            setYear(Number.isFinite(y) && y > 0 ? y : year);
            setMonth(Number.isFinite(m) && m > 0 ? m : month);
          }}
        >
          {options.map((opt) => (
            <option
              key={`${opt.year}-${opt.month}`}
              value={`${opt.year}-${opt.month}`}
              className={`${selectedValue === `${opt.year}-${opt.month}` ? "font-semibold" : "font-normal"} `}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PeriodFilter;
