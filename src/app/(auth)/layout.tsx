export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center w-full px-[16px] md:px-0 h-screen bg-gray-100">
      <section className="flex flex-col items-center gap-[24px] md:gap-[32px] w-full md:w-[496px] px-[20px] md:px-[48px] py-[56px] md:py-[64px] lg:py-[80px] bg-white border border-gray-300 rounded-[16px]">
        {children}
      </section>
    </main>
  );
}
