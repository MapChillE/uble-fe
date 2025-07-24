import { MEMBERSHIP_GRADES } from "@/types/constants";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";

interface MembershipGradeSelectorProps {
  grade: string;
  onChange: (grade: string) => void;
}

const MembershipGradeSelector = ({ grade, onChange }: MembershipGradeSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">요금제 등급</Label>
      <div className="grid grid-cols-2 gap-2">
        {MEMBERSHIP_GRADES.map((g) => (
          <Button
            key={g}
            onClick={() => onChange(g)}
            variant={
              grade === g ||
              (grade === "NORMAL" && g === "일반") ||
              (grade === "PREMIUM" && g === "우수")
                ? "onb_selected"
                : "onb_unselected"
            }
          >
            {g}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MembershipGradeSelector;
