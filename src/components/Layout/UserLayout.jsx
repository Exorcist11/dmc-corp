import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import {
  SlNote,
  SlNotebook,
  SlHeart,
  SlEye,
  SlLogout,
  SlDrawer,
} from "react-icons/sl";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

export default function UserLayout({ children }) {
  const items = [
    // { name: "Mã ưu đãi", path: "/address", icon: <SlTag /> },
    { name: "Đơn hàng của bạn", path: "/order", icon: <SlDrawer /> },
    { name: "Sổ địa chỉ", path: "/account/address", icon: <SlNotebook /> },
    { name: "Yêu thích", path: "/account/favorite", icon: <SlHeart /> },
    { name: "Sản phẩm đã mua", path: "/account/history", icon: <SlEye /> },
  ];

  const navigate = useNavigate();
  return (
    <div className="flex flex-col ">
      <Header />

      <div className="px-28 py-5 mt-[80px] bg-[#fafafa] h-full flex flex-col gap-5">
        <div>
          <h1
            className="text-sm hover:font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Quay về trang chủ
          </h1>
        </div>
        <div className="flex gap-10">
          <div className="bg-[#ffffff] w-1/3 rounded-lg border-[1px] flex flex-col gap-5 py-6">
            <div className="flex items-center flex-col gap-3">
              <div className="bg-[url('https://gcs.tripi.vn/public-tripi/tripi-feed/img/473236jVA/culture_devilmaycry5_review.jpg')] bg-center bg-cover w-16 h-16 rounded-full flex items-center justify-center"></div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => navigate("/account")}
              >
                <h1 className="font-semibold">Devil May Cry</h1>
                <SlNote />
              </div>
            </div>

            <div className="px-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-full h-20 rounded-md"></div>
            </div>

            <div className="">
              {items?.map((item, index) => (
                <div
                  className={`flex gap-3 items-center cursor-pointer px-6 py-3 hover:bg-[#edf1f5] ${
                    window.location.pathname.startsWith(item.path)
                      ? "bg-[#edf1f5]"
                      : ""
                  }`}
                  key={index}
                  onClick={() => navigate(`${item.path}`)}
                >
                  <React.Fragment>{item.icon}</React.Fragment>
                  <h1>{item.name}</h1>
                </div>
              ))}
              <div
                className="flex gap-3 items-center cursor-pointer hover:bg-[#edf1f5] px-6 py-3"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                <SlLogout />
                <h1>Đăng xuất</h1>
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] w-2/3 rounded-lg h-auto border-[1px] p-4">
            {children}
            <Toaster />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
