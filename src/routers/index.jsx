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
import CustomerOrder from "@/pages/order/CustomerOrder";
import OrderDetail from "@/pages/order/OrderDetail";
import OrderManager from "@/pages/dashboard/OrderManager";
import OrderView from "@/pages/dashboard/OrderView";
import FavoriteProduct from "@/pages/account/FavoriteProduct";
import ProductHistory from "@/pages/account/ProductHistory";
import OrderProduct from "@/pages/order/OrderProduct";
import SearchResult from "@/pages/home/SearchResult";
import AboutUs from "@/pages/home/AboutUs";
import NewPost from "@/pages/dashboard/NewPost";
import Blog from "@/pages/home/Blog";
import OrderSuccess from "@/pages/order/OrderSuccess";
import ReviewProduct from "@/pages/product-info/ReviewProduct";
import AccountManager from "@/pages/dashboard/AccountManager";
import Payment from "@/components/VNPAY/Payment";
import PaymentReturn from "@/pages/order/PaymentReturn";

const publicRoute = [
  { path: "/login", page: LoginPage },
  { path: "/", page: Homepage },
  { path: "/register", page: RegisterPage },
  { path: "/forget", page: ForgetPasswordPage },
  { path: "/product/:path", page: ProductCategory },
  { path: "/:path_product", page: ProductDetail },
  { path: "/order/product", page: OrderProduct },
  { path: "/search", page: SearchResult },
  { path: "/about-us", page: AboutUs },
  { path: "/blog", page: Blog },
  { path: "/order-success", page: OrderSuccess },
  { path: "/payment", page: Payment },
  { path: "/payment_return", page: PaymentReturn },
];

const accountRoute = [
  { path: "/account", page: UserPage },
  { path: "/account/address", page: Address },
  { path: "/account/favorite", page: FavoriteProduct },
  { path: "/order", page: CustomerOrder },
  { path: "/order/:order_id", page: OrderDetail },
  { path: "/account/history", page: ProductHistory },
  { path: "/order-review", page: ReviewProduct },
];

const adminRoute = [
  { path: "/dashboard", page: AdminPage },
  { path: "/role", page: RolePage },
  { path: "/customers/:role", page: Customers },
  { path: "/dashboard/new-product", page: NewProduct },
  { path: "/dashboard/:path", page: ListProduct },
  { path: "/dashboard/:path/:product_id", page: InfoProduct, layout: null },
  { path: "/dashboard/order", page: OrderManager },
  { path: "/dashboard/pending-order", page: OrderManager },
  { path: "/dashboard/order/:order_id", page: OrderView },
  { path: "/dashboard/news", page: NewPost },
  { path: "/accounts", page: AccountManager },
];
export { publicRoute, accountRoute, adminRoute };
