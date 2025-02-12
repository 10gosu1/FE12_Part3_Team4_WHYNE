import { z } from "zod";

// 회원가입 스키마
export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "☝🏻 이메일은 필수 입력입니다.")
      .email("😢 이메일 형식으로 작성해 주세요."),
    nickname: z
      .string()
      .min(1, "☝🏻 닉네임은 필수 입력입니다.")
      .max(20, "😢 닉네임은 최대 20자까지 가능합니다."),
    password: z
      .string()
      .min(1, "☝🏻 비밀번호는 필수 입력입니다.")
      .min(8, "😢 비밀번호는 최소 8자 이상입니다.")
      .regex(
        /^[A-Za-z0-9!@#$%^&*]+$/,
        "✋🏻 비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)로만 가능합니다."
      ),
    passwordConfirmation: z.string().min(1, "☝🏻 비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "😢 비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

// 로그인 스키마
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "☝🏻 이메일은 필수 입력입니다.")
    .email("😢 이메일 형식으로 작성해 주세요."),
  password: z.string().min(1, "☝🏻 비밀번호는 필수 입력입니다."),
});

export type SignInSchema = z.infer<typeof signInSchema>;
