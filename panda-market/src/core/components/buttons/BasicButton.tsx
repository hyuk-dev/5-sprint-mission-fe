import { Button } from "@mui/material";

interface BasicButtonProps {
  name: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isPending?: boolean;
}
const BasicButton = ({
  name,
  type,
  disabled,
  isPending = false,
}: BasicButtonProps) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        fontSize: "20px",
        fontWeight: "600",
        height: "56px",
        borderRadius: "40px",
      }}
      type={type}
      disabled={disabled}
      loading={isPending}
    >
      {name}
    </Button>
  );
};

export default BasicButton;
