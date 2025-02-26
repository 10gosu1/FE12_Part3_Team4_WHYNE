import apiClient from "./newApi";

// 공통으로 사용할 accessToken을 세션에서 가져오는 함수
const getAccessToken = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access Token이 없습니다.");
  }
  return accessToken;
};

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
    const accessToken = getAccessToken();
    const response = await apiClient.post("/reviews", reviewData, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ 리뷰 생성 실패:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ✅ 특정 리뷰 조회
export const fetchReviewById = async (reviewId: number) => {
  try {
    const accessToken = getAccessToken();
    const response = await apiClient.get(`/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
    const accessToken = getAccessToken();
    const response = await apiClient.patch(`/reviews/${reviewId}`, reviewData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 리뷰 수정 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 삭제
export const deleteReview = async (reviewId: number) => {
  try {
    const accessToken = getAccessToken();
    const response = await apiClient.delete(`/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 리뷰 삭제 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 좋아요 추가
export const likeReview = async (reviewId: number) => {
  try {
    const accessToken = getAccessToken();
    const response = await apiClient.post(`/reviews/${reviewId}/like`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 리뷰 좋아요 추가 실패:", error);
    throw error;
  }
};

// ✅ 리뷰 좋아요 취소
export const unlikeReview = async (reviewId: number) => {
  try {
    const accessToken = getAccessToken();
    const response = await apiClient.delete(`/reviews/${reviewId}/like`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 리뷰 좋아요 취소 실패:", error);
    throw error;
  }
};
