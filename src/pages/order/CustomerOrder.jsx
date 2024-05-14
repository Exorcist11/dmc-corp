import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CustomerOrder() {
  const [order, setOrder] = useState([]);
  const rowPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowPerPage);
  const account = JSON.parse(localStorage.getItem("account"));
  const getOrder = async () => {
    await axios
      .get(`http://127.0.0.1:9999/get_order_by_customer/${account.account_id}`)
      .then((res) => setOrder(res.data.record))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    document.title = "Đơn hàng của bạn - DMC-Corp";
    getOrder();
  }, []);

  const getStatusElement = (status) => {
    switch (status) {
      case "active":
        return (
          <div className="bg-[#e0eff2] p-1 text-[#63b1c1]">Đã xác nhận</div>
        );
      case "pending":
        return (
          <div className="bg-[#ff9240] p-1 text-[#ffffa9]">Chờ xác nhận</div>
        );
      case "reject":
        return <div className="bg-[#f8d4d2] p-1 text-[#da2b27]">Đã hủy</div>;
      case "completed":
        return (
          <div className="bg-[#0063ec] p-1 text-[#fff]">Đã hoàn thành</div>
        );
      default:
        return null;
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Đơn hàng của bạn</h1>
        <div className="border-t mt-2 flex flex-col gap-2 py-3 w-full">
          {order
            ? order.slice(startIndex, endIndex).map((item, index) => (
                <div
                  className="flex flex-col gap-2 border border-[#cbd5e1] rounded-lg p-3 text-sm"
                  key={index}
                >
                  <div className="flex gap-2 ">
                    <h1 className="w-1/5">Mã đơn</h1>
                    <h1 className="font-medium">{item?.order_id}</h1>
                  </div>

                  <div className="flex gap-2 ">
                    <h1 className="w-1/5">Ngày đặt hàng</h1>
                    <h1 className="font-medium">{item?.create_at}</h1>
                  </div>

                  <div className="flex gap-2 ">
                    <h1 className="w-1/5">Số lượng</h1>
                    <h1 className="font-medium">{item?.quantity}</h1>
                  </div>

                  <div className="flex gap-2 ">
                    <h1 className="w-1/5">Tổng tiền</h1>
                    <h1 className="font-medium">
                      {parseInt(item?.total).toLocaleString("vi-VN")} VND
                    </h1>
                  </div>

                  <div className="flex items-center justify-between border-t pt-3">
                    {getStatusElement(item.status)}
                    <h1
                      className="cursor-pointer hover:font-medium"
                      onClick={() => navigate(`/order/${item.order_id}`)}
                    >
                      Chi tiết đơn hàng
                    </h1>
                  </div>
                </div>
              ))
            : "Không có đơn hàng"}
        </div>
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
