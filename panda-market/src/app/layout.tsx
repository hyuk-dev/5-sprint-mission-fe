import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import ThemeRegistry from "@/core/components/ThemeRegistry";
import { AuthProvider } from "@/core/lib/store/AuthContext";
import { getUser } from "./actions/user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "판다마켓",
  description: "이동혁의 판다마켓 프로젝트입니다.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await getUser();
  console.log(result)
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>
          <AuthProvider initialUser={result.user}>{children}</AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
