"use client";

import { useEffect, useState } from "react";
import TabButtons from "./components/TabButton";
import TabContent from "./components/TabContent";
import ProfileSetting from "./components/ProfileSetting";
import { useSession } from "next-auth/react";
import { fetchMyReviews, fetchMyWines } from "@/lib/api/newUser";
import { useRouter } from "next/navigation";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState(1);
  const { data: session, status } = useSession(); // session 정보 사용
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [wineCount, setWineCount] = useState<number>(0);
  const router = useRouter();

  const handleTabClick = (tabIndex: number) => {
    console.log("버튼 클릭됨");
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    console.log("🟢 user 상태:", session);
    console.log("🟢 accessToken:", sessionStorage.getItem("accessToken"));
    console.log("🟢 refreshToken:", sessionStorage.getItem("refreshToken"));

    // 데이터 로딩이 완료되지 않았으면 기다림
    if (status === "loading") {
      console.log("🟢 로딩 중... 데이터 준비를 기다리는 중");
      return;
    }

    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    // 로그인 상태 체크: user, accessToken, refreshToken 모두 확인
    if (!session || !accessToken || !refreshToken) {
      console.log("🟢 로그인 상태 아님, signin으로 리디렉트");
      router.push("/signin");
      return;
    }

    // 로그인된 상태라면 데이터를 가져오기
    Promise.all([fetchMyReviews(100), fetchMyWines(100)]).then(
      ([reviews, wines]) => {
        setReviewCount(reviews.totalCount || 0);
        setWineCount(wines.totalCount || 0);
      }
    );
  }, [session, status, router]); // user와 isLoading이 변경될 때마다 실행

  // 로그인 상태가 아니거나 로딩 중일 때는 로딩 화면 표시
  if (status === "loading" || !session || !sessionStorage.getItem("accessToken") || !sessionStorage.getItem("refreshToken")) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="flex flex-col gap-[20px] md:gap-[30px] lg:gap-[48px] items-start lg:items-center w-full lg:w-[25%] p-[20px] md:px-[40px] md:py-[23px] lg:px-[20px] lg:py-[28px] border border-gray-300 rounded-[16px] drop-shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      <ProfileSetting
          nickname={session.user?.name || "닉네임 없음"}
          email={session.user?.email || ""}
          image={session.user?.image || "/images/common/no_profile.svg"}
        />
      </section>
      <section className="flex flex-col w-full lg:w-[70%] gap-[30px] md:gap-[40px] lg:gap-[22px]">
        <TabButtons
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          reviewCount={reviewCount}
          wineCount={wineCount}
        />
        <TabContent activeTab={activeTab} />
      </section>
    </>
  );
}
