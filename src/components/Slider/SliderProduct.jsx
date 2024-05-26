import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { LiaCartPlusSolid } from "react-icons/lia";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import toast from "react-hot-toast";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SliderProduct({ title }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [path, setPath] = React.useState("best");
  const [records, setRecord] = React.useState([]);
  const navigate = useNavigate();
  const elements = [
    { name: "Tất cả", value: "best" },
    { name: "Đồng hồ", value: "dong-ho" },
    { name: "Vòng tay", value: "vong-tay" },
    { name: "Dây chuyền", value: "day-chuyen" },
    { name: "Nhẫn", value: "nhan" },
  ];
  const account = JSON.parse(localStorage.getItem("account"));
  const getProduct = React.useCallback(async () => {
    if (path === "best") {
      await axios
        .get(`http://127.0.0.1:9999/product`)
        .then((res) => setRecord(res.data.record))
        .catch((error) => console.log(error));
    } else {
      await axios
        .get(`http://127.0.0.1:9999/product_by_category/${path}`)
        .then((res) => setRecord(res.data.record))
        .catch((err) => console.log(err));
    }
  }, [path]);

  React.useEffect(() => {
    getProduct();
  }, [path, getProduct]);

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
    <Tabs
      defaultValue="best"
      className="w-full"
      onValueChange={(value) => setPath(value)}
    >
      <div className="px-10">
        <div className="py-10 flex justify-between items-center">
          <h1 className="font-bold uppercase text-2xl">{title}</h1>

          <div>
            <TabsList>
              {elements?.map((item, index) => (
                <TabsTrigger value={item?.value} key={index}>
                  <div className="rounded-full uppercase">
                    <h1>{item?.name}</h1>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <TabsContent value={path}>
          <Carousel
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="h-full">
              {records.map((item, index) => (
                <CarouselItem key={index} className="basis-1/4 h-[500px]">
                  <div className="flex flex-col gap-3 justify-center group">
                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow ">
                      <div className="h-96">
                        <img
                          className="h-full w-full object-cover transition-transform duration-500  group-hover:scale-105 object-center"
                          src={path !== "best" ? item.images : item.images[0]}
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

                    <div className="text-sm flex flex-col gap-3">
                      <h1
                        className="font-semibold hover:opacity-75 cursor-pointer"
                        onClick={() => navigate(`/${item?.path_product}`)}
                      >
                        {item.product_name}
                      </h1>
                      <h1>
                        {parseInt(item?.price).toLocaleString("vi-VN")} VND
                      </h1>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </TabsContent>
      </div>
    </Tabs>
  );
}
