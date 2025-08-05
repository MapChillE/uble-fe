"use client";
import UserBarcode from "@/components/common/UserBarcode";
import { Fragment, useEffect, useState } from "react";
import BarcodeBlur from "./BarcodeBlur";
import useUserStore from "@/store/useUserStore";
import useBenefitConfirmModalStore from "@/store/useBenefitConfirmModalStore";
import { StoreDetail } from "@/types/store";

const BarcodeContainer = ({
  storeDetail,
  initialRevealed = false,
}: {
  storeDetail: StoreDetail;
  initialRevealed?: boolean;
}) => {
  const [isBarcodeRevealed, setIsBarcodeRevealed] = useState(initialRevealed);
  const barcode = useUserStore((state) => state.user?.barcode ?? "");
  const { open, setInfo, setOnSuccess, close } = useBenefitConfirmModalStore();

  useEffect(() => {
    close();
  }, []);

  const handleBarcodeClick = () => {
    if (!isBarcodeRevealed) {
      setInfo(storeDetail.storeId, storeDetail);
      setOnSuccess(() => {
        setIsBarcodeRevealed(true);
      });
      open();
    }
  };

  return (
    <div className="space-y-2 pt-4">
      <div
        className={`relative cursor-pointer rounded-lg bg-gray-50 p-6 transition-all duration-300 ${
          !isBarcodeRevealed && barcode ? "hover:bg-gray-100" : ""
        }`}
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
              <p className="text-action-green text-sm">
                바코드를 등록하신 후 LGU+의 다양한 혜택을 이용하세요!
              </p>
              <p className="text-action-green text-sm">
                혜택 사용 시 사용자 맞춤 제휴처가 추천됩니다
              </p>
            </div>
          )}
        </div>
        {!isBarcodeRevealed && barcode && (
          <div onClick={handleBarcodeClick}>
            <BarcodeBlur />
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeContainer;
