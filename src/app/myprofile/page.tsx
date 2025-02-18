"use client";

import { useEffect, useState } from "react";
import TabButtons from "./components/TabButton";
import TabContent from "./components/TabContent";
import ProfileSetting from "./components/ProfileSetting";
import { useAuth } from "@/context/AuthProvider";
import { fetchMyReviews, fetchMyWines } from "@/lib/api/user";
import { useRouter } from "next/navigation";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState(1);
  const { user, setUser, isLoading } = useAuth();
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [wineCount, setWineCount] = useState<number>(0);
  const router = useRouter();

  const handleTabClick = (tabIndex: number) => {
    console.log("버튼 클릭됨");
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    if (!user && !isLoading) {
      // 로딩 상태가 아닐 때만 리디렉션
      router.push("/signin");
    } else if (user) {
      // 유저가 로그인 되어있으면 리뷰와 와인 목록 가져오기
      Promise.all([fetchMyReviews(100), fetchMyWines(100)]).then(
        ([reviews, wines]) => {
          setReviewCount(reviews.length || 0);
          setWineCount(wines.length || 0);
        }
      );
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // 비로그인 상태 처리
  }

  return (
    <>
      <section className="flex flex-col gap-[20px] md:gap-[30px] lg:gap-[48px] items-start lg:items-center w-full lg:w-[25%] p-[20px] md:px-[40px] md:py-[23px] lg:px-[20px] lg:py-[28px] border border-gray-300 rounded-[16px] drop-shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
        <ProfileSetting
          nickname={user.nickname}
          email={user.email}
          image={user.image || "/images/common/no_profile.svg"}
          setUser={setUser}
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
