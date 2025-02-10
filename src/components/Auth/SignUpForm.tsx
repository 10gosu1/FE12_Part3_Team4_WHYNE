"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signUpSchema, SignUpSchema } from "@/app/schemas/auth";
import Button from "@/components/Button/button";
import { Input, InputPassword, Label } from "@/components/Input";
import Link from "next/link";
import Image from "next/image";

import { signUp } from "./SignUpApi"; // 회원가입 api 테스트
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<SignUpSchema>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const [validity, setValidity] = useState({
    email: false,
    nickname: false,
    password: false,
  });

  const router = useRouter();

  type Field = "email" | "nickname" | "password";

  const handleValidate = async (field: Field) => {
    const isValid = await trigger(field);
    if (isValid) {
      setValidity((prevValidity) => ({
        ...prevValidity,
        [field]: true,
      }));
    }
  };

  // api 파일 수정하기
  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await signUp(data);
      console.log("회원가입 성공:", response);
      router.push("/");
    } catch (error: any) {
      console.error("회원가입 실패:", error.message);
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

        {/* 이메일이 유효하면 닉네임 필드 표시 (애니메이션 추가) */}
        {validity.email && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              placeholder="wine"
              {...register("nickname")}
              onBlur={() => handleValidate("nickname")}
              onKeyDown={(e) => e.key === "Enter" && handleValidate("nickname")}
            />
            {errors.nickname && (
              <p className="p-[10px] text-md-14px-regular md:text-lg-16px-regular text-purple-100">
                {errors.nickname.message}
              </p>
            )}
          </motion.div>
        )}

        {/* 닉네임이 유효하면 비밀번호 입력 (애니메이션 추가) */}
        {validity.nickname && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Label htmlFor="password">비밀번호</Label>
            <InputPassword
              id="password"
              placeholder="영문, 숫자, 특수문자 포함"
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

        {/* 비밀번호 유효하면 비밀번호 입력 (애니메이션 추가) */}
        {validity.password && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Label htmlFor="passwordConfirmation">비밀번호 확인</Label>
            <InputPassword
              id="passwordConfirmation"
              placeholder="비밀번호 확인"
              {...register("passwordConfirmation")}
            />
            {errors.passwordConfirmation && (
              <p className="p-[10px] text-md-14px-regular md:text-lg-16px-regular text-purple-100">
                {errors.passwordConfirmation.message}
              </p>
            )}
          </motion.div>
        )}
      </article>

      <Button
        variant="button"
        className="w-full h-[48px] md:h-[50px]"
        disabled={!isValid}
        onClick={handleSubmit(onSubmit)}
      >
        가입하기
      </Button>
    </form>
  );
}
