"use client";

import { useState } from "react";
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

import { signIn } from "./SignInApi"; // 로그인 api 테스트

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
      const response = await signIn(data);
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
