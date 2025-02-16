import { AuthProvider } from "@/context/AuthProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
