import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

type IntersectionObserverProps = {
  hasNextPage: boolean | false;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
};

function useInfiniteScroll({ hasNextPage, fetchNextPage }: IntersectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry?.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref.current) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 1 });
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, [ref, handleIntersect]);

  return ref;
}

export default useInfiniteScroll;
