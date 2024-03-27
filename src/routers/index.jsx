import ForgetPasswordPage from "@/pages/ForgetPasswordPage";
import Homepage from "@/pages/Homepage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import UserPage from "@/pages/userPages/UserPage";
import Address from "@/pages/userPages/Address";

const publicRoute = [
  { path: "/login", page: LoginPage },
  { path: "/", page: Homepage },
  { path: "/register", page: RegisterPage },
  { path: "/forget", page: ForgetPasswordPage },
  // { path: "/account", page: UserPage },
];
const accountRoute = [
  { path: "/account", page: UserPage },
  { path: "/account/address", page: Address },
];
export { publicRoute, accountRoute };
