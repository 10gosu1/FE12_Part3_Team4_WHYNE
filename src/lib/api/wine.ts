import apiClient from "./api";

// ✅ 와인 생성
export const createWine = async (wineData: any) => {
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
    const response = await apiClient.get("/wines/recommend", {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 추천 와인 목록 조회 실패:", error);
    throw error;
  }
};

// ✅ 와인 상세 조회
export const fetchWineById = async (wineId: string) => {
  try {
    const response = await apiClient.get(`/wines/${wineId}`);
    return response.data;
  } catch (error) {
    console.error("❌ 와인 상세 조회 실패:", error);
    throw error;
  }
};

// ✅ 와인 수정
export const updateWine = async (wineId: string, wineData: any) => {
  try {
    const response = await apiClient.patch(`/wines/${wineId}`, wineData);
    return response.data;
  } catch (error) {
    console.error("❌ 와인 수정 실패:", error);
    throw error;
  }
};

// ✅ 와인 삭제
export const deleteWine = async (wineId: string) => {
  try {
    const response = await apiClient.delete(`/wines/${wineId}`);
    return response.data;
  } catch (error) {
    console.error("❌ 와인 삭제 실패:", error);
    throw error;
  }
};
