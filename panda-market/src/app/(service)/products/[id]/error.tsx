"use client"

import { Button } from "@mui/material";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("에러 발생:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">에러 발생!</h2>
      <p>{error.message}</p>
      <Button variant="contained" onClick={() => reset()}>다시 시도하기</Button>

    </div>
  )
}