import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, nickname, password, passwordConfirmation } = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ success: false, error: errorData.message || "회원가입 실패" }, { status: 400 });
    }

    const result = await response.json();
    console.log("✅ 회원가입 성공:", result);

    // 🟢 NextResponse를 사용하여 쿠키 설정
    const res = NextResponse.json({ success: true, user: result.user });

    res.cookies.set("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.cookies.set("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("❌ 회원가입 API 오류:", error);
    return NextResponse.json({ success: false, error: "서버 오류 발생" }, { status: 500 });
  }
}
