"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "../Dropdown";
import Skeleton from "./Skeleton";

export default function GnbUser() {
  const { user, isLoading, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flex gap-[20px] md:gap-[40px] relative">
        {/* 스켈레톤 로딩 */}
        <Skeleton
          width="w-[45px]"
          height="h-[45px]"
          className="border border-gray-300 rounded-full overflow-hidden"
        />
      </div>
    );
  }

  return (
    <div className="flex gap-[20px] md:gap-[40px] relative">
      {!user ? (
        <>
          <Link href="/signin" className="hover:text-purple-100 transition">
            로그인
          </Link>
          <Link href="/signup" className="hover:text-purple-100 transition">
            회원가입
          </Link>
        </>
      ) : (
        <div className="flex relative">
          <Dropdown
            trigger={
              <button className="relative">
                <div className="h-[45px] w-[45px] border border-gray-300 rounded-full overflow-hidden">
                  <Image
                    style={{ objectFit: "cover" }}
                    fill
                    src={user.image || "/images/common/no_profile.svg"}
                    className="!relative"
                    alt="프로필 이미지"
                  />
                </div>
              </button>
            }
            items={[
              { label: "마이페이지", href: "/myprofile" },
              { label: "로그아웃", href: "/", onClick: logout },
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
