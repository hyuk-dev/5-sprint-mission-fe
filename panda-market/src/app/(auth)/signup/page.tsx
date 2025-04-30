import { Box } from "@mui/material";
import SignupBox from "./_components/SignupBox";
import Link from "next/link";

export default function SignupPage() {
  return (
    <Box sx={{width:"100%"}}>
      <SignupBox />
      <Box sx={{ display:"flex", justifyContent:"center", marginTop:"40px", gap:"20px", fontSize:"14px"}}>
        이미 회원이신가요?<Link href="/login" style={{color:"#3692FF"}}>로그인</Link>
      </Box>
    </Box>
  );
}
