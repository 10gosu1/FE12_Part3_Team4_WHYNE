"use client";
import MyReviews from "./MyReivews"; // 내가 쓴 후기 컴포넌트
import MyWines from "./MyWines"; // 내가 등록한 와인 목록을 가져오는 컴포넌트

interface TabContentProps {
  activeTab: number;
}

export default function TabContent({ activeTab }: TabContentProps) {
  return (
    <div className="w-full">
      {activeTab === 1 ? (
        <MyReviews /> // ✅ 내가 쓴 후기 불러오기
      ) : activeTab === 2 ? (
        <MyWines /> // ✅ MyWines.tsx를 호출하여 등록한 와인 목록을 불러오기
      ) : null}
    </div>
  );
}
