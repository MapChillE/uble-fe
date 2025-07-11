import React from 'react';

const GRADE_COLORS = {
  VVIP: "#eb3f88",
  VIP: "#9869f1",
  우수: "#93aefe",
  일반: "#b5b3c2",
};

interface MembershipGradeProps {
  rank: "VIP" | "NORMAL" | "LOCAL" | "VIP_NORMAL";
  content?: string; // 단일 string
}

const RANK_MAP: Record<MembershipGradeProps["rank"], string[]> = {
  VIP: ["VIP", "VVIP"],
  NORMAL: ["일반", "우수", "VIP", "VVIP"],
  LOCAL: ["우수", "VIP", "VVIP"],
  VIP_NORMAL: ["일반", "우수", "VIP", "VVIP"],
};

const MembershipGrade = ({ rank, content }: MembershipGradeProps) => {
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

  return (
    <div className="flex flex-col gap-1 space-y-1">
      <div className="flex space-x-2">
        {RANK_MAP[rank].map((row, rowIdx) => (
          <span
            key={row}
            className="px-1.5 py-0.5 rounded text-xs font-normal"
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