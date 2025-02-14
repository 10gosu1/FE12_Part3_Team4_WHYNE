"use client";

interface TabContentProps {
  activeTab: number;
}

export default function TabContent({ activeTab }: TabContentProps) {
  return (
    <div>
      {activeTab === 1 ? (
        <div>
          <h2>내가 쓴 후기</h2>
        </div>
      ) : activeTab === 2 ? (
        <div>
          <h2>내가 등록한 와인</h2>
        </div>
      ) : null}
    </div>
  );
}
