import { CardHeader } from "@mui/material";
import Image from "next/image";

export const LoginCardHeader = () => {
  return (
    <CardHeader
      avatar={<Image src="money.svg" alt="icon" width={40} height={40} />}
      title="به خرج یار خوش آمدید"
      subheader="با ورود به خرج یار، هزینه‌های خود را به سادگی مدیریت کنید."
      sx={{
        "& .MuiCardHeader-title": {
          fontSize: {
            xs: "0.875rem",
            sm: "1rem",
            md: "1.25rem",
          },
          color: "primary.dark",
          fontWeight: "bold",
        },
        "& .MuiCardHeader-subheader": {
          marginTop: "10px",
          fontSize: {
            xs: "0.75rem",
            sm: "0.875rem",
            md: "1rem",
          },
          color: "secondary.main",
        },
      }}
    />
  );
}
export default LoginCardHeader
