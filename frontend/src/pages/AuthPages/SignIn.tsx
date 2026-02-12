import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In | Django + React Admin Dashboard"
        description="Django + ReactJS full-stack admin dashboard template"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
