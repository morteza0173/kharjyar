import AuthSideInfo from "@/components/auth/AuthSideInfo";
import RegisterCardHeader from "@/components/auth/RegisterCardHeader";
import RegisterFormProvider from "@/components/auth/RegisterFormProvider";
import { Card, CardContent } from "@mui/material";

function RegisterPage() {
  return (
    <div className="h-full mt-10 lg:mt-0 lg:h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-10 relative">
      <div className="rounded-full w-96 h-96 xl:w-[1200px] xl::h-[1200px] bg-[#7babd3] opacity-15 absolute top-auto left-auto -z-10 blur-3xl "></div>
      <Card variant="elevation">
        <RegisterCardHeader />
        <CardContent>
          <div className="flex flex-col gap-4">
            <RegisterFormProvider />
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        <AuthSideInfo />
      </div>
    </div>
  );
}
export default RegisterPage;
