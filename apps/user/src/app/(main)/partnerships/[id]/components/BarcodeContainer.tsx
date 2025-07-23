"use client";
import UserBarcode from "@/components/common/UserBarcode";
import { useState } from "react";
import BarcodeBlur from "./BarcodeBlur";

const BarcodeContainer = () => {
  const [isBarcodeRevealed, setIsBarcodeRevealed] = useState(false);

  const handleBarcodeClick = () => {
    if (!isBarcodeRevealed) {
      setIsBarcodeRevealed(true);
    }
  };
  return (
    <div className="space-y-2 pt-4">
      <h3 className="font-semibold">멤버십 바코드</h3>
      <div
        className={`relative cursor-pointer rounded-lg bg-gray-50 p-6 transition-all duration-300 ${
          !isBarcodeRevealed ? "hover:bg-gray-100" : ""
        }`}
        onClick={handleBarcodeClick}
      >
        <div className="text-center">
          <UserBarcode />
          <div className="space-y-1">
            <p className="text-xs text-[#41d596]">매장에서 이 바코드를 제시해주세요</p>
          </div>
        </div>
        {!isBarcodeRevealed && <BarcodeBlur />}
      </div>
    </div>
  );
};

export default BarcodeContainer;
