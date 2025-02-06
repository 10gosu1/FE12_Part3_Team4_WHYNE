"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };
  return (
    <Link href="/" onClick={handleRefresh} className="cursor-pointer">
      <Image width={52} height={15} src="/images/common/logo.svg" alt="로고" />
    </Link>
  );
}
