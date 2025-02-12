"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation"; // URL 쿼리 파라미터 접근
import { signInWithKakao } from "@/lib/api/kakaoAuth"; // 카카오 로그인 API 호출 함수

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code"); // URL에서 'code' 파라미터 추출

  useEffect(() => {
    console.log("URL에서 받은 code:", code); // 여기에 code 값을 출력

    if (code) {
      // 카카오 OAuth 인증 코드가 존재하면 서버에서 액세스 토큰을 얻어옴
      const authenticateWithKakao = async () => {
        try {
          const response = await signInWithKakao(code);
          console.log("카카오 로그인 성공:", response);

          // 로그인 성공 후 홈 화면으로 리디렉션
          router.push("/");
        } catch (error) {
          console.error(
            "!!!!!카카오 로그인 실패:",
            error.response?.data || error.message
          );
          // 실패 시 실패 페이지나 메세지 처리
          router.push("/signin");
        }
      };

      authenticateWithKakao();
    } else {
      console.error("code 파라미터가 없습니다."); // code가 없을 경우 오류 출력
      router.push("/signin");
    }
  }, [code, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>카카오 로그인 중...</p>
    </div>
  );
}
