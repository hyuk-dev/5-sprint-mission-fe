import { ProductPreview } from "@/core/types/Product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
interface ProductProps {
  product: ProductPreview;
}

export default function ProductCard({ product }: ProductProps) {
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    setIsError(false);
  }, [product]);

  return (
    <Link href={`/products/${product.id}`}>
      <div className="flex flex-col gap-4">
      <div className="relative w-[100%] aspect-square">
        <Image
          src={
            !product.images[0] || isError
              ? "/imgs/img_default.png"
              : `${process.env.NEXT_PUBLIC_API_URL}${product.images[0]}`
          }
          alt={product.name}
          fill
          objectFit="cover"
          onError={() => setIsError(true)}
          onLoadingComplete={() => setIsError(false)}
          className="rounded-[13px]"
        />
      </div>
      <div className="text-[14px]">{product.name}</div>
      <div className="text-[16px] font-bold">{product.price.toLocaleString('ko-KR')}원</div>
      <div className="flex gap-1 items-center">
        <div className="relative w-[13.4px] h-[11.65px]"><Image src="/imgs/ic_heart.png" alt="좋아요 개수" fill  objectFit="cover"/></div>
        <div className="text-[12px]">{product.favoriteCount}</div>
      </div>
    </div>
    </Link>
  );
}
