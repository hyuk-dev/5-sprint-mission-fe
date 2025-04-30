import LoginBox from "@/app/(auth)/login/_components/LoginBox";
import { Box } from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <LoginBox />
      <Box sx={{ display:"flex", justifyContent:"center", marginTop:"40px", gap:"20px", fontSize:"14px"}}>
        판다마켓이 처음이신가요?<Link href="/signup" style={{color:"#3692FF"}}>회원가입</Link>
      </Box>
    </Box>
  );
}
