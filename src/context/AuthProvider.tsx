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
import { CustomSession } from "@/lib/auth"; // CustomSession 타입을 가져온다고 가정

// 1. UserProps 타입 정의
interface UserProps {
  email: string;
  nickname: string;
  image: string | null;
  id: string; // 추가된 부분
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
  const [user, setUser] = useState<UserProps | undefined>(undefined); // 유저 상태 저장

  useEffect(() => {
    if (status === "loading") return; // 로딩 중이면 아무것도 안 함
    console.log("Session status:", status); // 세션 상태

    console.log("Session data:", session); // 세션 값 확인

    if (session?.user) {
      setUser({
        email: session.user.email!,
        nickname: session.user.name || "닉네임 없음",
        image: session.user.image || null,
        id: (session as CustomSession).user.id, // 세션에서 id를 가져와 저장

      });
      const accessToken = (session as CustomSession).user.accessToken;
      const refreshToken = (session as CustomSession).user.refreshToken;
      const userId = (session as CustomSession).user.id;


      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
      }
      if (refreshToken) {
        sessionStorage.setItem("refreshToken", refreshToken);
      }
      if (userId) {
        sessionStorage.setItem("userId", userId); // 아이디도 sessionStorage에 저장
      }
    } else {
      setUser(undefined); // 세션이 없을 경우, 유저 상태를 undefined로 설정
      sessionStorage.removeItem("accessToken"); // 세션에서 토큰 삭제
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("userId"); // 아이디도 삭제

    }
  }, [session, status]);

  // 로그아웃 처리
  const logout = async () => {
    await signOut({ callbackUrl: "/" }); // 리다이렉트할 URL
    sessionStorage.removeItem("accessToken"); // 로그아웃 시, sessionStorage에서 accessToken 삭제
    sessionStorage.removeItem("refreshToken"); // 로그아웃 시, sessionStorage에서 refreshToken 삭제
    sessionStorage.removeItem("userId"); // 로그아웃 시, sessionStorage에서 userId 삭제

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
