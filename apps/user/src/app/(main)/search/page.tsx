"use client";

import { Suspense } from "react";
import SearchContainer from "./components/SearchContainer";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SearchContainer />
    </Suspense>
  );
}
