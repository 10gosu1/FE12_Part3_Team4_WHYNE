import apiClient from "./api";

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
    return response.data;
  } catch (error: any) {
    console.error("❌ 회원가입 실패:", error.response?.data || error);
    throw error;
  }
};

// ✅ 로그인
export const signIn = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/signIn", { email, password });

    const { accessToken, refreshToken } = response.data;

    console.log("🛠 로그인 응답 데이터:", response.data);
    console.log("🛠 저장할 accessToken:", accessToken);

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    console.log("✅ 토큰이 저장됨! localStorage 확인 필요");

    return response.data;
  } catch (error) {
    console.error("❌ 로그인 실패:", error);
    throw error;
  }
};

// ✅ 액세스 토큰 갱신
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("리프레시 토큰이 없습니다.");

    const response = await apiClient.post("/auth/refresh-token", {
      refreshToken,
    });

    const { accessToken } = response.data;

    localStorage.setItem("access_token", accessToken);

    console.log("토큰 갱신 성공! 새로운 액세스 토큰:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw error;
  }
};

// ✅ 카카오 소셜 로그인
export const socialSignIn = async (token: string) => {
  try {
    const response = await apiClient.post(`/auth/signIn/KAKAO`, {
      token,
      redirectUri: "http://localhost:3000/oauth/kakao", // 배포 시 변경 필요
    });

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    console.log(`카카오 로그인 성공! 액세스 토큰:`, accessToken);
    return response.data;
  } catch (error) {
    console.error(`카카오 로그인 실패:`, error);
    throw error;
  }
};
