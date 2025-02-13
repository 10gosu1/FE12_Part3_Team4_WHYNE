import localFont from "next/font/local";
import "@/styles/globals.css";
import { OAuthAppProvider } from "@/context/OAuthAppProvider";
import { AuthProvider } from "@/context/AuthProvider";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <OAuthAppProvider>
          <AuthProvider>{children}</AuthProvider>
        </OAuthAppProvider>
      </body>
    </html>
  );
}
