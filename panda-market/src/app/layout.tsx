import type { Metadata } from "next";
import "@/styles/globals.css";
import ThemeRegistry from "@/core/components/ThemeRegistry";
import { AuthProvider } from "@/core/lib/store/AuthContext";
import { getUser } from "./actions/user";
import Providers from "./providers";

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
  console.log(result);
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthProvider initialUser={result.user}>
            <Providers>{children}</Providers>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
