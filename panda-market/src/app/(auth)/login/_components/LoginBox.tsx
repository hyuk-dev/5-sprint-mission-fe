"use client";

import BasicButton from "@/core/components/buttons/BasicButton";
import PasswordInput from "@/core/components/inputs/PasswordInput";
import { useForm } from "react-hook-form";
import { LoginData } from "../_types/formDatas";
import TextInput from "@/core/components/inputs/TextInput";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useAuth } from "@/core/lib/store/AuthContext";

const LoginBox = () => {
  const {
    control,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    error: null,
    user: null,
  });

  const router = useRouter();

  console.log("Form state:", state);
  const { setUser } = useAuth();

  useEffect(() => {
    if (state.success) {
      console.log("Login successful, redirecting to /");
      setUser({
        nickname: state.user.nickname,
        profileImg: state.user.profileImg,
      });
      router.push("/");
    }
    else if(state.error) {
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.")
    }
  }, [state, router]);

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
      <BasicButton name="로그인" type="submit" disabled={!isValid} isPending={isPending} />
    </form>
  );
};

export default LoginBox;
