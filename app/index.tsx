//Components
import AuthBg from "@/src/components/ui/AuthBg";
import LoginInfo from "@/src/components/ui/Login/Info";
import LoginModule from "@/src/features/Auth/Login/LoginModule";

function LoginScreen() {
  return (
    <AuthBg>
      <LoginInfo />
      <LoginModule />
    </AuthBg>
  );
}

export default LoginScreen;
