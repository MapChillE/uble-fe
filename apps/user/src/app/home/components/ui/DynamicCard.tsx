import React from 'react';

import { Card, CardContent } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { Heart } from 'lucide-react';
import MembershipGrade from './MembershipGrade';
import { BrandContent } from '@/types/brand';
import classNames from 'classnames';

type Variant = 'vertical' | 'horizontal';
interface DynamicCardProps {
  data: BrandContent;
  variant?: Variant;
}
const DynamicCard = ({ data, variant = "vertical" }: DynamicCardProps) => {
  const {
    brandId,
    name,
    category,
    description,
    imgUrl,
    isVIPcock,
    minRank,
    bookmarked,
  } = data;
  const FavoriteBtn = () => (
    // <button
    //   onClick={(e) => { e.stopPropagation(); toggleFavorite?.(brandId); }}
    //   className="flex-shrink-0"
    // >
    <Heart
      className={classNames(
        variant === 'vertical' ? 'w-4 h-4' : 'w-5 h-5',
        bookmarked ? 'text-[#FD7563]' : 'text-gray-400'
      )}
      fill={bookmarked ? '#FD7563' : 'none'}
    />
    // </button>
  );

  return (
    <Card
      // onClick={onClick}
      className={classNames(
        'cursor-pointer hover:border-[#41d596] hover:shadow-lg transition-all duration-200 border-gray-200 bg-white',
        {
          // 세로형: 고정 너비 & 세로 레이아웃
          'flex-shrink-0 w-64': variant === 'vertical',
          // 가로형: 가로로 늘어나는 flex row
          'relative': variant === 'horizontal',
        }
      )}
    >
      <CardContent className={variant === 'vertical' ? 'p-0' : 'p-4'}>
        {variant === 'vertical' ? (
          // --- Vertical Layout ---
          <>
            <div className="relative">
              <img
                src={imgUrl || '/placeholder.svg'} alt={name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-semibold">
                  {category}
                </span>
                <FavoriteBtn />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{name}</h3>
              <h5 className="text-gray-900 text-sm line-clamp-1">{description}</h5>
              <div className="flex flex-col items-end space-y-0.5">
                <MembershipGrade rank={minRank} isVIPcock={isVIPcock} />
              </div>
            </div>
          </>
        ) : (
          // --- Horizontal Layout ---
          <div className="flex items-center space-x-4">
            <img
              src={imgUrl || '/placeholder.svg'} alt={name}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-1 font-semibold">{category}</p>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight truncate">{name}</h4>
                </div>
                <FavoriteBtn />
              </div>
              <h5 className="text-gray-900 text-sm line-clamp-2 mb-2">{description}</h5>
              {/* 등급별 배치 */}
              <div className="flex flex-col space-y-1 mb-2">
                {/* 예시: getGradeLayout 같은 helper를 쓰셔도 되고 */}
                <MembershipGrade rank={minRank} isVIPcock={isVIPcock} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DynamicCard;