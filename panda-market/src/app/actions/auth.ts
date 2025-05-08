"use server";

import { User } from "@/core/types/User";
import { cookies } from "next/headers";

// 로그인 서버 액션
export async function login(
  state: { success: boolean; error: any; status?: number; user?: User },
  formData: FormData
) {
  const cookieStore = cookies();
  const sessionId = (await cookieStore).get("connect.sid");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 백엔드 로그인 엔드포인트 호출
    const response = await fetch(`${process.env.BACKEND_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${sessionId?.value}`,
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (response.ok) {
      // 백엔드의 set-cookie 헤더 파싱
      const setCookieHeader = response.headers.get("set-cookie");
      if (setCookieHeader) {
        const cookieStrings = setCookieHeader.split(",");
        const cookieStore = await cookies();
        cookieStrings.forEach((cookieString) => {
          const [rawCookie] = cookieString.split(";");
          const [name, ...rest] = rawCookie.split("=");
          if (!name || rest.length === 0) return; // 잘못된 쿠키는 무시
          const value = rest.join("=");
          cookieStore.set(name.trim(), value.trim(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
          });
        });
      }
      const userInfo = await response.json();
      return { success: true, error: null, user: userInfo.data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message || "로그인 실패" };
    }
  } catch (error) {
    console.log("Login action error:", error);
    return { success: false, error: "서버 오류" };
  }
}

// 회원가입 서버 액션
export async function signup(
  state: { success: boolean; error: any; status?: number; user?: User },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nickname = formData.get("nickname") as string;
  const passwordCheck = formData.get("passwordCheck") as string;
  if (password !== passwordCheck) {
    return { success: false, error: "비밀번호를 확인해주세요." };
  }
  try {
    const url = `${process.env.BACKEND_API_URL}/auth/signup`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, nickname }),
      credentials: "include",
    });

    if (response.ok) {
      const setCookieHeader = response.headers.get("set-cookie");
      if (setCookieHeader) {
        const cookieStrings = setCookieHeader.split(",");
        const cookieStore = await cookies();
        cookieStrings.forEach((cookieString) => {
          const [rawCookie] = cookieString.split(";");
          const [name, ...rest] = rawCookie.split("=");
          if (!name || rest.length === 0) return;
          const value = rest.join("=");
          console.log("Setting cookie:", { name, value });
          cookieStore.set(name.trim(), value.trim(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
          });
        });
      } else {
        console.log("No set-cookie header received");
      }
      const userInfo = await response.json();
      return { success: true, error: null, user: userInfo.data };
    } else {
      const text = await response.text();
      console.log("Backend response text:", text.slice(0, 200));
      let errorData;
      try {
        errorData = JSON.parse(text);
        console.log("Backend error data:", errorData);
        return {
          success: false,
          error: errorData.message || "회원가입 실패",
          status: response.status,
        };
      } catch (error) {
        console.log("Failed to parse response as JSON:", error);
        return {
          success: false,
          error: `백엔드 오류: ${response.status} ${response.statusText}`,
          status: response.status,
        };
      }
    }
  } catch (error) {
    console.error("Signup action error:", error);
    return { success: false, error: "서버 오류" };
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("connect.sid");

    
    if (sessionId) {
      await fetch(`${process.env.BACKEND_API_URL}/auth/signout`, {
        method: "POST",
        headers: {
          Cookie: `sessionId=${sessionId?.value}`, // 세션 쿠키를 서버로 전송
        },
      });
      
      // 세션 쿠키 삭제
      cookieStore.delete("connect.sid");

      // 클라이언트에 응답 반환
      return { success: true };
    }
    return { error: "세션 쿠키가 존재하지 않습니다."}
  } catch (error) {
    console.error("로그아웃 실패", error);
    return { error: "로그아웃 실패" };
  }
}