"use client";

import { LoginData } from "@/app/(auth)/login/types/formDatas";
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
import { Control, Controller, FieldError, FieldErrors, FieldValues, Path } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> {
  label: string;
  error: FieldError | undefined;
  control: Control<T>;
  name: Path<T>;
}

const PasswordInput = <T extends FieldValues>({
  label,
  error,
  control,
  name,
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: '패스워드를 입력해주세요.',
        minLength: {
          value: 8,
          message: '비밀번호는 최소 8자 이상이어야 합니다.'
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{8,}$/,
          message:
            "비밀번호는 영문 소문자, 숫자, 특수기호를 포함해야 합니다.",
        },
      }}
      render={({ field }) => (
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined" error={!!error}>
          <InputLabel htmlFor="outlined-adornment-password" >
            {label}
          </InputLabel>
          <OutlinedInput
            {...field}
            id="outlined-adornment-password"
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
            label="Password"
            fullWidth
            error={!!error}
          />
          {
            error && (
              <FormHelperText>{error.message}</FormHelperText>
            )
          }
        </FormControl>
      )}
    >

    </Controller>
  )
}

export default PasswordInput;