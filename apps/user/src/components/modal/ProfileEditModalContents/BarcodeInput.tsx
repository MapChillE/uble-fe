import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

interface BarcodeInputProps {
  value: string;
  onChange: (value: string) => void;
}
const BarcodeInput = ({ value, onChange }: BarcodeInputProps) => {
  // 숫자만 허용하는 핸들러
  const handleBarcodeChange = (value: string) => {
    // 숫자만 추출 (음수, 소수점, 문자 모두 제거)
    const numbers = value.replace(/[^0-9]/g, "");
    onChange(numbers);
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">멤버십 바코드 번호</Label>
      <Input
        type="text"
        placeholder="바코드 번호 입력 (숫자만)"
        value={value}
        onChange={(e) => handleBarcodeChange(e.target.value)}
        className="h-10 text-sm"
        maxLength={16}
      />
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-xs text-gray-600">
          바코드 번호는 16자리 숫자입니다. 입력하지 않아도 서비스 이용이 가능합니다.
        </p>
      </div>
    </div>
  );
};

export default BarcodeInput; 