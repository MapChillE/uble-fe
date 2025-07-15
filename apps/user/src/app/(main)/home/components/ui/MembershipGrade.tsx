
// import { GRADE_COLORS } from '@/types/constants';
import { BrandContent } from "@/types/brand";

const GRADE_COLORS = {
  VIP콕: "#9869f1",
  VVIP: "#eb3f88",
  VIP: "#9869f1",
  우수: "#93aefe",
  일반: "#b5b3c2",
};
interface MembershipGradeProps {
  rank: "NONE" | "NORMAL" | "PREMIUM";
  isVIPcock: boolean;
}

const RANK_MAP: Record<MembershipGradeProps["rank"], string[]> = {
  NONE: ["일반", "우수", "VIP", "VVIP"],
  NORMAL: ["우수", "VIP", "VVIP"],
  PREMIUM: ["VIP", "VVIP"],
};

const MembershipGrade = ({ rank, isVIPcock }: MembershipGradeProps) => {
  const getGradeColor = (grade: string) => {
    return GRADE_COLORS[grade as keyof typeof GRADE_COLORS] || "#b5b3c2";
  };
  const getGradeBackgroundColor = (grade: string) => {
    const color = getGradeColor(grade);
    const hex = color.replace("#", "");
    const r = Number.parseInt(hex.substr(0, 2), 16);
    const g = Number.parseInt(hex.substr(2, 2), 16);
    const b = Number.parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  };

  const grades = [...RANK_MAP[rank]];
  if (isVIPcock) {
    grades.push("VIP콕");
  }

  return (
    <div className="flex flex-col gap-1 space-y-1">
      <div className="flex space-x-2">
        {grades.map((row, rowIdx) => (
          <span
            key={row}
            className="rounded px-1.5 py-0.5 text-xs font-normal"
            style={{
              backgroundColor: getGradeBackgroundColor(row),
              color: getGradeColor(row),
            }}
          >
            {row}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MembershipGrade;
