"use client";
// import MyList from "@/components/Card/Mylist/MyList";

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
          {/* <MyList
            wine={{
              name: "test",
              price: 1000,
              region: "수원",
              image:
                "	https://www.gangnam.wine/shopimages/vinit777/001002000432.png?1734080483",
            }}
          /> */}
        </div>
      ) : null}
    </div>
  );
}
