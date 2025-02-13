"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { registerKakaoOAuthApp } from "@/lib/api/oauth";

interface OAuthAppContextProps {
  registerApp: () => void;
}

const OAuthAppContext = createContext<OAuthAppContextProps | undefined>(
  undefined
);

export const OAuthAppProvider = ({ children }: { children: ReactNode }) => {
  const registerApp = async () => {
    try {
      // 카카오 앱 등록
      await registerKakaoOAuthApp(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!);
      console.log("✅ 카카오 앱 등록 완료");
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ 카카오 앱 등록 실패:", error);
      }
    }
  };

  useEffect(() => {
    registerApp();
  }, []);

  return (
    <OAuthAppContext.Provider value={{ registerApp }}>
      {children}
    </OAuthAppContext.Provider>
  );
};

export const useOAuthApp = () => {
  const context = useContext(OAuthAppContext);
  if (!context) {
    throw new Error(
      "useOAuthApp은 반드시 OAuthAppProvider 노드 안에서 사용돼야 합니다."
    );
  }
  return context;
};
