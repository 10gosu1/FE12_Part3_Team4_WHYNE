"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signInSchema, SignInSchema } from "@/app/schemas/auth"; // 로그인에 맞는 스키마
import { useRouter } from "next/navigation"; // useRouter 사용
import Button from "@/components/Button/button";
import { Input, InputPassword, Label } from "@/components/Input";
import Link from "next/link";
import Image from "next/image";
import Icon from "../Icon/Icon";

import { signIn } from "@/lib/api/auth";
import { signInWithKakao } from "@/lib/api/kakaoAuth";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setError,
  } = useForm<SignInSchema>({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const [validity, setValidity] = useState({
    email: false,
    password: false,
  });

  const router = useRouter(); // useRouter 훅

  const handleValidate = async (field: "email" | "password") => {
    const isValid = await trigger(field);
    if (isValid) {
      setValidity((prevValidity) => ({
        ...prevValidity,
        [field]: true,
      }));
    }
  };

  const onSubmit = async (data: SignInSchema) => {
    try {
      const response = await signIn(data.email, data.password);
      console.log("로그인 성공:", response);

      // 로그인 성공 후 홈으로 리디렉션
      router.push("/"); // 홈 화면으로 이동
    } catch (error: any) {
      console.error("로그인 실패:", error.message);
      setError("email", {
        type: "manual",
        message: "👀 이메일 혹은 비밀번호를 확인해주세요.",
      });
    }
  };

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  // 카카오 인증 후 redirect URI에서 code 파라미터를 받아오는 useEffect
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      const getKakaoToken = async () => {
        try {
          const response = await signInWithKakao(code); // 백엔드에서 카카오 토큰 받아오기
          console.log("카카오 로그인 성공:", response);

          // 로그인 성공 후 홈으로 리디렉션
          router.push("/"); // 홈 화면으로 이동
        } catch (error) {
          console.error("카카오 로그인 실패:", error);
          // 실패 시 처리
        }
      };

      getKakaoToken();
    }
  }, [window.location.search]); // URL에 변경이 있을 때마다 실행

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-full gap-[40px] md:gap-[56px]"
    >
      <h1>
        <Link href="/">
          <Image
            width={104}
            height={30}
            src="/images/common/logo.svg"
            alt="로고 홈으로 이동"
            className="invert"
          />
        </Link>
      </h1>

      {/* 이메일 입력 필드 */}
      <article className="flex flex-col gap-[16px] md:gap-[25px] w-full mt-[16px] md:mt-[8px]">
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            placeholder="wine@email.com"
            {...register("email")}
            onBlur={() => handleValidate("email")}
            onKeyDown={(e) => e.key === "Enter" && handleValidate("email")}
          />
          {errors.email && (
            <p className="p-[10px] text-md-14px-regular md:text-lg-16px-regular text-purple-100">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        {validity.email && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Label htmlFor="password">비밀번호</Label>
            <InputPassword
              id="password"
              placeholder="비밀번호를 입력하세요"
              {...register("password")}
              onBlur={() => handleValidate("password")}
              onKeyDown={(e) => e.key === "Enter" && handleValidate("password")}
            />
            {errors.password && (
              <p className="p-[10px] text-md-14px-regular md:text-lg-16px-regular text-purple-100">
                {errors.password.message}
              </p>
            )}
          </motion.div>
        )}
      </article>
      <section className="flex flex-col gap-[16px] w-full">
        <Button
          variant="button"
          className="w-full h-[48px] md:h-[50px]"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          로그인
        </Button>
        <Button
          variant="social"
          className="w-full h-[48px] md:h-[50px] text-lg-16px-medium hover:bg-yellow-300 hover:border-none hover:text-yellow-950"
          onClick={handleKakaoLogin}
        >
          <Icon
            name="kakao"
            size={20}
            viewBox="0 0 24 24"
            className="md:w-[24px] md:h-[24px] hover:text-yellow-950"
          />
          Kakao로 시작하기
        </Button>
      </section>
    </form>
  );
}
