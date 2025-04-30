"use client";

import BasicButton from "@/core/components/buttons/BasicButton";
import PasswordInput from "@/core/components/inputs/PasswordInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupData } from "../types/formDatas";
import EmailInput from "@/core/components/inputs/TextInput";
import TextInput from "@/core/components/inputs/TextInput";

const SignupBox = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SignupData>({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordCheck: "",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<SignupData> = (data) => {
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
      <TextInput<SignupData>
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
        name="email"
      />

      <TextInput<SignupData>
        label="닉네임"
        error={errors.nickname}
        control={control}
        rules={{
          required: "사용할 닉네임을 입력해주세요.",
          minLength: {
            value: 2,
            message: "닉네임은 최소 2글자입니다.",
          },
        }}
        name="nickname"
      />

      <PasswordInput<SignupData>
        label="비밀번호"
        error={errors.password}
        control={control}
        name="password"
      />

      <PasswordInput<SignupData>
        label="비밀번호 확인"
        error={errors.passwordCheck}
        control={control}
        name="passwordCheck"
      />
      <BasicButton name="회원가입" type="submit" disabled={!isValid} />
    </form>
  );
};

export default SignupBox;
