import apiClient from "./newApi";

// ✅ 내 정보 조회
export const fetchUserProfile = async () => {
  try {
    const accessToken = sessionStorage.getItem("accessToken"); // 세션에서 토큰 가져오기
    if (!accessToken) {
      throw new Error("Access Token이 없습니다.");
    }

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
    const accessToken = sessionStorage.getItem("accessToken"); // 세션에서 토큰 가져오기
    if (!accessToken) {
      console.error("❌ Access Token이 없습니다.");
      throw new Error("Access Token이 없습니다.");
    }
    console.log("🛠 accessToken 확인:", accessToken); // ✅ 토큰 확인용 로그 추가

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

    console.log("✅ 서버 응답 데이터:", response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error("❌ 내 정보 수정 실패:", error);
    throw error;
  }
};

// ✅ 내가 작성한 리뷰 조회
export const fetchMyReviews = async (limit: number, cursor?: number | null) => {
  try {
    const accessToken = sessionStorage.getItem("accessToken"); // 세션에서 토큰 가져오기

    console.log("Access Token:", accessToken); // 콘솔에 출력

    if (!accessToken) {
      throw new Error("😓Access Token이 없습니다.");
    }

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
    const accessToken = sessionStorage.getItem("accessToken"); // 세션에서 토큰 가져오기
    console.log("🟢 API 요청에 사용할 토큰:", accessToken);

    if (!accessToken) {
      throw new Error("😢 Access Token이 없습니다.");
    }

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
