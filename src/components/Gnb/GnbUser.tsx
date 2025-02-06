"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import { useAuth } from "@/contexts/AuthProvider";
// import Dropdown from "@/components/Dropdown";

export default function GnbUser() {
  //   const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // 임시 user 데이터 (테스트용)
  //   const user = {
  //     image: "/images/wine/wine1.png",
  //     name: "테스트 사용자",
  //   };

  const user = null;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsDropdownOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex gap-[20px] md:gap-[40px] relative">
      {!user ? (
        <>
          <Link href="/signin" className="hover:text-primary">
            로그인
          </Link>
          <Link href="/signup" className="hover:text-primary">
            회원가입
          </Link>
        </>
      ) : (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="relative"
          >
            <div className="h-[45px] w-[45px] border border-gray-300 rounded-full overflow-hidden">
              <Image
                objectFit="cover"
                layout="fill"
                src={user?.image ?? "/images/common/no_profile.svg"}
                alt="프로필 이미지"
              />
            </div>
          </button>
          {/* {isDropdownOpen && <Dropdown onLogout={handleLogout} />} */}
        </div>
      )}
    </div>
  );
}
