import axios from "axios";
import { socialSignIn } from "./auth";

// 카카오 로그인 처리 함수
export const signInWithKakao = async (code: string) => {
  try {
    console.log("카카오 로그인 인증 코드:", code);

    // ✅ 1. 백엔드 API로 카카오 인증 코드 전송
    const response = await socialSignIn(code); // socialSignIn 함수 호출

    // ✅ 2. 백엔드에서 받은 토큰 응답
    const { accessToken, refreshToken, user } = response;

    console.log("✅ 카카오 로그인 성공, 액세스 토큰:", accessToken);
    console.log("✅ 사용자 정보:", user);
    return { accessToken, refreshToken, user }; // 필요에 따라 리턴할 데이터 처리
  } catch (error) {
    console.error(
      "❌ 카카오 로그인 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
};
