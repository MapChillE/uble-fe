import { Store } from "lucide-react";
import React from "react";

export interface OfflineBrand {
  id: number;
  name: string;
  imageUrl: string;
}

interface BrandCardProps {
  brand: OfflineBrand;
  isSelected: boolean;
  onSelect: () => void;
}

const BrandCard = ({ brand, isSelected, onSelect }: BrandCardProps) => {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
        isSelected
          ? "border-action-green bg-action-green/10"
          : "border-gray-100 hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        {brand.imageUrl ? (
          <img src={brand.imageUrl} alt={brand.name} className="h-full w-full object-cover" />
        ) : (
          <Store className="h-5 w-5 text-gray-500" />
        )}
      </div>
      <span className="flex-1 font-medium">{brand.name}</span>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          isSelected ? "border-action-green bg-action-green" : "border-gray-300"
        }`}
      >
        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
    </div>
  );
};

export default BrandCard;
