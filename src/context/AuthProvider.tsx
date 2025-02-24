"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { signOut, useSession, SessionProvider } from "next-auth/react";

// 1. UserProps 타입 정의
interface UserProps {
  email: string;
  nickname: string;
  image: string | null;
}

// 2. UserContextProps 타입 정의
interface UserContextProps {
  isLoading: boolean;
  user: UserProps | undefined;
  setUser: Dispatch<SetStateAction<UserProps | undefined>>;
  logout: () => Promise<void>;
}

// UserContext 생성
const UserContext = createContext<UserContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession(); // NextAuth의 세션 정보 가져오기
  const [user, setUser] = useState<UserProps>(); // 유저 상태 저장

  useEffect(() => {
    if (status === "loading") return; // 로딩 중이면 아무것도 안 함
    console.log("Session data:", session); // 세션 값 확인

    if (session?.user) {
      setUser({
        email: session.user.email!,
        nickname: session.user.name || "닉네임 없음",
        image: session.user.image || null,
      });
    } else {
      setUser(undefined);
    }
  }, [session, status]);

  // 로그아웃 처리
  const logout = async () => {
    await signOut({ callbackUrl: "/" }); // 리다이렉트할 URL
  };

  return (
    <UserContext.Provider value={{ isLoading: status === "loading", user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth는 반드시 AuthProvider 안에서 사용해야 합니다.");
  }
  return context;
}
