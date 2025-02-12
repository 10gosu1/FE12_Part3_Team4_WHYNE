"use client";

import localFont from "next/font/local";
import "@/styles/globals.css";
import { useEffect } from "react";
import { registerKakaoOAuthApp } from "@/lib/api/oauth";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const registerApp = async () => {
      try {
        // 카카오 앱 등록
        await registerKakaoOAuthApp(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!);
        console.log("✅ 카카오 앱 등록 완료");
      } catch (error) {
        console.error("❌ 카카오 앱 등록 실패:", error);
      }
    };

    // 최초 1회 실행
    registerApp();
  }, []); // 빈 배열로 최초 1회만 실행
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>{children}</body>
    </html>
  );
}
