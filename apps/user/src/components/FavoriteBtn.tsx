"use client";

import { Heart } from "lucide-react";
import classNames from "classnames";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavoriteMutation, postFavoritesMutation } from "@/service/favorites";
import { useState } from "react";

interface FavoriteBtnProps {
  /** brandId를 통해 향후 서버에 즐겨찾기 등록 요청 */
  brandId: number;
  bookmarked?: boolean;
  variant: string;
}
const FavoriteBtn = ({ brandId, bookmarked, variant }: FavoriteBtnProps) => {
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(bookmarked ?? false);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["favoriteBrands"] });
    queryClient.invalidateQueries({ queryKey: ["brands"] });
    queryClient.invalidateQueries({ queryKey: ["storeDetail", brandId] });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await deleteFavoriteMutation({ brandId });
        setIsLiked(false);
      } else {
        await postFavoritesMutation({ brandId });
        setIsLiked(true);
      }
    },
    onSuccess: invalidate,
    onError: (error: Error) => {
      setIsLiked((prev) => !prev); // 실패했으면 상태 복구
      alert(error.message);
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate();
  };

  return (
    <button onClick={handleClick} disabled={isPending}>
      <Heart
        className={classNames(
          variant === "vertical" ? "h-4 w-4" : "h-5 w-5",
          isLiked ? "text-[#FD7563]" : "text-gray-400 hover:text-gray-600"
        )}
        fill={isLiked ? "#FD7563" : "none"}
      />
    </button>
  );
};

export default FavoriteBtn;
