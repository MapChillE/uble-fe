import { Heart } from 'lucide-react';


import classNames from 'classnames';

interface FavoriteBtnProps {
  /** brandId를 통해 향후 서버에 즐겨찾기 등록 요청 */
  brandId: number;
  bookmarked?: boolean;
  variant: string;
}
const FavoriteBtn = ({ brandId, bookmarked, variant }: FavoriteBtnProps) => {
  return (
    <button>
      <Heart
        className={classNames(
          variant === 'vertical' ? 'w-4 h-4' : 'w-5 h-5',
          bookmarked ? 'text-[#FD7563]' : 'text-gray-400 hover:text-gray-600'
        )}
        fill={bookmarked ? '#FD7563' : 'none'}
      />
    </button>
  );
};

export default FavoriteBtn;