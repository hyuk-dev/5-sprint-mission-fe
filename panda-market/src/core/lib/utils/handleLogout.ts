import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../store/AuthContext";
import { User } from "@/core/types/User";

// 쿠키 삭제 함수
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export async function handleLogout(router: ReturnType<typeof useRouter>, setUser: (user: User | null) => void) {
  const response = await logout();
  if (response.success) {
    deleteCookie("connect.sid");
    setUser(null);
    router.push("/login");
  } else {
    console.error("로그아웃 실패:", response.error);
  }
}
