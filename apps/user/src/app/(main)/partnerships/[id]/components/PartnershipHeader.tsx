import FavoriteBtn from "@/components/FavoriteBtn";
import { BrandDetailData } from "@/types/brand";
import { Badge } from "@workspace/ui/components/badge";

const PartnershipHeader = (props: BrandDetailData) => {
  const { imgUrl, name, categoryName, description, brandId, isBookmarked, csrNumber } = props;
  return (
    <div className="mb-4 flex items-start justify-between">
      <div className="flex flex-col items-start space-y-4">
        <img
          src={imgUrl || "/placeholder.png"}
          alt={name}
          className="h-24 w-24 flex-shrink-0 rounded object-cover"
        />
        <div className="w-full space-y-1">
          <Badge variant="default">{categoryName}</Badge>
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="flex w-full items-center justify-between">
            <p className="flex-1 text-gray-600">{description}</p>
          </div>
          <p className="flex-1 text-gray-600">{csrNumber}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="cursor-pointer border-none bg-transparent p-0">
          <FavoriteBtn brandId={brandId} bookmarked={isBookmarked} variant="default" />
        </div>
      </div>
    </div>
  );
};

export default PartnershipHeader;
