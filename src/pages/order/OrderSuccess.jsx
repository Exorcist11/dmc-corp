import { useSearchParams } from "react-router-dom";
import { BsBox2 } from "react-icons/bs";
export default function OrderSuccess() {
  const [order] = useSearchParams();
  return (
    <div className="px-20 flex flex-col items-center justify-center h-full py-10 gap-3">
      <BsBox2 size={48} />
      <h1>Đơn hàng của bạn đã được đặt thành công</h1>
      <div>
        <p className="text-base">
          [ Mã đơn hàng #{order.get("order")} ] - Date
        </p>
      </div>
      <div>
        <a className="text-sm underline hover:font-semibold cursor-pointer" href="/">Quay về trang chủ</a>
      </div>
    </div>
  );
}
