"use client";

import BasicButton from "@/core/components/buttons/BasicButton";
import PasswordInput from "@/core/components/inputs/PasswordInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginData } from "../types/formDatas";
import TextInput from "@/core/components/inputs/TextInput";

const LoginBox = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<LoginData> = (data) => {
    console.log(data);
  };
  return (
    <form
      style={{
        width: "100%",
        maxWidth: "640px", // 입력 필드 너비 제한
        margin: "0 auto", // 좌우 중앙 정렬
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 내부 요소 중앙 정렬
        gap: "20px",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput<LoginData>
        name="email"
        label="이메일"
        error={errors.email}
        control={control}
        rules={{
          required: "사용할 이메일을 입력해주세요.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "올바른 이메일 형식을 입력해주세요.",
          },
        }}
      />
      <PasswordInput<LoginData>
        label="비밀번호"
        error={errors.password}
        control={control}
        name="password"
      />
      <BasicButton name="로그인" type="submit" disabled={!isValid} />
    </form>
  );
};

export default LoginBox;
