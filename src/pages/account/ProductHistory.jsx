import { Ratings } from "@/components/ui/rating";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ProductHistory() {
  const [order, setOrder] = useState([]);
  const rowPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowPerPage);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `http://127.0.0.1:9999/get_product_bought/${localStorage.getItem(
            "user_id"
          )}`
        )
        .then((res) => setOrder(res.data.record))
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

  useEffect(() => {
    document.title = "Sản phẩm đã mua";
  });

  return (
    <div className="flex flex-col gap-1 justify-between h-full">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Sản phẩm đã mua</h1>
        <div className="flex flex-col gap-2">
          {order?.slice(startIndex, endIndex).map((item, index) => (
            <div className="border" key={index}>
              <div className="flex gap-4 p-1">
                <img
                  className="w-28 h-28 object-cover object-center"
                  src={item?.image}
                />
                <div className="w-4/5">
                  <div className="flex justify-between items-center">
                    <h1 className="font-medium">{item?.product_name}</h1>
                    <Ratings
                      rating={0}
                      totalstars={5}
                      size={14}
                      fill={true.toString()}
                      variant="yellow"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <h1 className="text-sm">{item?.category}</h1>
                    <h1 className="text-sm">{item?.time}</h1>
                  </div>
                </div>
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
                endIndex > order.length
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
