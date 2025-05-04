"use server";
import { cookies } from "next/headers";

// 유저 정보 조회 서버 액션
export async function getUser() {
  try {
    const cookieStore = cookies();
    const sessionId = (await cookieStore).get("connect.sid");
    if (!sessionId)
      return { success: false, error: "세션 ID가 존재하지 않습니다." };
    // 백엔드 로그인 엔드포인트 호출
    const response = await fetch(`${process.env.BACKEND_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Cookie: `connect.sid=${sessionId.value}`
      }
    });

    if (response.ok) {
      // 백엔드의 set-cookie 헤더 파싱
      const userInfo = await response.json();
      return { success: true, error: null, user: userInfo.data };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "유저 정보 조회 실패",
      };
    }
  } catch (error) {
    return { success: false, error: "서버 오류" };
  }
}
