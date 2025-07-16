import { StepProps } from "@/types/profile";


const SelectGender = ({ info, setInfo }: StepProps) => {
  const selectToEng = (gender: string) => {
    return gender === "남성" ? "MALE" : "FEMALE";
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-gray-900 leading-tight">
          성별을
          <br />
          선택해주세요
        </h1>
        <p className="text-sm text-gray-500 font-medium">맞춤 혜택 제공을 위해 필요해요</p>
      </div>

      <div className="space-y-4">
        {["남성", "여성"].map((gender) => (
          <label key={gender} className="flex items-center space-x-3 cursor-pointer">
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
                className={`w-5 h-5 rounded-full border-2 transition-all ${info.gender === selectToEng(gender) ? "border-[#41d596] bg-[#41d596]" : "border-gray-300"
                  }`}
              >
                {info.gender === selectToEng(gender) && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
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