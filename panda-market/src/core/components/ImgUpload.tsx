
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

interface ImgUploadProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}

export default function ImgUpload({ images, setImages }: ImgUploadProps) {

  console.log("images : " , images)

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("image", file);
  //   try {
  //     const response = await api.post("/images/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }); // ✅ FormData 전송;

  //     const result = response.data;
  //     console.log("서버 응답:", result);
  //     setImages((prev) => [...prev, result.path]);
  //     e.target.value = "";
  //   } catch (error) {
  //     console.error("업로드 오류:", error);
  //     e.target.value = "";
  //   }
  // };

  return (
    <div className="grid grid-cols-4 gap-4 items-center h-[282px]">
      <label
        className="h-[100%] bg-[#F3F4F6] rounded-xl cursor-pointer flex flex-col justify-center items-center"
        htmlFor="fileInput"
      >
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          //   handleImageUpload(e)
          // }
          className="hidden"
        />
        <div className="relative w-[48px] h-[48px]">
          <Image
            src="/imgs/ic_plus.png"
            alt="이미지 등록"
            fill
            objectFit="cover"
          />
        </div>
        <div className="text-[#9CA3AF]">이미지 등록</div>
      </label>
      {images?.map((image) => {
        return <div className="relative w-[282px] h-[282px] rounded-xl">
          <Image src={`${process.env.NEXT_PUBLIC_API_URL}${image}`} fill alt="업로드 할 이미지" objectFit="cover" className="rounded-xl" />
          <Image src="/imgs/ic_X.png" alt="취소" width={22} height={24} className="absolute right-2 top-2 cursor-pointer"         onClick={(e) => {
          setImages((prev) => prev.filter((element) => `${element}` !== image)); // 경로를 비교
        }}/>
        </div>;
      })}
    </div>
  );
}
