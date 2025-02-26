
import localFont from "next/font/local";
import MetaTags from "./MetaTags";
import "@/styles/globals.css";
import ClientLayout from "./ClientLayout"; // 클라이언트 컴포넌트 임포트

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
      <head>
        <MetaTags />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <title>WHYNE</title>
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout> {/* 클라이언트 컴포넌트 감싸기 */}
      </body>
    </html>
  );
}
