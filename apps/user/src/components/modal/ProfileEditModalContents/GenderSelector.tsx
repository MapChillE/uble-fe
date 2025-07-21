import { Label } from "@workspace/ui/components/label";
import { selectToEng } from "@/utils/gender";

interface GenderSelectorProps {
  gender: "MALE" | "FEMALE";
  onChange: (gender: "MALE" | "FEMALE") => void;
}

const GenderSelector = ({ gender, onChange }: GenderSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">성별</Label>
      <div className="space-y-2">
        {["남성", "여성"].map((korGender) => {
          const engGender = selectToEng(korGender);
          return (
            <label key={engGender} className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  name="gender"
                  value={engGender}
                  checked={gender === engGender}
                  onChange={() => onChange(engGender)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all ${gender === engGender ? "border-[#41d596] bg-[#41d596]" : "border-gray-300"}`}
                >
                  {gender === engGender && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">{korGender}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default GenderSelector; 