// 🛑 수정함

import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    {children}
      <Toaster />
    </>
  );
}
