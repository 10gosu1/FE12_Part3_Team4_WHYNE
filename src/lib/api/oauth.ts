import apiClient from "./api";

// ✅ 간편 로그인 앱 등록 (카카오만 지원)
export const registerKakaoOAuthApp = async (appKey: string) => {
  try {
    const response = await apiClient.post("/oauthApps", {
      appKey,
      provider: "KAKAO",
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ 간편 로그인 앱 등록 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
};
