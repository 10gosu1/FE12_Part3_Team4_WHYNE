import axios from "axios";
import { refreshAccessToken } from "./auth";

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
    const token = localStorage.getItem("access_token"); // ✅ 저장된 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✅ Authorization 헤더 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터로 401 에러 처리 및 토큰 갱신
apiClient.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    if (error.response && error.response.status === 401) {
      // 401 에러가 발생하면 토큰 갱신 시도
      try {
        const newAccessToken = await refreshAccessToken(); // refresh token으로 access token 갱신
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`; // 갱신된 토큰을 다시 헤더에 설정
        return apiClient(error.config); // 갱신된 토큰으로 원래 요청 재시도
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
        // 토큰 갱신 실패 시 로그인 페이지로 리디렉션
        if (refreshError.response?.status === 401) {
          window.location.href = "/signin"; // 로그인 페이지로 리디렉션
        }
        return Promise.reject(refreshError); // 갱신 실패 시 에러 처리
      }
    }
    return Promise.reject(error); // 그 외의 에러는 그대로 처리
  }
);

export default apiClient;
