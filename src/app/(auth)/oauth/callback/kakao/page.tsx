"use client"; // 클라이언트 전용으로 처리

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation"; // URL 쿼리 파라미터 접근
import { signInWithKakao } from "@/lib/api/kakaoAuth"; // 카카오 로그인 API 호출 함수
import { AxiosError } from "axios";

const KakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchedCode = searchParams.get("code");
    if (fetchedCode) {
      setCode(fetchedCode);
    } else {
      console.error("code 파라미터가 없습니다.");
      router.push("/signin");
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (code) {
      // 카카오 OAuth 인증 코드가 존재하면 서버에서 액세스 토큰을 얻어옴
      const authenticateWithKakao = async () => {
        try {
          const response = await signInWithKakao(code);
          console.log("카카오 로그인 성공:", response);

          // 로그인 성공 후 홈 화면으로 리디렉션
          router.push("/");
        } catch (error) {
          if (error instanceof AxiosError) {
            console.error(
              "카카오 로그인 실패:",
              error.response?.data || error.message
            );
            // 실패 시 실패 페이지나 메세지 처리
            router.push("/signin");
          } else {
            console.error("알 수 없는 오류 발생:", error);
            router.push("/signin");
          }
        }
      };

      authenticateWithKakao();
    }
  }, [code, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>카카오 로그인 중...</p>
    </div>
  );
};

// Suspense로 감싸서 클라이언트 전용 컴포넌트를 처리합니다.
export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <KakaoCallback />
    </Suspense>
  );
}
