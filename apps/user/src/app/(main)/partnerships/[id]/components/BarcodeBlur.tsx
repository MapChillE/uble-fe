import { Barcode } from "lucide-react";

const BarcodeBlur = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/70 backdrop-blur-sm">
      <div className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#41d596]">
          <Barcode className="h-6 w-6 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-700">클릭하여 바코드 활성화</p>
      </div>
    </div>
  );
};

export default BarcodeBlur;
