import { useSearchParams, useNavigate } from "react-router-dom";

import { FaCircleCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function PaymentReturn() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const txnRef = params.get("vnp_TxnRef");
  const amount = params.get("vnp_Amount");

  return (
    <div className="flex justify-center items-center h-full bg-[#f2f4f5] py-20">
      <div className="shadow-md p-6 rounded-lg bg-white flex justify-between flex-col items-center gap-3 w-1/2">
        <FaCircleCheck size={50} color="green" aria-label="Invoice Icon" />
        <h1 className="text-xl font-bold my-2">
          Đơn hàng thanh toán thành công
        </h1>
        {txnRef && <h2 className="text-base">Mã đơn hàng: {txnRef}</h2>}
        {amount && (
          <h2 className="text-base">
            Giá trị: {(Number(amount) / 100).toLocaleString("vi-VN")} VNĐ
          </h2>
        )}

        <div className="flex gap-3">
          <Button
            onClick={() => navigate(`/order/${txnRef}`)}
            className="bg-white text-black hover:bg-zinc-100 shadow-md"
          >
            Thông tin đơn hàng
          </Button>
          <Button className="bg-green-600" onClick={() => navigate("/")}>
            Tiếp tục mua sắm
          </Button>
        </div>
      </div>
    </div>
  );
}
