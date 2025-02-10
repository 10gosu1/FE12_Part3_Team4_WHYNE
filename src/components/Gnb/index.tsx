import Logo from "./Logo";
import GnbUser from "./GnbUser";

export default function Gnb() {
  return (
    <header className="flex justify-between items-center rounded-2xl h-[50px] md:h-[70px] py-[15px] md:py-[11px] px-[20px] md:px-[60px] bg-black text-white">
      <Logo />
      <div className="flex justify-between gap-[20px] md:gap-[40px] text-md-14px-medium md:text-lg-16px-medium">
        <GnbUser />
      </div>
    </header>
  );
}
