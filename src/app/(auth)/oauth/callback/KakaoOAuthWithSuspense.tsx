"use client"; // 클라이언트 전용

import { Suspense } from "react";
import KakaoCallback from "./kakao/page";

export default function KakaoOAuthWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KakaoCallback />
    </Suspense>
  );
}
