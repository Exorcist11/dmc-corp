import ForgetPasswordPage from "@/pages/ForgetPasswordPage";
import Homepage from "@/pages/Homepage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

const publicRoute = [
  { path: "/login", page: LoginPage },
  { path: "/", page: Homepage },
  { path: "/register", page: RegisterPage },
  { path: "/forget", page: ForgetPasswordPage },
];

export { publicRoute };
