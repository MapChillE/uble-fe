import { StepProps } from "@/types/profile";
import { Button } from "@workspace/ui/components/button";

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
          <Button
            key={rank}
            onClick={() => setInfo({ ...info, rank: rank })}
            className="py-3 px-4 rounded-lg transition-all"
            variant={info.rank === rank ? "onb_selected" : "onb_unselected"}
          >
            <span className="text-sm font-semibold">{rank}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectMembership;