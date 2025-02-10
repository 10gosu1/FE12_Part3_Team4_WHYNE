import { fetchUserProfile } from "@/lib/api/user";

export default async function getUserProfile() {
  try {
    console.log("getUserProfile 함수 호출됨"); // 호출 확인용 로그

    const user = await fetchUserProfile();
    console.log("유저 정보 가져오기 성공", user);

    return user;
  } catch (error) {
    console.error("유저 정보 가져오기 실패", error);
    return null;
  }
}
