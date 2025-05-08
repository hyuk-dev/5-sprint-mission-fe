"use server";
import { cookies } from "next/headers";

// 공통 fetch 옵션 타입
type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

// 공통 API 호출 함수
export async function fetchWithSession<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const cookieStore = cookies();
  const sessionId = (await cookieStore).get("connect.sid");

  const headers = {
    ...options.headers,
    ...(sessionId ? { Cookie: `connect.sid=${sessionId.value}` } : {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API 요청 실패");
  }

  return response.json() as Promise<T>;
}
