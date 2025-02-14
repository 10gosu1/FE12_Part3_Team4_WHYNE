import Gnb from "@/components/Gnb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col py-[20px] vlg:py-[40px] md:py-[30px] px-[16px] md:px-[20px]  ">
      <div className="max-w-[1140px] w-full mx-auto">
        <Gnb />
      </div>
      <section>{children}</section>
    </div>
  );
}
