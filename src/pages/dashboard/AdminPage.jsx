import MonthChart from "@/components/Chart/MonthChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { SlPeople, SlDiamond, SlBadge } from "react-icons/sl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeekChart from "@/components/Chart/WeekChart";

export default function AdminPage() {
  const [time, setTime] = useState(new Date());
  const [home, setHome] = useState([]);

  useEffect(() => {
    document.title = "Trang quản lý";
    setInterval(() => setTime(new Date()), 1000);
    const getHome = async () => {
      await axios
        .get("http://127.0.0.1:9999/dashboard")
        .then((res) => setHome(res.data))
        .catch((err) => console.log(err));
    };
    getHome();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">Overview</h1>
        <div>
          {time.toLocaleTimeString()} - {time.toLocaleDateString("en-GB")}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex justify-center flex-col items-center gap-3 border rounded-xl py-4 bg-gradient-to-r text-white from-slate-900 to-slate-700">
          <SlPeople size={36} />
          <h1 className="font-semibold">Số lượng khách hàng</h1>
          <h1>{home?.account}</h1>
        </div>

        <div className="flex justify-center flex-col items-center gap-3 border rounded-xl py-4 text-white bg-gradient-to-r from-blue-800 to-indigo-900">
          <SlBadge size={36} />
          <h1 className="font-semibold">Doanh số</h1>
          <h1>{parseInt(home?.summary).toLocaleString("vi-VN")} VND</h1>
        </div>

        <div className="flex justify-center flex-col items-center gap-3 border rounded-xl py-4 bg-gradient-to-r text-white  from-fuchsia-500 to-cyan-500">
          <SlDiamond size={36} />
          <h1 className="font-semibold">Số lượng sản phẩm</h1>
          <h1>{home?.product}</h1>
        </div>
      </div>

      <div className="">
        <Tabs defaultValue="month">
          <TabsList>
            <TabsTrigger value="month">Tháng</TabsTrigger>
            <TabsTrigger value="day">Ngày</TabsTrigger>
          </TabsList>
          <TabsContent value="month">
            <MonthChart />
          </TabsContent>
          <TabsContent value="day">
            <WeekChart />
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-semibold">Sản phẩm mới</h1>
          <div className="rounded-xl bg-white">
            <table className="w-full rounded-xl text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                {home.new_product?.map((item, index) => (
                  <tr
                    className="rounded-xl dark:bg-gray-800 dark:border-gray-700 border-b-[1px]"
                    key={index}
                  >
                    <td className="py-2 px-6">
                      <img
                        src={
                          item?.images
                            ? item?.images[0]
                            : "/public/Image_not_available.png"
                        }
                        className="h-16 w-16 object-cover object-center rounded-xl"
                      />
                    </td>
                    <td
                      className="py-2 px-6 cursor-pointer hover:text-blue-700"
                      // onClick={() => navigate(`/${item?.path_product}`)}
                    >
                      {item?.product_name}
                    </td>

                    <td className="py-2 px-6">
                      $ {parseInt(item?.price).toLocaleString("vn-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-4 h-full flex-col">
          <h1 className="text-xl font-semibold">Người dùng mới đăng ký</h1>
          <div className="rounded-xl bg-white h-full">
            <table className="w-full rounded-xl text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody className="">
                {home.new_account?.map((item, index) => (
                  <tr
                    className=" rounded-xl dark:bg-gray-800 dark:border-gray-700 border-b-[1px]"
                    key={index}
                  >
                    <td
                      className="py-2 px-6 cursor-pointer hover:text-blue-700"
                      // onClick={() => navigate(`/${item?.path_product}`)}
                    >
                      {item?.account_id}
                    </td>

                    <td className="py-2 px-6">{item?.create_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
