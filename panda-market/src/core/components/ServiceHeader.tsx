"use client"

import { useAuth } from "../lib/store/AuthContext";

export default function ServiceHeader() {

  const { user } =  useAuth();
  console.log(user)

  return (
    <div>
      {user ? `안녕하세요 ${user.nickname}님!` : "로그인이 필요한 상태입니다."}
    </div>
  );
}
