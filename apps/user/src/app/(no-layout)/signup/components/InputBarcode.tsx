"use client";
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";

const InputBarcode = () => {
  const [barcode, setbarcode] = useState("");

  const handleBarcodeChange = (value: string) => {
    // 숫자만 추출 음수 입력 방지
    const numbers = value.replace(/\D/g, "");
    // 0으로 시작하는 경우도 허용, 빈 값도 허용
    if (numbers === "" || /^[0-9]+$/.test(numbers)) {
      setbarcode(numbers);
    }
  };
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold leading-tight text-gray-900">
          멤버십 바코드 번호를
          <br />
          입력해주세요
        </h1>
        <p className="text-sm font-medium text-gray-500">
          기존 멤버십 바코드가 있다면 입력해주세요 (선택사항)
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="바코드 번호 입력 (숫자만)"
            value={barcode}
            onChange={(e) => handleBarcodeChange(e.target.value)}
            variant="default"
            className="h-12 w-full text-base font-medium"
            maxLength={16}
          />
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-2 text-sm font-medium text-gray-900">안내사항</h3>
          <ul className="space-y-1 text-xs text-gray-600">
            <li>• 바코드 번호는 16자리 숫자입니다</li>
            <li>• 잘못된 번호 입력 시 나중에 수정할 수 있습니다</li>
            <li>• 입력하지 않아도 서비스 이용이 가능합니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputBarcode;
