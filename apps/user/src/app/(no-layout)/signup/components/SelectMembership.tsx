import { MEMBERSHIP_GRADES } from "@/types/constants";
import { StepProps } from "@/types/profile";
import { Button } from "@workspace/ui/components/button";

const SelectMembership = ({ info, setInfo }: StepProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold leading-tight text-gray-900">
          멤버십 등급을
          <br />
          선택해주세요
        </h1>
        <p className="text-sm font-medium text-gray-500">현재 멤버십 등급을 선택하세요</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MEMBERSHIP_GRADES.map((rank) => (
          <Button
            key={rank}
            onClick={() =>
              setInfo({
                ...info,
                rank: rank === "일반" ? "NORMAL" : rank === "우수" ? "PREMIUM" : rank,
              })
            }
            className="rounded-lg px-4 py-3 transition-all"
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
