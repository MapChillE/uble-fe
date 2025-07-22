"use client";

import { Heart } from "lucide-react";
import classNames from "classnames";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavoritesMutation } from "@/service/favorites";
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

  const { mutate, isPending } = useMutation({
    mutationFn: isLiked ? postFavoritesMutation : postFavoritesMutation,
    onMutate: () => {
      setIsLiked((prev) => !prev);
    },
    onSuccess: () => {
      alert("즐겨찾기에 추가됐어요!");
      queryClient.invalidateQueries({ queryKey: ["favoriteBrands"] });
      queryClient.invalidateQueries({ queryKey: ["storeDetail", brandId] });
    },
    onError: (error: Error) => {
      setIsLiked((prev) => !prev);
      alert(error.message);
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!bookmarked) {
      mutate({ brandId });
    } else {
      // 즐겨찾기 삭제
    }
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
