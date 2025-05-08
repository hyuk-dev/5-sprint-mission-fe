"use client";

import { useEffect, useState } from "react";
import TagElement from "@/core/components/Tag";
import { useNameCheck } from "@/core/hooks/useNameCheck";
import { useDescriptionCheck } from "@/core/hooks/useDescriptionCheck";
import { usePriceCheck } from "@/core/hooks/usePriceCheck";
import { useTagCheck } from "@/core/hooks/useTagCheck";
import Input from "@/core/components/Input";
import InputArea from "@/core/components/InputArea";
import ImgUpload from "@/core/components/ImgUpload";
import { useAuth } from "@/core/lib/store/AuthContext";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/actions/products";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UploadItemPage() {
  const { user } = useAuth();
  const { name, nameCheck, handleNameInputChange } = useNameCheck();
  const { description, descriptionCheck, handleDescriptionInputChange } =
    useDescriptionCheck();
  const { price, priceCheck, handlePriceInputChange } = usePriceCheck();
  const { tag, setTag, tagCheck, handleTagInputKeyDown, handleTagChange } =
    useTagCheck();
  const [verified, setVerified] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (
      nameCheck === "checked" &&
      descriptionCheck === "checked" &&
      priceCheck === "checked"
    ) {
      setVerified(true);
    }
  }, [nameCheck, descriptionCheck, priceCheck, tagCheck]);

  if (!user) return <div>로그인부터 진행해주세요.</div>;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        alert("상품 등록이 완료되었습니다.");
        router.push("/products");
      } else {
        alert(data.message);
      }
    },
    onError: (error) => {
      alert("서버 오류 발생");
      console.error("상품 등록 시 오류 발생", error);
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verified) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }
    mutation.mutate({
      name,
      description,
      images,
      tags: tag,
      price,
    });
  };

  return (
    <form
      className="w-[100%] flex flex-col gap-[24px]"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <div className="flex justify-between">
        <h3 className="text-[20px] font-bold">상품 등록하기</h3>
        {/* <Button name="등록" disabled={!verified} /> */}
        <Button variant="contained" type="submit" disabled={!verified}>
          등록
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-[18px] font-bold">상품 이미지</h4>
        <ImgUpload images={images} setImages={setImages} />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-[18px] font-bold">상품명</h4>
        <Input
          placeholder="상품명을 입력해주세요"
          errorMessage="1자 이상, 10자 이내로 입력해주세요"
          onChange={handleNameInputChange}
          isError={nameCheck === "notChecked"}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-[18px] font-bold">상품 소개</h4>
        <InputArea
          placeholder="상품 소개를 입력해주세요"
          errorMessage="10자 이상, 100자 이내로 입력해주세요."
          onChange={handleDescriptionInputChange}
          isError={descriptionCheck === "notChecked"}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-[18px] font-bold">판매가격</h4>
        <Input
          placeholder="판매 가격을 입력해주세요"
          errorMessage="숫자로 입력해주세요"
          onChange={handlePriceInputChange}
          isError={priceCheck === "notChecked"}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-[18px] font-bold">태그</h4>
        <Input
          placeholder="태그를 입력해주세요"
          errorMessage="5글자 이내로 입력해주세요"
          onChange={handleTagChange}
          onKeyDown={handleTagInputKeyDown}
          isError={tagCheck === "notChecked"}
        />
      </div>
      <div className="flex gap-2">
        {tag &&
          tag.map((tagElement: string, index: number) => {
            return (
              <TagElement key={index} setTag={setTag} tag={tag}>
                {tagElement}
              </TagElement>
            );
          })}
      </div>
    </form>
  );
}
