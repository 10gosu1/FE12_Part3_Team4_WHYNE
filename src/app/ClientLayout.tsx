// app/ClientLayout.tsx
"use client"; // 이 파일은 클라이언트에서 실행

import { SessionProvider } from "next-auth/react";
import { OAuthAppProvider } from "@/context/OAuthAppProvider";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      <OAuthAppProvider>{children}</OAuthAppProvider>
    </SessionProvider>
  );
};

export default ClientLayout;
