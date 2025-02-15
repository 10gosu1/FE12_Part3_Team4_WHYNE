import apiClient from "./api";

// ✅ 내 정보 조회
export const fetchUserProfile = async () => {
  try {
    const response = await apiClient.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("❌ 내 정보 조회 실패:", error);
    throw error;
  }
};

// ✅ 내 정보 수정 (닉네임 및 프로필 이미지)
export const updateUserProfile = async (nickname: string, imageUrl: string) => {
  try {
    const response = await apiClient.patch("/users/me", {
      nickname,
      image: imageUrl,
    });
    return response.data;
  } catch (error) {
    console.error("❌ 내 정보 수정 실패:", error);
    throw error;
  }
};

// ✅ 내가 작성한 리뷰 조회
export const fetchMyReviews = async (limit: number, cursor?: number | null) => {
  try {
    const params: { limit: number; cursor?: number } = { limit };
    if (cursor !== null) params.cursor = cursor; // ✅ cursor가 null이면 요청에서 제외

    const response = await apiClient.get("/users/me/reviews", { params });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ 내가 작성한 리뷰 조회 실패:", error);
    } else {
      console.error("❌ 내가 작성한 리뷰 조회 실패: 알 수 없는 오류");
    }
    throw error;
  }
};

// ✅ 내가 만든 와인 목록 조회
export const fetchMyWines = async (limit: number, cursor?: string) => {
  try {
    const params: { limit: number; cursor?: string } = { limit };
    if (cursor) params.cursor = cursor; // cursor 값이 있을 때만 추가

    const response = await apiClient.get("/users/me/wines", { params });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ 내가 만든 와인 목록 조회 실패:", error);
    } else {
      console.error("❌ 내가 만든 와인 목록 조회 실패: 알 수 없는 오류");
    }
    throw error;
  }
};
