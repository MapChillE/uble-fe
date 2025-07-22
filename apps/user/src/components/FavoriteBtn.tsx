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
  bookmarkId?: number;
  variant: string;
}
const FavoriteBtn = ({ brandId, bookmarked, bookmarkId, variant }: FavoriteBtnProps) => {
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(bookmarked ?? false);

  // 즐겨찾기 등록
  const { mutate: like, isPending: isLiking } = useMutation({
    mutationFn: postFavoritesMutation,
    onMutate: () => setIsLiked(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteBrands"] });
      queryClient.invalidateQueries({ queryKey: ["storeDetail", brandId] });
    },
    onError: (error: Error) => {
      setIsLiked(false);
      alert(error.message);
    },
  });
  // 즐겨찾기 삭제
  const { mutate: unlike, isPending: isUnliking } = useMutation({
    mutationFn: deleteFavoriteMutation,
    onMutate: () => setIsLiked(false),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteBrands"] });
      queryClient.invalidateQueries({ queryKey: ["storeDetail", brandId] });
    },
    onError: (error: Error) => {
      setIsLiked(true);
      alert(error.message);
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      if (bookmarkId) {
        unlike({ bookmarkId });
      } else {
        alert("즐겨찾기 ID가 없어서 삭제할 수 없어요.");
      }
    } else {
      like({ brandId });
    }
  };

  return (
    <button onClick={handleClick} disabled={isLiking || isUnliking}>
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
