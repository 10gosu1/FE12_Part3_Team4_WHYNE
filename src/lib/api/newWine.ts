import apiClient from "./newApi";

export type WineData = {
  id?: number;
  name: string;
  region: string;
  image: string; // 선택적 이미지 URL
  price: number;
  avgRating?: number; // 선택적 평점
  type: "RED" | "WHITE" | "SPARKLING"; // 와인 종류
};

// 공통으로 사용할 accessToken을 세션에서 가져오는 함수
const getAccessToken = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access Token이 없습니다.");
  }
  return accessToken;
};

// ✅ 와인 생성
export const createWine = async (wineData: WineData) => {
  try {
    const response = await apiClient.post("/wines", wineData);
    return response.data;
  } catch (error) {
    console.error("❌ 와인 생성 실패:", error);
    throw error;
  }
};

// ✅ 와인 목록 조회
export const fetchWines = async (params: {
  limit?: number;
  cursor?: string;
  type?: "RED" | "WHITE" | "SPARKLING";
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
}) => {
  try {
    const response = await apiClient.get("/wines", { params });
    return response.data;
  } catch (error) {
    console.error("❌ 와인 목록 조회 실패:", error);
    throw error;
  }
};

// ✅ 추천 와인 목록 조회
export const fetchRecommendedWines = async (limit: number) => {
  try {
    const response = await apiClient.get("/wines/recommended", {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 추천 와인 목록 조회 실패:", error);
    throw error;
  }
};

// ✅ 와인 상세 조회
export const fetchWineById = async (wineId: number) => {
  try {
    const response = await apiClient.get(`/wines/${wineId}`);
    return response.data;
  } catch (error) {
    console.error("❌ 와인 상세 조회 실패:", error);
    throw error;
  }
};

// ✅ 와인 수정
export const updateWine = async (wineId: number, wineData: WineData) => {
  try {
    const response = await apiClient.patch(`/wines/${wineId}`, wineData);
    return response.data;
  } catch (error) {
    console.error("❌ 와인 수정 실패:", error);
    throw error;
  }
};

// ✅ 와인 삭제
export const deleteWine = async (wineId: number) => {
  try {
    const response = await apiClient.delete(`/wines/${wineId}`);
    return response.data;
  } catch (error) {
    console.error("❌ 와인 삭제 실패:", error);
    throw error;
  }
};

// ✅ 내 정보 조회
export const fetchUserProfile = async () => {
  try {
    const accessToken = getAccessToken(); // 공통으로 가져온 토큰 사용
    const response = await apiClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 내 정보 조회 실패:", error);
    throw error;
  }
};

// ✅ 내 정보 수정 (닉네임 및 프로필 이미지)
export const updateUserProfile = async (nickname: string, imageUrl: string) => {
  try {
    const accessToken = getAccessToken(); // 공통으로 가져온 토큰 사용
    const response = await apiClient.patch(
      "/users/me",
      {
        nickname,
        image: imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ 내 정보 수정 실패:", error);
    throw error;
  }
};

// ✅ 내가 작성한 리뷰 조회
export const fetchMyReviews = async (limit: number, cursor?: number | null) => {
  try {
    const accessToken = getAccessToken(); // 공통으로 가져온 토큰 사용
    const params: { limit: number; cursor?: number } = { limit };
    if (cursor !== null) params.cursor = cursor; // cursor가 null이면 제외

    const response = await apiClient.get("/users/me/reviews", {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 내가 작성한 리뷰 조회 실패:", error);
    throw error;
  }
};

// ✅ 내가 만든 와인 목록 조회
export const fetchMyWines = async (limit: number, cursor?: number) => {
  try {
    const accessToken = getAccessToken(); // 공통으로 가져온 토큰 사용
    const params: { limit: number; cursor?: number } = { limit };
    if (cursor !== null) params.cursor = cursor; // cursor 값이 있을 때만 추가

    const response = await apiClient.get("/users/me/wines", {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 내가 만든 와인 목록 조회 실패:", error);
    throw error;
  }
};
