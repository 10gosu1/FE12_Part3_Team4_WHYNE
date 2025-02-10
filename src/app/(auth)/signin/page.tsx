import Link from "next/link";
import SignInForm from "@/components/Auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <SignInForm />
      <p className="text-md-14px-regular md:text-lg-16px-regular text-gray-500">
        계정이 없으신가요?
        <Link
          href="/signup"
          className="ml-[8px] md:ml-[14px] text-purple-100 underline"
        >
          회원가입하기
        </Link>
      </p>
    </>
  );
}
