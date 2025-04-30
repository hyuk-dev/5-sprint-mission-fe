import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          width: { xs: "90%", sm: "95%", md: "640px" },
          gap: "40px",
          boxSizing: "border-box",
        }}
      >
        <Link href="/">
          <Image
            src="/images/login_logo.svg"
            alt="판다마켓 로그인 페이지 로고"
            width={396}
            height={132}
          />
        </Link>
        {children}
      </Box>
    </div>
  );
}
