import axios from "axios";
import { refreshAccessToken } from "./newAuth";

const API_BASE_URL = "https://winereview-api.vercel.app/12-4"; // 팀 ID 포함

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ 요청을 가로채서 access_token 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("accessToken"); // sessionStorage에서 토큰 가져오기
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 추가
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터로 401 에러 처리 및 토큰 갱신
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ 401 오류 발생 - 토큰 갱신 시도");

      try {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          console.error("❌ 토큰 갱신 실패 - 로그인 페이지로 이동");
          window.location.href = "/signin";
          return Promise.reject(error);
        }

        // 원래 요청에 새 토큰 적용 후 재시도
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient(error.config);
      } catch (refreshError) {
        console.error("❌ 토큰 갱신 중 오류:", refreshError);
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
