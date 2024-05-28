import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlCheck, SlClose, SlClock, SlStar } from "react-icons/sl";
import { Textarea } from "@/components/ui/textarea";

export default function OrderView() {
  const { order_id } = useParams();
  const [order, setOrder] = useState("");
  useEffect(() => {
    const getOrder = async () => {
      await axios
        .get(`http://127.0.0.1:9999/get_order/${order_id}`)
        .then((res) => setOrder(res.data.order))
        .catch((err) => console.log(err));
    };
    getOrder();
  }, []);
  useEffect(() => {
    document.title = "Thông tin đơn hàng";
  });
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
      case "baking":
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

  return (
    <div className="p-5 h-full">
      <h1 className="font-medium text-xl">Thông tin đơn hàng - {order_id}</h1>
      <div className="flex flex-col gap-2 py-3">
        <div className="border-b border-black flex flex-col gap-2 pb-3">
          <h1 className="text-center text-xl">Thông tin khách hàng</h1>
          <div className="flex items-center gap-3 text-sm">
            <h1 className="w-1/4 font-semibold">Mã khách hàng</h1>
            <h1>{order.account_id}</h1>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <h1 className="w-1/4 font-semibold">Họ tên người nhận</h1>
            <h1>{order?.address?.full_name}</h1>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <h1 className="w-1/4 font-semibold">Số điện thoại</h1>
            <h1>{order?.address?.phone_number}</h1>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <h1 className="w-1/4 font-semibold">Địa chỉ nhận hàng</h1>
            <h1>
              {order?.address?.note} - {order?.address?.ward} -{" "}
              {order?.address?.district} - {order?.address?.province}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-center text-xl">Thông tin đơn hàng</h1>
          <div className="flex items-center gap-3 text-sm">
            <h1 className="w-1/4 font-semibold">Ngày đặt hàng</h1>
            <h1>{order?.create_at}</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <h1 className="w-1/4 font-semibold">Ghi chú</h1>
            <h1>{order?.note}</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <h1 className="w-1/4 font-semibold">Hình thức thanh toán</h1>
            <h1>{paymentView(order?.payment)}</h1>
          </div>
          <div className="flex items-center border-b font-medium">
            <div className="w-2/5 text-center">Sản phẩm</div>
            <div className="w-1/5 text-right">Số lượng</div>
            <div className="w-1/5 text-right">Kho</div>
            <div className="w-1/5 text-right">Tổng tiền</div>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px]">
            {order?.product?.map((item, index) => (
              <div className=" text-sm  flex flex-col" key={index}>
                <div className="flex items-center border-b py-2">
                  <div className="flex gap-3 items-start w-2/5">
                    <img
                      src={item?.image}
                      alt=""
                      className="w-28 h-28 object-center object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h1 className="">{item?.product_name}</h1>
                      <h1 className="text-[#74869b]">{item?.product_id}</h1>
                      <h1>
                        {item?.category} | {item?.size}
                      </h1>
                    </div>
                  </div>
                  <div className="w-1/5 text-right">{item?.amount}</div>
                  <div className="w-1/5 text-right">{item?.warehouse}</div>
                  <div className="w-1/5 text-right font-semibold">
                    {parseInt(item?.order_total).toLocaleString("vi-VN")} VND
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Select
                onValueChange={(value) =>
                  handleUpdateStatus(value, order.order_id)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={statusView(order?.status)} />
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
              <Textarea placeholder="Lý do" className="w-[500px]" />
            </div>
            <div className="flex items-center text-sm gap-3 ">
              <table className="leading-7 mt-3">
                <tr>
                  <td className="text-left w-[300px]">Số lượng</td>
                  <td>{order?.product?.length}</td>
                </tr>
                <tr>
                  <td className="text-left w-[300px]">Giá trị đơn hàng</td>
                  <td>{parseInt(order?.total).toLocaleString("vi-VN")}</td>
                </tr>
                <tr>
                  <th className="text-left w-[300px]">Tổng tiền thanh toán</th>
                  <th>{parseInt(order?.total).toLocaleString("vi-VN")}</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
