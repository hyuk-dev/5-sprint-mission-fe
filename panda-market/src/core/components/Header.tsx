"use client";

import { useAuth } from "../lib/store/AuthContext";
import Image from "next/image";
import { useWindowSize } from "@/core/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { handleLogout } from "../lib/utils/handleLogout";

export default function Header() {
  const { width, height } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname() || ""; // 현재 경로를 보기 위해서
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (width <= 768) setIsMobile(true);
    else setIsMobile(false);
  }, [width]);

  return (
    <div className="flex items-center border mb-6 h-[70px]">
      <div className="xl:ml-[200px] xl:mr-[200px] flex justify-between w-[100%] md:p-4 p-2">
        <div className="flex items-center">
          {!isMobile ? (
            <div
              className="relative w-[153px] h-[51px] mr-6 cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              <Image
                src="/imgs/panda_logo.png"
                alt="로고 이미지"
                fill
                priority
              />
            </div>
          ) : (
            <div
              className="relative w-[81px] h-[40px] mr-6 cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              <Image
                src="/imgs/mobile_logo.png"
                fill
                alt="모바일 로고 이미지"
              />
            </div>
          )}
          <div className="flex gap-4">
            <div
              className={`h-[69px] flex items-center px-2 cursor-pointer ${
                pathname === "/articles" || pathname.startsWith("/articles/")
                  ? "text-[#3692FF] font-bold"
                  : "text-[#4B5563] font-bold"
              }`}
              onClick={() => {
                router.push("/articles");
              }}
            >
              자유게시판
            </div>
            <div
              className={`h-[69px] flex items-center px-2 cursor-pointer ${
                pathname === "/products" || pathname.startsWith("/products/")
                  ? "text-[#3692FF] font-bold"
                  : "text-[#4B5563] font-bold"
              }`}
              onClick={() => {
                router.push("/products");
              }}
            >
              중고마켓
            </div>
          </div>
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <Image
              src="/imgs/ic_profile.png"
              alt="프로필 이미지"
              width={40}
              height={40}
            />
            <div className="hidden xl:block mr-4">{user.nickname}</div>
            <Button
              variant="contained"
              sx={{ width: "100px", height: "48px", borderRadius: "8px" }}
              type="button"
              onClick={() => handleLogout(router, setUser)}
            >
              로그아웃
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <Button
              variant="contained"
              sx={{ width: "128px", height: "48px", borderRadius: "8px" }}
              type="button"
              onClick={() => router.push("/login")}
            >
              로그인
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
