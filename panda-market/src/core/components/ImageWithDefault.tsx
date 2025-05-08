"use client"
import Image from "next/image";
import { useState } from "react";

interface ImageWithDefaultProps {
  url: string | null;
}
export function ImageWithDefault({ url }: ImageWithDefaultProps) {
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative w-[486px] h-[486px] rounded-2xl overflow-hidden flex-shrink-0">
      <Image
        src={
          isError || !url
            ? "/imgs/img_default.png"
            : `${process.env.NEXT_PUBLIC_API_URL}${url}`
        }
        alt="상품 이미지"
        fill
        objectFit="cover"
        onError={() => setIsError(true)}
      />
    </div>
  );
}
