import { getProduct } from "@/app/actions/products";
import { ImageWithDefault } from "@/core/components/ImageWithDefault";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = params;
  const result = await getProduct(id);

  return (
    <div className="flex flex-col w-[100%] gap-[40px]">
      <div className="flex gap-6">
        <ImageWithDefault url={result.data?.images[0] ?? null} />
        <div className="flex flex-col gap-[62px] w-full">
          <div className="flex flex-col gap-[16px]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <div className="text-[24px] font-semibold">
                  {result.data?.name}
                </div>
                <div className="text-[40px] font-semibold">
                  {result.data?.price.toLocaleString("ko-KR")}원
                </div>
              </div>
              <div>
                {/* <MoreMenu
                  onUpdate={() => {
                    router.push(`/items/edit/${product.id}`);
                  }}
                  onDelete={() => {
                    setIsMenuBar(false);
                    setIsModal(true);
                  }}
                  isMenuBar={isMenuBar}
                  setIsMenuBar={setIsMenuBar}
                /> */}
              </div>
            </div>
            <hr />
            <div>
              <div className="mt-2 mb-5 font-semibold text-[#4B5563]">
                상품 소개
              </div>
              <div className="text-[#4B5563]">{result.data?.description}</div>
            </div>
            <div>
              <div className="mt-2 mb-5 font-semibold text-[#4B5563]">
                상품 태그
              </div>
              <div className="flex gap-3">
                {/* {result.data?.tags.map((tag, index) => {
                  return <TagView key={index}>{tag}</TagView>;
                })} */}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/imgs/ic_profile.png"
                  alt="게시자 프로필 이미지"
                  fill
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>{result.data?.owner.nickname}</div>
                <div className="text-[#9CA3AF]">
                  {new Date(
                    result.data?.createdAt as string
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <hr />
        </div>
      </div>
    </div>
  );
}
