import apiClient from "./api";

// ✅ 리뷰 생성
export const createReview = async (reviewData: {
  rating: number; // 평점
  lightBold: number; // 바디감
  smoothTannic: number; // 타닌
  drySweet: number; // 당도
  softAcidic: number; // 산미
  aroma: string[]; // 향
  content: string; // 내용
  wineId: number; // 와인id
}) => {
  try {
    const response = await apiClient.post("/reviews", reviewData);
    return response.data;
  } catch (error) {
    console.error("❌ 리뷰 생성 실패:", error);
    throw error;
  }
};

// ✅ 특정 리뷰 조회
export const fetchReviewById = async (reviewId: number) => {
  try {
    const response = await apiClient.get(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("❌ 리뷰 조회 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 수정
export const updateReview = async (
  reviewId: number,
  reviewData: {
    rating: number; //평점
    lightBold: number; // 바디감
    smoothTannic: number; // 타닌
    drySweet: number; // 당도
    softAcidic: number; // 산미
    aroma: string[]; // 향
    content: string; // 내용
  }
) => {
  try {
    const response = await apiClient.patch(`/reviews/${reviewId}`, reviewData);
    return response.data;
  } catch (error) {
    console.error("❌ 리뷰 수정 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 삭제
export const deleteReview = async (reviewId: number) => {
  try {
    const response = await apiClient.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("❌ 리뷰 삭제 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 좋아요 추가
export const likeReview = async (reviewId: number) => {
  try {
    const response = await apiClient.post(`/reviews/${reviewId}/like`);
    return response.data;
  } catch (error) {
    console.error("❌ 리뷰 좋아요 추가 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 좋아요 취소
export const unlikeReview = async (reviewId: number) => {
  try {
    const response = await apiClient.delete(`/reviews/${reviewId}/like`);
    return response.data;
  } catch (error) {
    console.error("❌ 리뷰 좋아요 취소 실패:", error);
    throw error;
  }
};
