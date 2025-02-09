"use client";

import { useState } from "react";
import Button from "@/components/Button/button";
import { signUp, signIn, refreshAccessToken } from "@/lib/api/auth";
import { createWine } from "@/lib/api/wine";
import { uploadImage } from "@/lib/api/image";

export default function ApiTest() {
  // ✅ 회원가입 입력 상태
  const [signUpData, setSignUpData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  // ✅ 로그인 입력 상태
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // ✅ 와인 관련 입력 상태 (image 포함)
  const [wineData, setWineData] = useState({
    name: "",
    region: "",
    price: 0,
    type: "RED",
    image: "",
  });
  const [wineImage, setWineImage] = useState<File | null>(null);

  // ✅ API 응답 데이터
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState("");

  // ✅ 회원가입 요청
  const handleSignUp = async () => {
    try {
      await signUp(
        signUpData.email,
        signUpData.nickname,
        signUpData.password,
        signUpData.passwordConfirmation
      );
      alert("✅ 회원가입 성공!");
    } catch (err: any) {
      setError(
        `❌ 회원가입 실패: ${err.response?.data?.message || "오류 발생"}`
      );
    }
  };

  // ✅ 로그인 요청
  const handleSignIn = async () => {
    try {
      await signIn(loginData.email, loginData.password);
      alert("✅ 로그인 성공!");
    } catch (err: any) {
      setError(`❌ 로그인 실패: ${err.response?.data?.message || "오류 발생"}`);
    }
  };

  // ✅ 토큰 갱신 요청
  const handleRefreshToken = async () => {
    try {
      const newToken = await refreshAccessToken();
      alert(`✅ 토큰 갱신 성공! 새 토큰: ${newToken}`);
    } catch (err: any) {
      setError(
        `❌ 토큰 갱신 실패: ${err.response?.data?.message || "오류 발생"}`
      );
    }
  };

  // ✅ 와인 생성 요청 (이미지 포함)
  const handleCreateWine = async () => {
    try {
      let imageUrl = wineData.image;

      // ✅ 이미지 업로드 먼저 실행
      if (wineImage) {
        imageUrl = await uploadImage(wineImage);
      }

      const winePayload = { ...wineData, image: imageUrl };
      const response = await createWine(winePayload);
      setApiResponse(response);
      alert("✅ 와인 생성 성공!");
    } catch (err: any) {
      setError(
        `❌ 와인 생성 실패: ${err.response?.data?.message || "오류 발생"}`
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-xl font-bold">🔹 API 테스트 페이지</h2>

      {/* ✅ 회원가입 입력 필드 */}
      <h3 className="text-lg font-semibold mt-4">📝 회원가입</h3>
      <input
        type="text"
        placeholder="이메일 입력"
        value={signUpData.email}
        onChange={(e) =>
          setSignUpData({ ...signUpData, email: e.target.value })
        }
        className="border p-2"
      />
      <input
        type="text"
        placeholder="닉네임 입력"
        value={signUpData.nickname}
        onChange={(e) =>
          setSignUpData({ ...signUpData, nickname: e.target.value })
        }
        className="border p-2"
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={signUpData.password}
        onChange={(e) =>
          setSignUpData({ ...signUpData, password: e.target.value })
        }
        className="border p-2"
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={signUpData.passwordConfirmation}
        onChange={(e) =>
          setSignUpData({ ...signUpData, passwordConfirmation: e.target.value })
        }
        className="border p-2"
      />
      <Button onClick={handleSignUp}>회원가입</Button>

      {/* ✅ 로그인 입력 필드 */}
      <h3 className="text-lg font-semibold mt-4">🔐 로그인</h3>
      <input
        type="text"
        placeholder="이메일 입력"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        className="border p-2"
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        className="border p-2"
      />
      <Button onClick={handleSignIn}>로그인</Button>
      <Button onClick={handleRefreshToken}>토큰 갱신</Button>

      {/* ✅ 와인 API 테스트 */}
      <h3 className="text-lg font-semibold mt-4">🍷 와인 API</h3>
      <input
        type="text"
        placeholder="와인 이름"
        value={wineData.name}
        onChange={(e) => setWineData({ ...wineData, name: e.target.value })}
        className="border p-2"
      />
      <input
        type="text"
        placeholder="와인 지역"
        value={wineData.region}
        onChange={(e) => setWineData({ ...wineData, region: e.target.value })}
        className="border p-2"
      />
      <input
        type="number"
        placeholder="가격"
        value={wineData.price}
        onChange={(e) =>
          setWineData({ ...wineData, price: Number(e.target.value) })
        }
        className="border p-2"
      />
      <input
        type="text"
        placeholder="와인 타입 (RED, WHITE, SPARKLING)"
        value={wineData.type}
        onChange={(e) => setWineData({ ...wineData, type: e.target.value })}
        className="border p-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setWineImage(e.target.files ? e.target.files[0] : null)
        }
        className="border p-2"
      />
      <Button onClick={handleCreateWine}>와인 생성</Button>

      {/* ✅ API 응답 데이터 출력 */}
      {apiResponse && (
        <pre className="bg-gray-200 p-4 mt-4 rounded-md overflow-auto">
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      )}
    </div>
  );
}
