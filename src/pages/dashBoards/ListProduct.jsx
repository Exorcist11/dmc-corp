import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlMagnifier, SlDoc, SlEqualizer } from "react-icons/sl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
import { useEffect } from "react";

export default function ListProduct() {
  useEffect(() => {
    document.title = "Danh sách sản phẩm";
  });
  return (
    <div className="h-full flex flex-col gap-5 py-8">
      <div className="flex flex-col gap-3 px-10 ">
        <h1 className="font-bold text-3xl">Danh sách nhẫn</h1>
        <div className="flex items-center justify-between gap-4">
          <Input icon={<SlMagnifier />} placeholder="Tìm kiếm sản phẩm" />

          <Button className="bg-gray-500">
            <SlDoc size={18} color="white" />{" "}
            <label htmlFor="newRole" className="ml-1">
              Export
            </label>
          </Button>
        </div>
      </div>

      <div className="bg-white h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase border-b-[1px] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6"></th>
              <th scope="col" className="py-3 px-6"></th>
              <th scope="col" className="py-3 px-6">
                Tên sản phẩm
              </th>
              <th scope="col" className="py-3 px-6">
                Số lượng
              </th>
              <th scope="col" className="py-3 px-6">
                Giá
              </th>
              <th scope="col" className="py-3 px-6">
                Đánh giá
              </th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 border-b-[1px]">
              <td className="py-4 px-6">
                <input type="checkbox" />
              </td>
              <td className="py-4 px-6">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUjWDMg9r9fOkOFket-YHclTjXpZg834-rU_H2p60HA&s"
                  className="h-20 w-20 object-cover object-center rounded-xl"
                />
              </td>
              <td className="py-4 px-6">Nhẫn vip pro</td>
              <td className="py-4 px-6">100</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">4.9</td>
              <td className="py-4 px-6">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <SlEqualizer />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Chi tiết sản phẩm</DropdownMenuItem>
                    <DropdownMenuItem>Xoá</DropdownMenuItem>
                    <DropdownMenuItem>Xuất dữ liệu</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
