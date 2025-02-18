"use client";
import MyList from "@/components/Card/Mylist/MyList";

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
          <h2>내가 등록한 와인</h2>
          <MyList
            wine={{
              reviewId: 819,
              userId: 916,
              name: "test",
              price: 1000,
              region: "수원",
              image:
                "	https://www.gangnam.wine/shopimages/vinit777/001002000432.png?1734080483",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
