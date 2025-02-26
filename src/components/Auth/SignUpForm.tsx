"use client"

import { useAuth } from "@/context/AuthProvider"; // ✅ 사용자 인증 상태
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signUpSchema, SignUpSchema } from "@/app/schemas/auth";
import Button from "@/components/Button/button";
import { Input, InputPassword, Label } from "@/components/Input";
import Link from "next/link";
import Image from "next/image";
import { signUp } from "@/lib/api/newAuth"; // ✅ 회원가입 API
import { AxiosError } from "axios";

export default function SignUpForm() {
  const { user, setUser } = useAuth(); // ✅ useAuth에서 setUser를 가져옴
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/"); // ✅ 로그인 상태면 홈으로 이동
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setError,
    setFocus,
  } = useForm<SignUpSchema>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const [validity, setValidity] = useState({
    email: false,
    nickname: false,
    password: false,
  });

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

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await signUp(
        data.email,
        data.nickname,
        data.password,
        data.passwordConfirmation
      );
      console.log("✅ 회원가입 성공:", response);
  
      // 회원가입 후 사용자 정보 업데이트
      if (response?.user) {
        setUser({
          id: String(response.user.id),          
          email: response.user.email, // API 응답에서 유저 정보 추출
          nickname: response.user.nickname,
          image: response.user.image || null,
        });
      }
  
      // 홈으로 이동 후 새로고침하여 GNB 상태 갱신
      router.push("/");
      setTimeout(() => {
        router.refresh(); // 새로고침
      }, 100); // 잠시 대기 후 새로고침을 시도해보세요.
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("❌ 회원가입 실패:", error.message);
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error;
        console.log("⛔ 에러 메시지:", errorMessage);
  
        if (errorMessage?.includes("이메일")) {
          setError("email", {
            type: "manual",
            message: "😬 이미 사용 중인 이메일입니다.",
          });
        }
  
        if (errorMessage && errorMessage.includes("Internal")) {
          setError("nickname", {
            type: "manual",
            message: "😬 이미 사용 중인 닉네임입니다.",
          });
        }
      } else {
        console.error("❌ 알 수 없는 에러 발생:", error);
      }
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

        {/* 이메일이 유효하면 닉네임 필드 표시 */}
        {validity.email && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onAnimationComplete={() => {
              if (validity.email) setFocus("nickname");
            }}
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

        {/* 닉네임이 유효하면 비밀번호 입력 */}
        {validity.nickname && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onAnimationComplete={() => {
              if (validity.nickname) setFocus("password");
            }}
          >
            <Label htmlFor="password">비밀번호</Label>
            <InputPassword
              id="password"
              placeholder="숫자, 영문, 특수문자(!@#$%^&*)만 가능"
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

        {/* 비밀번호가 유효하면 비밀번호 확인 입력 */}
        {validity.password && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onAnimationComplete={() => {
              if (validity.password) setFocus("passwordConfirmation");
            }}
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
