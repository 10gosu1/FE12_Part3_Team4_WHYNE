import axios, { AxiosError } from "axios";

const API_URL = "https://winereview-api.vercel.app/12-4/auth/signUp";

interface SignUpData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export const signUp = async (data: SignUpData) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // 성공 시 서버 응답 데이터 반환
  } catch (error) {
    // 오류 타입을 AxiosError로 지정
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message); // axios 오류 처리
    } else {
      throw new Error("알 수 없는 오류 발생"); // axios 오류가 아닌 경우 처리
    }
  }
};
