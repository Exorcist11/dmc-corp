import { useState } from "react";

import {
  SlArrowRight,
  SlArrowDown,
  SlUser,
  SlDiamond,
  SlNotebook,
  SlSettings,
  SlDrawer,
  SlChart,
  SlLogout,
} from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toaster } from "react-hot-toast";

export default function Dashboard({ children }) {
  const [selectedAppMenu, setSelectedAppMenu] = useState(null);

  const navigate = useNavigate();

  const appMenu = [
    {
      name: "Dashboard",
      icon: <SlChart />,
      action: [
        {
          name: "Thống kê",
          link: "/dashboard",
        },
      ],
    },
    {
      name: "Tài khoản",
      icon: <SlUser />,
      action: [
        {
          name: "Danh sách tài khoản",
          link: '/accounts'
        },
        {
          name: "Tài khoản quản trị",
          link: "/customers/R2",
        },
        {
          name: "Tài khoản khách",
          link: "/customers/R1",
        },
        {
          name: "Chức vụ",
          link: "/role",
        },
      ],
    },
    {
      name: "Sản phẩm",
      icon: <SlDiamond />,
      action: [
        { name: "Thêm mới sản phẩm", link: "/dashboard/new-product" },
        { name: "Nhẫn", link: "/dashboard/nhan" },
        { name: "Đồng hồ", link: "/dashboard/dong-ho" },
        { name: "Vòng tay", link: "/dashboard/vong-tay" },
        { name: "Dây chuyền", link: "/dashboard/day-chuyen" },
      ],
    },
    {
      name: "Đơn hàng",
      icon: <SlDrawer />,
      action: [
        { name: "Đơn hàng gần đây", link: "/dashboard/order" },
        {
          name: "Đơn hàng chưa xác nhận",
          link: "/dashboard/pending-order",
        },
      ],
    },
    {
      name: "News",
      icon: <SlNotebook />,
      action: [
        { name: "Thêm mới bài viết", link: "/dashboard/news" },
        // { name: "Quản lý bài viết", link: "/dashboard/news" },
      ],
    },
    // { name: "Nhà cung cấp", icon: <SlRocket /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-16 border-b-[1px] flex justify-between px-10 items-center fixed top-0 z-30 left-0 right-0 bg-white">
        <div>DMC-Corp</div>
        <div className="flex items-center gap-3">
          <h1>Trang quản lý</h1>
          <Popover>
            <PopoverTrigger>
              <SlSettings />
            </PopoverTrigger>
            <PopoverContent>
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
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex mt-16 h-full">
        <div className=" fixed w-1/6 h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 flex flex-col text-sm">
            <h1 className="font-medium py-4">APPS</h1>
            <div className="flex flex-col gap-3">
              {appMenu.map((item, index) => (
                <div
                  className="flex flex-col justify-center gap-3 text-sm cursor-pointer"
                  key={index}
                >
                  <div
                    className="flex gap-3 items-center hover:font-medium"
                    onClick={() =>
                      setSelectedAppMenu(
                        selectedAppMenu === index ? null : index
                      )
                    }
                  >
                    {selectedAppMenu === index ? (
                      <SlArrowDown size={8} />
                    ) : (
                      <SlArrowRight size={8} />
                    )}
                    {item.icon}
                    <h1>{item.name}</h1>
                  </div>

                  {selectedAppMenu === index &&
                    item.action &&
                    item.action.map((item_action, index_action) => (
                      <div
                        key={index_action}
                        className="pl-6 hover:bg-[#eff2f6] rounded-sm h-7 justify-center flex flex-col"
                        onClick={() => {
                          navigate(`${item_action.link}`);
                        }}
                      >
                        <h1
                          className={`${
                            window.location.pathname.startsWith(
                              item_action.link
                            )
                              ? "text-[#68acfa] font-medium"
                              : ""
                          }`}
                        >
                          {item_action.name}
                        </h1>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#f5f7fa] ml-1/6 w-full overflow-y-auto h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
