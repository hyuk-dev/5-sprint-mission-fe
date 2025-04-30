import { TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  label: string;
  error: FieldError | undefined;
  control: Control<T>;
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

const TextInput = <T extends FieldValues>({
  label,
  error,
  control,
  name,
  rules = {},
}: TextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
        sx={{margin: "10px"}}
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default TextInput;