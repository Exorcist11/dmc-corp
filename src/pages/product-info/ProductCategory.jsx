import { BsPlusLg } from "react-icons/bs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlEqualizer, SlShuffle } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      if (path) {
        axios
          .get(`http://127.0.0.1:9999/product_by_category/${path}`)
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

  const menus = [
    { name: "Đồng hồ", path: "/" },
    { name: "Vòng tay", path: "/" },
    { name: "Đồng hồ", path: "/" },
    { name: "Đồng hồ", path: "/" },
    { name: "Đồng hồ", path: "/" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-5 px-10 h-full">
        <div className="col-span-1 border-r flex flex-col gap-3 py-5 h-full">
          <h1 className="uppercase font-semibold text-xl">Danh mục</h1>
          <div className="uppercase flex flex-col gap-3 text-sm px-5">
            {menus?.map((item, index) => (
              <div
                className="flex justify-between items-center cursor-pointer "
                key={index}
              >
                <h1 className="">{item?.name}</h1>
                <BsPlusLg color="#656c77" size={17} />
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 col-span-4 flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink>Sản phẩm</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{products?.category}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

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
                    className="flex flex-col gap-2 cursor-pointer"
                    key={index}
                    onClick={() => navigate(`/${item?.path_product}`)}
                  >
                    <img
                      src={
                        item.images
                          ? item?.images
                          : "https://curnonwatch.com/wp-content/uploads/2024/02/1_Brown4.876543.png"
                      }
                      alt=""
                      className="object-cover object-center h-[360px]"
                    />
                    <h1 className="font-semibold">{item?.product_name}</h1>
                    <h1 className="">
                      {parseInt(item?.price).toLocaleString("vi-VN")} VND
                    </h1>
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
