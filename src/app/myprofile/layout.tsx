import Gnb from "@/components/Gnb";

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-[20px] md:gap-[17px] lg:gap-[37px] w-full lg:w-[1140px] px-[16px] md:px-[20px] lg:px-0 mx-auto my-[20px] md:my-[30px] lg:my-[40px]">
      <Gnb />
      <section className="flex flex-col lg:flex-row justify-stretch gap-[30px] md:gap-[40px] lg:gap-[5%]">
        {children}
      </section>
    </main>
  );
}
