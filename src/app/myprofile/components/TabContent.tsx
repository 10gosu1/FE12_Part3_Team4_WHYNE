"use client";

import MyReviews from "./MyReivews"; // 내가 쓴 후기 컴포넌트

interface TabContentProps {
  activeTab: number;
}

export default function TabContent({ activeTab }: TabContentProps) {
  return (
    <div className="w-full">
      {activeTab === 1 ? (
        <MyReviews /> // ✅ 내가 쓴 후기 불러오기
      ) : activeTab === 2 ? (
        <div>
          {" "}
          {/* 내가 등록한 와인은 아직 미구현 상태 */}
          <h2>내가 등록한 와인 (구현 예정)</h2>
        </div>
      ) : null}
    </div>
  );
}
