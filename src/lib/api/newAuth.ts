import { signIn } from "next-auth/react"; // NextAuth의 signIn 사용
import axios, { AxiosError } from "axios";
import apiClient from "./newApi";

// ✅ 회원가입
export const signUp = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string
) => {
  try {
    const response = await apiClient.post(
      "/auth/signUp",
      {
        email,
        nickname,
        password,
        passwordConfirmation,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: false, // ✅ CORS 문제 방지
      }
    );
    console.log("✅ 회원가입 성공:", response.data);

    // 회원가입 후 로그인 처리
    const loginResponse = await signIn("credentials", {
      redirect: false, // 리다이렉트 없이 응답만 받기
      email,
      password,
    });
    console.log("✅ 로그인 성공 후 세션 처리:", loginResponse);

    return loginResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("❌ 회원가입 실패:", error.response?.data || error);
    } else {
      console.error("❌ 회원가입 실패: 알 수 없는 오류");
    }
    throw error;
  }
};

// ✅ 로그인
export const logIn = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/signIn", { email, password });

    const { accessToken, refreshToken, user } = response.data;

    console.log("🛠 로그인 응답 데이터:", response.data);

    if (typeof window !== "undefined") {
      // ✅ 토큰 저장 (세션스토리지로 변경)
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      // ✅ 사용자 ID 저장 (세션스토리지로 변경)
      sessionStorage.setItem("user_id", String(user.id));

      console.log("✅ 로그인 완료 - user_id 저장:", user.id);
      console.log("✅ 로그인 완료 - 저장된 refreshToken:", sessionStorage.getItem("refreshToken"));

    }
    return response.data;
  } catch (error) {
    console.error("❌ 로그인 실패:", error);
    throw error;
  }
};

// ✅ 액세스 토큰 갱신
export const refreshAccessToken = async () => {
  try {
    if (typeof window === "undefined") throw new Error("브라우저 환경이 아닙니다.");

    const refreshToken = sessionStorage.getItem("refreshToken");
    
    if (!refreshToken) {
      console.error("❌ 리프레시 토큰 없음. 로그아웃 처리");
      window.location.href = "/signin"; // 로그인 페이지로 이동
      return;
    }

    console.log("🔹 [refreshAccessToken] 사용되는 리프레시 토큰:", refreshToken);

    // 기존 accessToken 삭제 (오염된 토큰 방지)
    sessionStorage.removeItem("accessToken");

    console.log("🔹 [refreshAccessToken] API 요청 시작 - /auth/refresh-token");

    const response = await apiClient.post("/auth/refresh-token", { refreshToken });

    console.log("✅ [refreshAccessToken] 토큰 갱신 응답:", response.data);

    if (!response.data || !response.data.accessToken) {
      console.error("❌ [refreshAccessToken] 응답 데이터 오류:", response.data);
      throw new Error("토큰 갱신 실패");
    }

    const { accessToken } = response.data;

    sessionStorage.setItem("accessToken", accessToken);

    console.log("✅ [refreshAccessToken] 새 액세스 토큰 저장 완료:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("❌ [refreshAccessToken] 토큰 갱신 실패:", error);

    // 리프레시 토큰이 만료되었거나 문제가 생기면 로그아웃 처리
    window.location.href = "/signin";

    throw error;
  }
};


// ✅ 카카오 소셜 로그인
export const socialSignIn = async (code: string) => {
  try {
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
    console.log("카카오 로그인 요청 - 코드:", code);


    const response = await apiClient.post(`/auth/signIn/KAKAO`, {
      redirectUri,
      token: code,
    });
    console.log("카카오 로그인 응답: ", response.data);  // 응답 데이터 확인

    const { accessToken, refreshToken, user } = response.data;

    if (typeof window !== "undefined") {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
    }

    return {
      accessToken,
      refreshToken,
      user, // 사용자 정보 포함
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("토큰 갱신 실패:", error.response?.data || error.message);
    } else {
      console.error("토큰 갱신 실패: 알 수 없는 오류", error);
    }
    throw error;
  }
};
