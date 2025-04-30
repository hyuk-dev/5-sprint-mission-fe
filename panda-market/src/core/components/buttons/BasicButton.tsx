import { Button } from "@mui/material";

interface BasicButtonProps {
  name: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
const BasicButton = ({ name, type, disabled }: BasicButtonProps) => {
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
    >
      {name}
    </Button>
  );
};

export default BasicButton;
