import axios from "axios";

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

export default apiClient;
