import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SlMagnifier,
  SlDoc,
  SlCheck,
  SlClose,
  SlClock,
  SlStar,
} from "react-icons/sl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderManager() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState([]);
  const rowPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowPerPage);

  const getOrder = async () => {
    if (window.location.pathname === "/dashboard/order") {
      await axios
        .get("http://127.0.0.1:9999/get_order")
        .then((res) => setOrder(res.data.record))
        .catch((err) => console.log(err));
    } else {
      await axios
        .get("http://127.0.0.1:9999/get_order_pending")
        .then((res) => {
          setOrder(res.data.record);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    document.title = "Danh sách đơn hàng";
    getOrder();
  }, [window.location.pathname]);

  const statusView = (status) => {
    switch (status) {
      case "active":
        return (
          <div className="p-1 font-medium text-[#2fa329] flex items-center gap-2">
            <SlCheck /> Đã xác nhận
          </div>
        );
      case "pending":
        return (
          <div className="p-1 font-medium text-yellow-500 flex items-center gap-2">
            <SlClock /> Chờ xác nhận
          </div>
        );
      case "reject":
        return (
          <div className="p-1 font-medium text-[#da2b27] flex items-center gap-2">
            <SlClose />
            Từ chối
          </div>
        );
      case "completed":
        return (
          <div className="p-1 font-medium text-[#0063ec] flex items-center gap-2">
            <SlStar /> Đã hoàn thành
          </div>
        );
      default:
        return null;
    }
  };

  const paymentView = (payment) => {
    switch (payment) {
      case "cash":
        return <h1>Thanh toán khi nhận hàng (COD)</h1>;
      case "banking":
        return <h1>Thanh toán bằng thẻ ngân hàng</h1>;
      case "vn-pay":
        return <h1>Thanh toán VNPAY</h1>;
      default:
        return null;
    }
  };

  const handleUpdateStatus = async (status, order_id) => {
    await axios
      .post("http://127.0.0.1:9999/action_order", {
        order_id: order_id,
        status: status,
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col gap-5 py-8">
      <div className="flex flex-col gap-3 px-10 ">
        <h1 className="font-bold text-3xl">Đơn hàng gần đây</h1>
        <div className="flex items-center justify-between gap-4">
          <Input
            icon={<SlMagnifier />}
            placeholder="Tìm kiếm đơn hàng"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex items-center gap-4">
            {/* <Button className="bg-gray-500">
              <SlDoc size={18} color="white" />{" "}
              <label htmlFor="newRole" className="ml-1">
                Export
              </label>
            </Button> */}
          </div>
        </div>
      </div>

      <div className="bg-white h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase border-b-[1px] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6"></th>

              <th scope="col" className="py-3 px-6">
                Mã đơn hàng
              </th>
              <th scope="col" className="py-3 px-6">
                Giá trị
              </th>
              <th scope="col" className="py-3 px-6">
                Hình thức thanh toán
              </th>
              <th scope="col" className="py-3 px-6">
                Trạng thái
              </th>
              <th scope="col" className="py-3 px-6">
                Ngày đặt hàng
              </th>
            </tr>
          </thead>
          <tbody>
            {order
              ?.filter((item) => {
                return search.toLocaleLowerCase() === ""
                  ? item
                  : item.order_id.toLocaleLowerCase().includes(search);
              })
              .slice(startIndex, endIndex)
              .map((item, index) => (
                <tr
                  className="bg-white dark:bg-gray-800 dark:border-gray-700 border-b-[1px]"
                  key={index}
                >
                  <td className="py-4 px-6">
                    <input type="checkbox" />
                  </td>
                  <td
                    className="py-4 px-6 hover:font-medium cursor-pointer"
                    onClick={() =>
                      navigate(`/dashboard/order/${item?.order_id}`)
                    }
                  >
                    {item?.order_id}
                  </td>
                  <td className="py-4 px-6">
                    $ {parseInt(item?.total).toLocaleString("vn-VN")}
                  </td>
                  <td className="py-4 px-6">{paymentView(item?.payment)}</td>
                  <td className="py-4 px-6">
                    <Select
                      onValueChange={(value) =>
                        handleUpdateStatus(value, item.order_id)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={statusView(item?.status)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="active"
                          onClick={(value) => console.log(value)}
                        >
                          <div className="p-1 font-medium text-[#2fa329] flex items-center gap-2">
                            <SlCheck /> Xác nhận
                          </div>
                        </SelectItem>
                        <SelectItem value="pending">
                          <div className="p-1 font-medium text-yellow-500 flex items-center gap-2">
                            <SlClock /> Chờ xác nhận
                          </div>
                        </SelectItem>
                        <SelectItem value="reject">
                          <div className="p-1 font-medium text-[#da2b27] flex items-center gap-2">
                            <SlClose />
                            Từ chối
                          </div>
                        </SelectItem>
                        <SelectItem value="completed">
                          <div className="p-1 font-medium text-[#0063ec] flex items-center gap-2">
                            <SlStar /> Đã hoàn thành
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-4 px-6">{item?.create_at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex - rowPerPage);
                setEndIndex(endIndex - rowPerPage);
              }}
            />
          </PaginationItem>

          <PaginationItem className="cursor-pointer">
            <PaginationNext
              className={
                endIndex > order?.length
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => {
                setStartIndex(startIndex + rowPerPage);
                setEndIndex(endIndex + rowPerPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
