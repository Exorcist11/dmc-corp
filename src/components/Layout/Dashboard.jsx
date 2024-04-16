import { useState } from "react";
import {
  SlPieChart,
  SlArrowRight,
  SlArrowDown,
  SlBasket,
  SlEarphonesAlt,
  SlPeople,
  SlUser,
  SlDiamond,
  SlNotebook,
  SlRocket,
  SlDrawer,
} from "react-icons/sl";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ children }) {
  const [hidden, setHidden] = useState(false);
  const [selectedAppMenu, setSelectedAppMenu] = useState(null);
  const [hightlight, setHightlight] = useState(null);

  const navigate = useNavigate();

  const homeMenu = [
    {
      name: "Ecommerce",
      link: "/",
      icon: <SlBasket />,
    },
    {
      name: "Project management",
      link: "/",
      icon: <SlPeople />,
    },
    {
      name: "CRM",
      link: "/",
      icon: <SlEarphonesAlt />,
    },
  ];

  const appMenu = [
    {
      name: "Tài khoản",
      icon: <SlUser />,
      action: [
        {
          name: "Thêm mới tài khoản",
          link: "/new_account",
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
        { name: "Quà tặng", link: "/dashboard/qua-tang" },
      ],
    },
    { name: "Đơn hàng", icon: <SlDrawer /> },
    { name: "News", icon: <SlNotebook /> },
    { name: "Nhà cung cấp", icon: <SlRocket /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="h-16 border-b-[1px] flex justify-between px-10 items-center fixed top-0 z-30 left-0 right-0 bg-white">
        <div>DMC-Corp</div>
        <div>Avatar</div>
      </div>
      <div className="flex mt-16 ">
        <div className=" fixed w-1/6 h-full flex flex-col bg-white border-r shadow-sm">
          <div className="flex flex-col">
            <div
              className="flex items-center gap-3 p-4 text-sm font-medium"
              onClick={() => setHidden(!hidden)}
            >
              <div className="flex items-center gap-2">
                {hidden ? <SlArrowDown size={8} /> : <SlArrowRight size={8} />}
                <SlPieChart />
              </div>
              <h1>Home</h1>
            </div>
            <div
              className={`pl-12 ${hidden ? "" : "hidden"} flex flex-col gap-2`}
            >
              {homeMenu.map((item, index) => (
                <div
                  className="flex items-center gap-2 text-sm hover:font-medium cursor-pointer"
                  key={index}
                  onClick={() => navigate(`${item.link}`)}
                >
                  {item.icon}
                  <h1>{item.name}</h1>
                </div>
              ))}
            </div>
          </div>

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
                          setHightlight(index_action);
                          navigate(`${item_action.link}`);
                        }}
                      >
                        <h1
                          className={`${
                            hightlight === index_action
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
