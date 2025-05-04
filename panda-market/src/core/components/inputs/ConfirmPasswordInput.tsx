"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Control, Controller, FieldError, FieldValues, Path, UseFormWatch } from "react-hook-form";

interface ConfirmPasswordInputProps<T extends FieldValues> {
  label: string;
  error: FieldError | undefined;
  control: Control<T>;
  name: Path<T>;
  watch: UseFormWatch<T>; // 비밀번호 필드를 감시하기 위해
  passwordFieldName: Path<T>; // 원래 비밀번호 필드 이름
}

const ConfirmPasswordInput = <T extends FieldValues>({
  label,
  error,
  control,
  name,
  watch,
  passwordFieldName,
}: ConfirmPasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const password = watch(passwordFieldName); // 원래 비밀번호 값

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "비밀번호 확인을 입력해주세요.",
        validate: (value) =>
          value === password || "비밀번호가 일치하지 않습니다.",
      }}
      render={({ field }) => (
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined" error={!!error}>
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            {label}
          </InputLabel>
          <OutlinedInput
            {...field}
            id="outlined-adornment-confirm-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password Confirm"
            fullWidth
            error={!!error}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default ConfirmPasswordInput;
