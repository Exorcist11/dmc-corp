import ForgetPasswordPage from "@/pages/register/ForgetPasswordPage";
import Homepage from "@/pages/home/Homepage";
import LoginPage from "@/pages/register/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";
import UserPage from "@/pages/account/UserPage";
import Address from "@/pages/account/Address";
import AdminPage from "@/pages/dashboard/AdminPage";
import RolePage from "@/pages/dashboard/RolePage";
import Customers from "@/pages/dashboard/Customers";
import NewProduct from "@/pages/dasboard-product/NewProduct";
import ListProduct from "@/pages/dashboard/ListProduct";
import InfoProduct from "@/pages/dasboard-product/InfoProduct";
import ProductCategory from "@/pages/product-info/ProductCategory";
import ProductDetail from "@/pages/product-info/ProductDetail";

const publicRoute = [
  { path: "/login", page: LoginPage },
  { path: "/", page: Homepage },
  { path: "/register", page: RegisterPage },
  { path: "/forget", page: ForgetPasswordPage },
  { path: "/product/:path", page: ProductCategory },
  { path: "/:path_product", page: ProductDetail },
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
  { path: "/dashboard/new-product", page: NewProduct },
  { path: "/dashboard/rings", page: ListProduct },
  { path: "/dashboard/rings/info", page: InfoProduct, layout: null },
];
export { publicRoute, accountRoute, adminRoute };
