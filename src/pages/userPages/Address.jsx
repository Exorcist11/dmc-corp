import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Address() {
  useEffect(() => {
    document.title = "Sổ địa chỉ";
  });
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold">Sổ địa chỉ</h1>
      <div className="border-[1px] p-4 rounded-lg text-sm flex flex-col gap-2">
        <div className="flex justify-between">
          <h1>Devil May Cry | 0919934251</h1>
          <div>
            <label
              htmlFor="Sửa"
              className="hover:font-semibold hover:underline cursor-pointer"
            >
              Cập nhật
            </label>{" "}
            |{" "}
            <label
              htmlFor="Xoá"
              className="hover:font-semibold hover:underline cursor-pointer"
            >
              Xoá
            </label>
          </div>
        </div>
        <div>Số nhà 55, Tân Giao</div>
        <div>Thăng Long - Nông Cống - Thanh Hoá</div>
      </div>

      <div className="border-[1px] p-4 rounded-lg text-sm flex flex-col gap-2">
        <div className="flex justify-between">
          <h1>Devil May Cry | 0919934251</h1>
          <div>
            <label
              htmlFor="Sửa"
              className="hover:font-semibold hover:underline cursor-pointer"
            >
              Cập nhật
            </label>{" "}
            |{" "}
            <label
              htmlFor="Xoá"
              className="hover:font-semibold hover:underline cursor-pointer"
            >
              Xoá
            </label>
          </div>
        </div>
        <div>Số nhà 55, Tân Giao</div>
        <div>Thăng Long - Nông Cống - Thanh Hoá</div>
      </div>
      <Button>Thêm địa chỉ</Button>
    </div>
  );
}
