import { StepProps } from "@/types/profile";
import { selectToEng } from "@/utils/gender";

const SelectGender = ({ info, setInfo }: StepProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold leading-tight text-gray-900">
          성별을
          <br />
          선택해주세요
        </h1>
        <p className="text-sm font-medium text-gray-500">맞춤 혜택 제공을 위해 필요해요</p>
      </div>

      <div className="space-y-4">
        {["남성", "여성"].map((gender) => (
          <label key={gender} className="flex cursor-pointer items-center space-x-3">
            <div className="relative">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={info.gender === selectToEng(gender)}
                onChange={(e) => setInfo({ ...info, gender: selectToEng(e.target.value) })}
                className="sr-only"
              />
              <div
                className={`h-5 w-5 rounded-full border-2 transition-all ${
                  info.gender === selectToEng(gender)
                    ? "border-action-green bg-action-green"
                    : "border-gray-300"
                }`}
              >
                {info.gender === selectToEng(gender) && (
                  <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white" />
                )}
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-900">{gender}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SelectGender;
