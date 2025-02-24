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
import { useRouter } from "next/navigation";
import { signOut, useSession, SessionProvider } from "next-auth/react";

/**
 * UserProps
 * @typedef {Object} UserProps
 * @property {string} email - 로그인한 사용자의 이메일
 * @property {string} nickname - 사용자의 닉네임
 * @property {string | null} image - 사용자의 프로필 이미지, 없을 경우 null
 */
interface UserProps {
  email: string;
  nickname: string;
  image: string | null;
}

/**
 * UserContextProps
 * @typedef {Object} UserContextProps
 * @property {boolean} isLoading - 사용자 정보 로딩 상태
 * @property {UserProps | undefined} user - 로그인된 사용자 정보
 * @property {Dispatch<SetStateAction<UserProps | undefined>>} setUser - 사용자 정보를 설정하는 함수
 * @property {() => void} logout - 로그아웃을 처리하는 함수
 */
interface UserContextProps {
  isLoading: boolean;
  user?: UserProps;
  setUser: Dispatch<SetStateAction<UserProps | undefined>>;
  logout: () => void;
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
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // 로딩 중이면 아무것도 안 함

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

  const logout = async () => {
    await signOut({ callbackUrl: "/" }); // NextAuth 로그아웃 처리
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
