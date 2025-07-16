import { StepProps } from "@/types/profile";

const SelectMembership = ({ info, setInfo }: StepProps) => {
  const MEMBERSHIP_GRADES = ["VVIP", "VIP", "우수", "일반"];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-gray-900 leading-tight">
          멤버십 등급을
          <br />
          선택해주세요
        </h1>
        <p className="text-sm text-gray-500 font-medium">현재 멤버십 등급을 선택하세요</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MEMBERSHIP_GRADES.map((rank) => (
          <button
            key={rank}
            onClick={() => setInfo({ ...info, rank: rank })}
            className={`py-3 px-4 rounded-lg transition-all ${info.rank === rank
              ? "bg-[#41d596]/10 text-[#41d596]"
              : "bg-gray-100 text-gray-600 hover:bg-[#41d596]/10 hover:text-[#41d596]"
              }`}
          >
            <span className="text-sm font-semibold">{rank}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectMembership;