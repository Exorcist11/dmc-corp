import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function FavoriteProduct() {
  const [product, setProduct] = useState([]);
  const rowPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowPerPage);
  const account = JSON.parse(localStorage.getItem("account"));

  useEffect(() => {
    document.title = "Sản phẩm yêu thích";
  });

  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get(
          `http://127.0.0.1:9999/get_wish_list/${account.account_id}`
        )
        .then((res) => setProduct(res.data.record))
        .catch((err) => console.log(err));
    };
    getProduct();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-semibold">Danh sách sản phẩm yêu thích</h1>
        <div className="grid grid-cols-5 gap-2 text-sm mt-3">
          {product?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 cursor-pointer"
              onClick={() => navigate(`/${item?.path_product}`)}
            >
              <img
                src={item?.image}
                className="w-40 h-40 object-cover object-center"
              />
              <h1 className="font-semibold">{item?.product_name}</h1>
              <h1>{parseInt(item?.price).toLocaleString("vi-VN")} VND</h1>
            </div>
          ))}
        </div>
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
                endIndex > product.length
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
