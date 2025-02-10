import Link from "next/link";
import SignUpForm from "@/components/Auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <SignUpForm />
      <p className="text-md-14px-regular md:text-lg-16px-regular text-gray-500">
        계정이 이미 있으신가요?
        <Link
          href="/signin"
          className="ml-[8px] md:ml-[14px] text-purple-100 underline"
        >
          로그인하기
        </Link>
      </p>
    </>
  );
}
