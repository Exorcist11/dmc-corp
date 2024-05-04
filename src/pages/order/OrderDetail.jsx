import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetail() {
  const { order_id } = useParams();
  const [detail, setDetail] = useState("");
  const getOrderDetail = async () => {
    await axios
      .get(`http://127.0.0.1:9999/get_order/${order_id}`)
      .then((res) => setDetail(res.data.order))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.title = `Thông tin đơn hàng - ${order_id}`;
    getOrderDetail();
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

 
  return (
    <div>
      <h1 className="font-semibold text-xl">Chi tiết đơn hàng</h1>
      <div className="border-y text-sm py-3 flex flex-col gap-2">
        <div className="flex gap-2 ">
          <h1 className="w-1/4">Mã đơn</h1>
          <div className="font-medium flex items-center justify-between w-3/4">
            <h1>{detail.order_id}</h1>
            <h1 className="text-[#77b1bc] font-semibold cursor-pointer">
              Theo dõi đơn hàng
            </h1>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="w-1/4">Ngày mua hàng</h1>
          <h1 className="font-medium">{detail.create_at}</h1>
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="w-1/4">Người nhận</h1>
          <h1 className="font-medium">{detail.address?.full_name}</h1>
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="w-1/4">Số điện thoại</h1>
          <h1 className="font-medium">{detail.address?.phone_number}</h1>
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="w-1/4">Địa chỉ</h1>
          <h1 className="font-medium">
            {detail.address?.note} - {detail.address?.ward} -{" "}
            {detail.address?.district} - {detail.address?.province}
          </h1>
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="w-1/4">Phương thức thanh toán</h1>
          <h1 className="font-medium">
            {detail.payment === "cash"
              ? "Thanh toán khi nhận hàng (COD)"
              : "Đơn hàng đã được thanh toán"}
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="w-1/4">Trạng thái</h1>
          <h1 className="font-medium">{getStatusElement(detail.status)}</h1>
        </div>
      </div>

      <h1 className="font-semibold my-3">
        Sản phẩm ({detail.product?.length}){" "}
      </h1>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px]">
        {detail.product?.map((item, index) => (
          <div className=" text-sm  flex flex-col" key={index}>
            <div className="flex items-center border-b py-2">
              <div className="flex gap-3 items-start w-3/5">
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
              <div className="w-1/5 text-right font-semibold">
                {parseInt(item?.order_total).toLocaleString("vi-VN")} VND
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center text-sm gap-3 justify-end">
          <table className="leading-7 mt-3">
            <tr>
              <td className="text-left w-[300px]">Giá trị đơn hàng</td>
              <td>{parseInt(detail.total).toLocaleString("vi-VN")}</td>
            </tr>
            <tr>
              <th className="text-left w-[300px]">Tổng tiền thanh toán</th>
              <th>{parseInt(detail.total).toLocaleString("vi-VN")}</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
