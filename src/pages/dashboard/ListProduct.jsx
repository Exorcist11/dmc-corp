import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlMagnifier, SlDoc, SlEqualizer } from "react-icons/sl";
import { GoPlus } from "react-icons/go";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate, useParams } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ListProduct() {
  const [search, setSearch] = useState("");
  const rowPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowPerPage);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    document.title = "Danh sách sản phẩm";
  });

  const navigate = useNavigate();
  const { path } = useParams();

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:9999/product_by_category/${path}`
        );
        if (response.data.status) {
          setProducts(response.data.record);
          setCategory(response.data.category);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListProducts();
  }, [path]);
  console.log(search);

  return (
    <div className="h-full flex flex-col gap-5 py-8">
      <div className="flex flex-col gap-3 px-10 ">
        <h1 className="font-bold text-3xl uppercase">Danh sách {category}</h1>
        <div className="flex items-center justify-between gap-4">
          <Input
            icon={<SlMagnifier />}
            placeholder="Tìm kiếm sản phẩm"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex items-center gap-4">
            {/* <Button className="bg-gray-500">
              <SlDoc size={18} color="white" />{" "}
              <label htmlFor="newRole" className="ml-1">
                Export
              </label>
            </Button> */}
            <Button
              className="bg-[#3874FF] font-semibold hover:bg-[#004dff]"
              onClick={() => navigate("/dashboard/new-product")}
            >
              <GoPlus size={18} color="white" />{" "}
              <label htmlFor="newRole" className="ml-1">
                Thêm mới sản phẩm
              </label>
            </Button>
          </div>
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
            {products
              ?.filter((item) => {
                return search.toLocaleLowerCase() === ""
                  ? item
                  : item.product_id.toLocaleLowerCase().includes(search);
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
                  <td className="py-4 px-6">
                    <img
                      src={
                        item?.images
                          ? item?.images
                          : "/public/Image_not_available.png"
                      }
                      className="h-20 w-20 object-cover object-center rounded-xl"
                    />
                  </td>
                  <td
                    className="py-4 px-6 cursor-pointer hover:text-blue-700"
                    onClick={() => navigate(`/${item?.path_product}`)}
                  >
                    {item?.product_name}
                  </td>
                  <td className="py-4 px-6">{item?.amount}</td>
                  <td className="py-4 px-6">
                    $ {parseInt(item?.price).toLocaleString("vn-VN")}
                  </td>
                  <td className="py-4 px-6">{item?.rate}</td>
                  <td className="py-4 px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <SlEqualizer />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/dashboard/${path}/${item?.product_id}`)
                          }
                        >
                          Chi tiết sản phẩm
                        </DropdownMenuItem>
                        <DropdownMenuItem>Xoá</DropdownMenuItem>
                        <DropdownMenuItem>Xuất dữ liệu</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
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
                endIndex > products?.length
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
