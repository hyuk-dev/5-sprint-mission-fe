"use client";

import BasicButton from "@/core/components/buttons/BasicButton";
import PasswordInput from "@/core/components/inputs/PasswordInput";
import { useForm } from "react-hook-form";
import { SignupData } from "../types/formDatas";
import TextInput from "@/core/components/inputs/TextInput";
import { useActionState, useContext, useEffect } from "react";
import { signup } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import ConfirmPasswordInput from "@/core/components/inputs/ConfirmPasswordInput";
import { AuthContext, useAuth } from "@/core/lib/store/AuthContext";

const SignupBox = () => {
  const {
    control,
    watch,
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

  const [state, formAction, isPending] = useActionState(signup, {
    success: false,
    error: null,
    user: null,
  });
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    if (state.success) {
      console.log("Register successful, redirecting to /");
      setUser({
        nickname: state.user.nickname,
        profileImg: state.user.profileImg,
      })
      router.push("/");
    }
  }, [state.success, router]);
  console.log("Form state:", state);
  return (
    <form
      action={formAction}
      style={{
        width: "100%",
        maxWidth: "640px", // 입력 필드 너비 제한
        margin: "0 auto", // 좌우 중앙 정렬
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 내부 요소 중앙 정렬
        gap: "20px",
      }}
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

      <ConfirmPasswordInput
        label="비밀번호 확인"
        error={errors.passwordCheck}
        control={control}
        name="passwordCheck"
        watch={watch}
        passwordFieldName="password"
      />
      <BasicButton
        name="회원가입"
        type="submit"
        disabled={!isValid}
        isPending={isPending}
      />
    </form>
  );
};

export default SignupBox;
