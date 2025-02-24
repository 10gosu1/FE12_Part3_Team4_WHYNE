import { signIn } from "next-auth/react"; // NextAuth의 signIn 사용
import { AxiosError } from "axios";
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
    if (!refreshToken) throw new Error("리프레시 토큰이 없습니다.");

    const response = await apiClient.post("/auth/refresh-token", {
      refreshToken,
    });

    const { accessToken } = response.data;

    sessionStorage.setItem("accessToken", accessToken);

    console.log("토큰 갱신 성공! 새로운 액세스 토큰:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw error;
  }
};

// ✅ 카카오 소셜 로그인
export const socialSignIn = async (code: string) => {
  try {
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

    const response = await apiClient.post(`/auth/signIn/KAKAO`, {
      redirectUri,
      token: code,
    });

    const { accessToken, refreshToken } = response.data;

    if (typeof window !== "undefined") {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("토큰 갱신 실패:", error.response?.data || error.message);
    } else {
      console.error("토큰 갱신 실패: 알 수 없는 오류", error);
    }
    throw error;
  }
};
