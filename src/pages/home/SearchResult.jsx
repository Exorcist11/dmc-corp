import { useNavigate, useSearchParams } from "react-router-dom";
import { RxSlash, RxArchive } from "react-icons/rx";
import { LiaCartPlusSolid, LiaShippingFastSolid } from "react-icons/lia";
import toast from "react-hot-toast";

import { PiShieldCheckLight } from "react-icons/pi";
import { MdCurrencyExchange } from "react-icons/md";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export default function SearchResult() {
  const [search] = useSearchParams();
  const [products, setProducts] = useState([]);
  const searchValue = search.get("value");
  const navigate = useNavigate();
  const itemPerPage = 8;
  const account = JSON.parse(localStorage.getItem("account"));
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemPerPage);
  useEffect(() => {
    document.title = `Sản phẩm tìm kiếm: ${searchValue} - DMC-Group`;
  });
  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get(`http://127.0.0.1:9999/search`, {
          params: {
            value: searchValue,
          },
        })
        .then((res) => setProducts(res.data.record))
        .catch((err) => console.log(err));
    };
    getProduct();
  }, [searchValue]);

  const addToCart = async (product_id) => {
    await axios
      .post("http://127.0.0.1:9999/add_to_cart", {
        product_id: product_id,
        account_id: account.account_id,
      })
      .then(() => toast.success("Thêm mới sản phẩm thành công!"))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="flex flex-col px-36 gap-5 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <RxSlash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Kết quả tìm kiếm: {searchValue}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {products.length > 0 ? (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 gap-2">
              {products?.slice(startIndex, endIndex).map((item, index) => (
                <div
                  className="flex flex-col gap-3 justify-center group"
                  key={index}
                >
                  <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow ">
                    <div className="h-96">
                      <img
                        className="h-full w-full object-cover transition-transform duration-500  group-hover:scale-105 object-center"
                        src={item.images[0]}
                        alt={item?.product_name}
                      />
                    </div>
                    {/* Đổi img */}
                    {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent  group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div> */}
                    <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-end px-9 text-center transition-all duration-300 group-hover:translate-y-0 pb-5 font-semibold">
                      <Button
                        onClick={() => addToCart(item?.product_id)}
                        className="rounded-full bg-white  hover:shadow text-black py-2 px-3.5 font-com text-xs capitalize flex gap-1 justify-center items-center"
                      >
                        Thêm vào giỏ hàng <LiaCartPlusSolid size={18} />
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm flex flex-col gap-3">
                    <h1
                      className="font-semibold hover:opacity-75 cursor-pointer"
                      onClick={() => navigate(`/${item?.path_product}`)}
                    >
                      {item.product_name}
                    </h1>
                    <h1>{parseInt(item?.price).toLocaleString("vi-VN")} VND</h1>
                  </div>
                </div>
              ))}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem className="cursor-pointer">
                  <PaginationPrevious
                    className={
                      startIndex === 0
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                    onClick={() => {
                      setStartIndex(startIndex - itemPerPage);
                      setEndIndex(endIndex - itemPerPage);
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
                      setStartIndex(startIndex + itemPerPage);
                      setEndIndex(endIndex + itemPerPage);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col items-center gap-3 h-full justify-center">
              <RxArchive size={110} />
              <h1 className="text-sm">
                Hiện tại, sản phẩm bạn tìm kiếm hiện đang cập nhật. Vui lòng
                quay lại sau hoặc liên hệ với chúng tôi.
              </h1>
              <Button onClick={() => navigate("/")}>Cửa hàng</Button>
            </div>
          </div>
        )}
      </div>
      <div className="bg-[#ecebea] h-14 grid grid-cols-3">
        <div className="flex justify-center gap-2 items-center">
          <PiShieldCheckLight />
          Bảo hành 10 năm
        </div>
        <div className="flex justify-center gap-2 items-center">
          <MdCurrencyExchange />
          Miễn phí đổi trả trong vòng 3 ngày
        </div>
        <div className="flex justify-center gap-2 items-center">
          <LiaShippingFastSolid />
          FREE SHIPPING đơn hàng &gt; 700K
        </div>
      </div>
    </div>
  );
}
