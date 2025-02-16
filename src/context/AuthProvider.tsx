"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { fetchUserProfile } from "@/lib/api/user";

/**
 * UserProps
 * @typedef {Object} UserProps
 * @property {string} email - 로그인한 사용자의 이메일
 * @property {string} nickname - 사용자의 닉네임
 * @property {string | null} image - 사용자의 프로필 이미지, 없을 경우 null
 */

/**
 * UserContextProps
 * @typedef {Object} UserContextProps
 * @property {boolean} isLoading - 사용자 정보 로딩 상태
 * @property {UserProps | undefined} user - 로그인된 사용자 정보 (없을 경우 undefined)
 * @property {Dispatch<SetStateAction<UserProps | undefined>>} setUser - 사용자 정보를 설정하는 함수
 * @property {() => void} logout - 로그아웃을 처리하는 함수
 */

interface UserProps {
  email: string;
  nickname: string;
  image: string | null;
}

interface UserContextProps {
  isLoading: boolean;
  user?: UserProps;
  setUser: Dispatch<SetStateAction<UserProps | undefined>>;
  logout: () => void;
}

// UserContext 생성
const UserContext = createContext<UserContextProps | undefined>(undefined);

/**
 * AuthProvider 컴포넌트
 * @description 애플리케이션의 루트 또는 특정 컴포넌트 트리에서 감싸줘야 함.
 * @param {ReactNode} children - AuthProvider가 감싸게 될 컴포넌트들
 * @returns {JSX.Element} - AuthProvider 컴포넌트
 */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태
  const [user, setUser] = useState<UserProps>(); // 로그인된 사용자 정보
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(undefined);
    router.push("/");
  }, [router]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    console.log("Checking login state...");

    // 토큰, 이메일 정보가 있으면 사용자 정보 조회
    if (access || refresh || email) {
      fetchUserProfile()
        .then((data) => {
          const { nickname, image } = data;
          setUser({ email: email as string, nickname, image });
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    console.log("isLoading 상태 변경:", isLoading);
    console.log("user 상태 변경:", user);
  }, [isLoading, user]);

  return (
    <UserContext.Provider value={{ isLoading, user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * useAuth 훅
 * @description UserContext의 값을 가져오는 훅. Context가 없으면 에러를 발생시킴.
 * @returns {UserContextProps} - UserContext의 값
 * @throws {Error} - AuthProvider로 감싸지 않으면 에러 발생
 */

export function useAuth() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useAuth는 반드시 AuthProvider 노드 안에서 사용돼야 합니다."
    );
  }
  return context;
}

/**
 * 사용법:
 *
 * 1. AuthProvider를 루트 컴포넌트 혹은 필요한 컴포넌트 트리의 상위에 감싸주세요.
 *    예시:
 *    ```tsx
 *    <AuthProvider>
 *      <YourComponent />
 *    </AuthProvider>
 *    ```
 */
