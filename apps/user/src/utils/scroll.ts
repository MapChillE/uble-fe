import { RefObject } from "react";

export const scroll = (
  dir: "left" | "right",
  scrollContainerRef: RefObject<HTMLDivElement | null>
) => {
  const el = scrollContainerRef.current;
  if (!el) return;
  el.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
};
