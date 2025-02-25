"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react"; // useSession을 사용
import Link from "next/link";
import Image from "next/image";
import Dropdown from "../Dropdown";
import Skeleton from "./Skeleton";

export default function GnbUser() {
  const { data: session, status } = useSession(); // useSession 사용
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // 상태와 세션 데이터 출력 (디버깅 용도)
  console.log("Session status:", status);
  console.log("Session data:", session);

  // 세션 상태가 "loading"이면 로딩 스켈레톤 UI를 표시
  if (status === "loading") {
    return (
      <div className="flex gap-[20px] md:gap-[40px] relative">
        <Skeleton
          width="w-[45px]"
          height="h-[45px]"
          className="border border-gray-300 rounded-full overflow-hidden"
        />
      </div>
    );
  }

  // 로그아웃 처리
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex gap-[20px] md:gap-[40px] relative">
      {!session ? (
        // 로그인하지 않은 상태일 경우 로그인, 회원가입 링크 표시
        <>
          <Link href="/signin" className="hover:text-purple-100 transition">
            로그인
          </Link>
          <Link href="/signup" className="hover:text-purple-100 transition">
            회원가입
          </Link>
        </>
      ) : (
        // 로그인한 상태일 경우 사용자 프로필 및 로그아웃 버튼 표시
        <div className="flex relative">
          <Dropdown
            trigger={
              <button className="relative">
                <div className="w-[35px] h-[35px] md:h-[45px] md:w-[45px] border border-gray-300 rounded-full overflow-hidden">
                  <Image
                    style={{ objectFit: "cover" }}
                    fill
                    src={session.user?.image || "/images/common/no_profile.svg"}
                    className="!relative"
                    alt="프로필 이미지"
                  />
                </div>
              </button>
            }
            items={[
              { label: "마이페이지", href: "/myprofile" },
              { label: "로그아웃", href: "#", onClick: handleLogout },
            ]}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen((prev) => !prev)}
            onClose={() => setIsDropdownOpen(false)}
            dropdownPosition="right-0"
            isLinkDropdown={true}
            width="w-[100px] md:w-[126px]"
            dropdownStyle="mt-[6px]"
          />
        </div>
      )}
    </div>
  );
}
