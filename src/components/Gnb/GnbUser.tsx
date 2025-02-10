"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "../Dropdown";
import getUserProfile from "./GetUserProfile";

export default function GnbUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [userImage, setUserImage] = useState("/images/common/no_profile.svg");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
      getUserProfile().then((user) => {
        if (user) {
          setUserImage(user.image || "/images/common/no_profile.svg");
        } else {
          setUserImage("/images/common/no_profile.svg");
        }
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsDropdownOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex gap-[20px] md:gap-[40px] relative">
      {!isLoggedIn ? (
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
                    src={userImage}
                    className="!relative"
                    alt="프로필 이미지"
                  />
                </div>
              </button>
            }
            items={[
              { label: "마이페이지", href: "/myprofile" },
              { label: "로그아웃", href: "/", onClick: handleLogout },
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
