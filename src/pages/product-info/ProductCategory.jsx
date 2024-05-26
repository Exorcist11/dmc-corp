import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlEqualizer, SlShuffle } from "react-icons/sl";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LiaCartPlusSolid } from "react-icons/lia";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductCategory() {
  const [products, setProducts] = useState([]);
  const account = JSON.parse(localStorage.getItem("account"));

  const navigate = useNavigate();
  const { path } = useParams();
  const itemPerPage = 8;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemPerPage);
  useEffect(() => {
    document.title = "Danh sách sản phẩm - DMC-Corp";
  });

  useEffect(() => {
    const getCategory = async () => {
      if (path !== "best-seller") {
        axios
          .get(`http://127.0.0.1:9999/product_by_category/${path}`)
          .then((res) => setProducts(res.data))
          .catch((err) => console.log(err));
      } else {
        axios
          .get(`http://127.0.0.1:9999/product/best-seller`)
          .then((res) => setProducts(res.data))
          .catch((err) => console.log(err));
      }
    };
    getCategory();
  }, [path]);

  const sortProducts = (order) => {
    const sortedProducts = [...products.record];
    sortedProducts.sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
    setProducts({ ...products, record: sortedProducts });
  };

  const getBanner = (category) => {
    switch (category) {
      case "dong-ho":
        return (
          <img
            src="/public/Banner-all.jpg"
            className="object-cover object-center h-[300px] w-full"
          />
        );
      case "vong-tay":
        return (
          <img
            src="/public/Banner-VongTay.jpg"
            className="object-cover object-center h-[300px] w-full"
          />
        );
      case "nhan":
        return (
          <img
            src="/public/BannerProduct-ring.png"
            className="object-cover object-center w-full"
          />
        );
      case "day-chuyen":
        return (
          <img
            src="/public/BannerProduct-day.png"
            className="object-cover object-center w-full"
          />
        );
      case "best-seller":
        return (
          <img
            src="/public/BestSeller.jpg"
            className="object-cover object-center w-full"
          />
        );
      default:
        return null;
    }
  };
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
    <div className="flex flex-col h-full">
      <div className="flex flex-col px-10 h-full">
        <div className="p-5 flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{products?.category}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div>{getBanner(path)}</div>

            <div className="flex items-center justify-between text-[#88898d] text-sm">
              <div className="flex items-center gap-3">
                <div className="flex gap-3 items-center hover:underline cursor-pointer">
                  <SlEqualizer size={14} />
                  Filter
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex gap-3 items-center hover:underline cursor-pointer">
                      <SlShuffle size={14} />
                      Sắp xếp
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => sortProducts("asc")}>
                      Giá tăng dần
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => sortProducts("desc")}>
                      Giá giảm dần
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h1>{products?.record?.length} sản phẩm</h1>
            </div>

            <div className="grid grid-cols-4 gap-2 justify-center">
              {products?.record
                ?.slice(startIndex, endIndex)
                .map((item, index) => (
                  <div
                    className="flex flex-col gap-3 justify-center group"
                    key={index}
                  >
                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow ">
                      <div className="h-96">
                        <img
                          className="h-full w-full object-cover transition-transform duration-500  group-hover:scale-105 object-center"
                          src={item.images}
                          alt={item?.product_name}
                        />
                      </div>
                      {/* Đổi img */}
                      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent  group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div> */}
                      <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-end px-9 text-center transition-all duration-300 group-hover:translate-y-0 pb-5 font-semibold">
                        <button
                          onClick={() => addToCart(item?.product_id)}
                          className="rounded-full bg-white  hover:shadow text-black py-2 px-3.5 font-com text-xs capitalize flex gap-1 justify-center items-center"
                        >
                          Thêm vào giỏ hàng <LiaCartPlusSolid size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h1
                        className="font-semibold hover:opacity-75 cursor-pointer "
                        onClick={() => navigate(`/${item?.path_product}`)}
                      >
                        {item.product_name}
                      </h1>
                      <h1>
                        {parseInt(item?.price).toLocaleString("vi-VN")} VND
                      </h1>
                    </div>
                  </div>
                ))}
            </div>
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
                    endIndex > products?.record?.length
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
      </div>
    </div>
  );
}
