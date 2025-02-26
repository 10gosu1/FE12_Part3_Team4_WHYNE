"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signIn, SignInResponse } from "next-auth/react"; // ✅ NextAuth의 signIn 사용
import { signInSchema, SignInSchema } from "@/app/schemas/auth";
import Button from "@/components/Button/button";
import { Input, InputPassword, Label } from "@/components/Input";
import Icon from "@/components/Icon/Icon";

interface SignInResponseWithUser extends SignInResponse {
  user: {
    id: number; // id를 추가
    email: string;
    nickname: string;
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image: string | null;
    accessToken: string; 
    refreshToken: string; 
  };
}
export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setError,
    setFocus,
  } = useForm<SignInSchema>({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const [validity, setValidity] = useState({ email: false, password: false });
  const router = useRouter();

  const handleValidate = async (field: "email" | "password") => {
    const isValid = await trigger(field);
    if (isValid) {
      setValidity((prevValidity) => ({ ...prevValidity, [field]: true }));
    }
  };

  const onSubmit = async (data: SignInSchema) => {
    console.log("로그인 요청 데이터:", data); // 데이터 확인용 로그 추가

    const result = await signIn("credentials", {
      redirect: false, // ✅ 직접 리다이렉트하지 않도록 설정
      email: data.email,
      password: data.password,
    }) as SignInResponseWithUser;
    console.log("로그인 응답 결과:", result); // 응답 확인용 로그 추가

    if (result?.error) {
      console.error("로그인 실패:", result.error);
      setError("email", { type: "manual", message: "👀 이메일 혹은 비밀번호를 확인해주세요." });
    } else {
      const user = result?.user;
      if (user) {
        // user가 존재하면 세션스토리지에 토큰을 저장
        sessionStorage.setItem("accessToken", user.accessToken); 
        sessionStorage.setItem("refreshToken", user.refreshToken);
        sessionStorage.setItem("userId", user.id.toString()); // user.id를 sessionStorage에 저장
        
        console.log("토큰 저장 완료");
        console.log("세션에 저장된 ID:", sessionStorage.getItem("userId"));

        router.push("/"); // 로그인 후 홈 페이지로 리디렉션
      }
    }
  };

  const handleKakaoLogin = async () => {
    const result = await signIn("kakao", {
      redirect: false, // ✅ 카카오 로그인 후 리다이렉트하지 않도록 설정
    });
    if (result?.error) {
      console.error("카카오 로그인 실패:", result.error);
    } else {
      // 카카오 로그인 성공 후 홈으로 리다이렉트
      router.push("/");
    }
  };

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

        {validity.email && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onAnimationComplete={() => setFocus("password")}
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
          <Icon name="kakao" size={20} viewBox="0 0 24 24" />
          Kakao로 시작하기
        </Button>
      </section>
    </form>
  );
}
