"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithKakao } from "@/lib/api/kakaoAuth"; // 카카오 로그인 API 호출 함수
import { signUp } from "@/lib/api/auth"; // 회원가입 API 호출 함수 (추가 예시)

export default function OAuthSignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 로그인 후 사용자 정보 처리
    const authenticateWithKakao = async () => {
      setLoading(true);
      try {
        const code = new URLSearchParams(window.location.search).get("code");
        if (code) {
          // 카카오 로그인으로 받은 code로 로그인 처리
          const response = await signInWithKakao(code);
          console.log("카카오 로그인 성공:", response);

          // 카카오 로그인 후 사용자 정보가 있으면 회원가입 처리
          const kakaoUser = response.user; // 예시: 로그인 후 받은 사용자 정보

          // 회원가입 처리 (예시: 카카오에서 받은 사용자 정보로 회원가입)
          const userData = {
            email: kakaoUser.email,
            nickname: kakaoUser.nickname || "기본닉네임", // 예시: 기본닉네임
            password: "기본비밀번호", // 비밀번호는 카카오에서 받지 않으므로 적절히 처리 필요
            passwordConfirmation: "기본비밀번호", // 비밀번호 확인
          };

          // 회원가입 API 호출
          const registerResponse = await signUp(
            userData.email,
            userData.nickname,
            userData.password,
            userData.passwordConfirmation
          );
          console.log("회원가입 성공:", registerResponse);

          // 홈 화면으로 리디렉션
          router.push("/");
        } else {
          setError("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("카카오 로그인/회원가입 실패:", error);
        setError(
          "카카오 로그인 또는 회원가입에 실패했습니다. 다시 시도해주세요."
        );
      } finally {
        setLoading(false);
      }
    };

    authenticateWithKakao();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading ? (
        <p>회원가입 처리 중...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>카카오 로그인 후 회원가입을 진행 중입니다...</p>
      )}
    </div>
  );
}
