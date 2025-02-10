import axios from "axios";

export async function signIn(data: { email: string; password: string }) {
  try {
    const response = await axios.post(
      "https://winereview-api.vercel.app/12-4/auth/signIn",
      {
        email: data.email,
        password: data.password,
      }
    );

    return response.data; // 응답 데이터 반환
  } catch (error: any) {
    // 에러 처리
    throw new Error(error.response?.data?.message || "로그인 요청 실패");
  }
}
