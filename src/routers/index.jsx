import ForgetPasswordPage from "@/pages/ForgetPasswordPage";
import Homepage from "@/pages/Homepage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import UserPage from "@/pages/userPages/UserPage";
import Address from "@/pages/userPages/Address";
import AdminPage from "@/pages/dashBoards/AdminPage";
import RolePage from "@/pages/dashBoards/RolePage";
import Customers from "@/pages/dashBoards/Customers";
import NewProduct from "@/pages/products/NewProduct";

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

const adminRoute = [
  { path: "/dashboard", page: AdminPage },
  { path: "/role", page: RolePage },
  { path: "/customers/:role", page: Customers },
  { path: '/dashboard/new_product', page: NewProduct}
];
export { publicRoute, accountRoute, adminRoute };
