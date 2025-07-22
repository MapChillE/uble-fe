import FavoriteBtn from "@/components/FavoriteBtn";
import { BrandDetailData } from "@/types/brand";
import { Badge } from "@workspace/ui/components/badge";

const PartnershipHeader = (props: BrandDetailData) => {
  const { imgUrl, name, categoryName, description, brandId, isBookmarked, csrNumber } = props;
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex flex-col items-start space-y-4">
        <img
          src={imgUrl || "/placeholder.png"}
          alt={name}
          className="w-24 h-24 rounded object-cover flex-shrink-0"
        />
        <div className="space-y-1 w-full">
          <Badge variant="default">{categoryName}</Badge>
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="flex items-center justify-between w-full">
            <p className="text-gray-600 flex-1">{description}</p>
          </div>
          <p className="text-gray-600 flex-1">{csrNumber}</p>

        </div>
      </div>
      <div className="flex space-x-2">
        <div className="p-0 bg-transparent border-none cursor-pointer">
          <FavoriteBtn brandId={brandId} bookmarked={isBookmarked} variant="default" />
        </div>
      </div>
    </div>
  );
};

export default PartnershipHeader;