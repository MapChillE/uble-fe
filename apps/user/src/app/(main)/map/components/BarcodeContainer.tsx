"use client";
import UserBarcode from "@/components/common/UserBarcode";
import { Fragment, useState } from "react";
import BarcodeBlur from "./BarcodeBlur";
import useUserStore from "@/store/useUserStore";
import useBenefitConfirmModalStore from "@/store/useBenefitConfirmModalStore";

const BarcodeContainer = ({ storeId, isVIPcock }: { storeId: number; isVIPcock: boolean }) => {
  const [isBarcodeRevealed, setIsBarcodeRevealed] = useState(false);
  const { barcode } = useUserStore((state) => state.user);
  const { open, setInfo, setOnSuccess } = useBenefitConfirmModalStore();

  const handleBarcodeClick = () => {
    if (!isBarcodeRevealed) {
      setInfo(storeId, isVIPcock);
      setOnSuccess(() => {
        setIsBarcodeRevealed(true);
      });
      open();
    }
  };
  return (
    <div className="space-y-2 pt-4">
      <h3 className="font-semibold">멤버십 바코드</h3>
      <div
        className={`relative cursor-pointer rounded-lg bg-gray-50 p-6 transition-all duration-300 ${
          !isBarcodeRevealed && barcode ? "hover:bg-gray-100" : ""
        }`}
        onClick={handleBarcodeClick}
      >
        <div className="text-center">
          {barcode ? (
            <Fragment>
              <UserBarcode />
              <div className="space-y-1">
                <p className="text-action-green text-xs">매장에서 이 바코드를 제시해주세요</p>
              </div>
            </Fragment>
          ) : (
            <div className="space-y-1">
              <p className="text-action-green text-xs">
                바코드를 등록하신 후 LGU+의 다양한 혜택을 이용하세요!
              </p>
              <p className="text-action-green text-xs">
                혜택 사용 시 사용자 맞춤 제휴처가 추천됩니다
              </p>
            </div>
          )}
        </div>
        {!isBarcodeRevealed && barcode && <BarcodeBlur />}
      </div>
    </div>
  );
};

export default BarcodeContainer;
