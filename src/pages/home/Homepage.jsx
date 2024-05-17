import { Button } from "@/components/ui/button";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiShieldCheckLight } from "react-icons/pi";
import { MdCurrencyExchange } from "react-icons/md";
import { SlLink } from "react-icons/sl";

import SliderProduct from "@/components/Slider/SliderProduct";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Homepage() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    document.title = "Trang sức thời trang DMC-Group";
  });
  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get("http://127.0.0.1:9999/product")
        .then((res) => setProduct(res.data.record))
        .catch((err) => console.log(err));
    };
    getProduct();
  }, []);
  const menuCategory = [
    {
      name: "Đồng hồ",
      linkImg: "/public/watch-category.jpg",
      navTo: "dong-ho",
    },
    {
      name: "Vòng tay",
      linkImg:
        "/public/category-vong-tay.png",
      navTo: "vong-tay",
    },
    {
      name: "Dây chuyền",
      linkImg: "/public/category-vong-day-chuyen.png",
      navTo: "day-chuyen",
    },
    {
      name: "Nhẫn",
      linkImg: "/public/category-nhan.png",
      navTo: "nhan",
    },
    
  ];
  
  function getRandomProduct(arr, count) {
    const shuffled = arr.slice();
    const result = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * shuffled.length);
      const selectedMonth = shuffled.splice(randomIndex, 1)[0];

      result.push(selectedMonth);
    }

    return result;
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex flex-col justify-between p-20">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-5xl font-bold">DMC JEWELRY</h1>
            <h3 className="italic text-sm text-gray-500">
              Thời Gian và Phong Cách - Nâng Tầm Vẻ Đẹp Của Bạn
            </h3>
          </div>
          <Button className="rounded-none flex gap-2 items-center">
            Shop now
            <SlLink />
          </Button>
        </div>
        <img
          src="/public/Home-Banner.jpg"
          alt="banner"
          className="col-span-2"
          loading="lazy"
        />
      </div>

      <div className="grid grid-cols-4 h-[400px]">
        {menuCategory?.map((item, index) => (
          <div
            onClick={() => navigate(`/product/${item?.navTo}`)}
            key={index}
            className="flex flex-col gap-2 p-15 border justify-center items-center cursor-pointer transition ease-in-out duration-500 h-full"
          >
            <img
              src={item?.linkImg}
              alt={item?.name}
              className="h-2/3 w-auto object-contain object-center hover:scale-110"
              loading="lazy"
            />
            <h3 className="text-sm font-medium">{item?.name}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 h-[500px] overflow-hidden">
        <div className="flex h-full flex-col justify-end gap-3 uppercase text-white text-center col-span-1 py-10 bg-[url('https://curnonwatch.com/wp-content/uploads/2024/01/ANN_8320-scaled-e1705382605890.jpg')] bg-center bg-cover hover:scale-105 transition duration-300 relative">
          <h1 className="text-2xl font-bold ">Đồng hồ nam</h1>
          <h1 className="underline font-semibold cursor-pointer">Shop now</h1>
        </div>
        <div className="flex h-full flex-col justify-end gap-3 uppercase text-white text-center col-span-1 py-10 bg-[url('https://curnonwatch.com/wp-content/uploads/2024/01/03-01-2023-01-20-23.jpg-scaled-e1705383014771.jpg')] bg-center bg-cover hover:scale-105 transition duration-300 relative">
          <h1 className="text-2xl font-bold ">Đồng hồ nữ</h1>
          <h1 className="underline font-semibold cursor-pointer">Shop now</h1>
        </div>
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

      <SliderProduct title={"BEST SELLER"} />

      <div className="grid grid-cols-3 border-[1px]">
        <div className="p-10 w-full flex flex-col justify-end">
          <h1 className="font-bold text-3xl uppercase">NEW COLLECTION</h1>
          <h3 className="text-sm text-[#868382]">
            Với những sản phẩm được thiết kế bằng nhiệt huyết, khát khao và khối
            óc đầy sáng tạo của đội ngũ chính những người trẻ Việt Nam, chúng
            tôi tin rằng tinh thần “Why not” ấy sẽ luôn đồng hành và truyền cảm
            hứng cho bạn mỗi ngày.
          </h3>
        </div>
        <img
          src="/public/home-colecttion-1.jpg"
          alt=""
        />
        <img
          src="/public/home-colection-2.jpg"
          alt=""
        />
        <img
          src="/public/home-colection-3.jpg"
          alt=""
        />
        <img
          src="/public/home-colection-4.jpg"
          alt=""
        />
        <div className="flex items-end justify-end p-10 cursor-pointer">
          <h1 className="underline uppercase font-semibold">
            Show all collection
          </h1>
        </div>
      </div>

      <div className="mx-80 py-32 flex items-center justify-center h-full">
        <h1 className="font-medium text-2xl text-center">
          “Chúng tôi muốn mang tới một nguồn cảm hứng, một sự thay đổi về tư
          duy, về suy nghĩ và chính những cái chúng tôi gọi là trải nghiệm cho
          người trẻ.”
        </h1>
      </div>

      <div className="grid grid-cols-2">
        <div className="grid grid-cols-2 bottom-[1px]">
          {getRandomProduct(product, 4)?.map((item, index) => (
            <div
              className={`relative bg-cover bg-center flex items-end p-5 border-gray-950`}
              key={index}
              style={{ backgroundImage: `url(${item?.images[0]})` }}
            >
              <div className="flex items-end p-5 gap-2 opacity-0 absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 hover:opacity-100 cursor-pointer" onClick={() => navigate(`/${item?.path_product}`)} >
                <div className="relative z-10 flex flex-col gap-2 text-white">
                  <h1 className="font-medium text-lg">{item?.category}</h1>
                  <h1 className="text-sm">
                    {parseInt(item?.price).toLocaleString("vi-VN")} VND
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <img
          src="/public/home-girl.jpg"
          alt=""
        />
      </div>
      
    </div>
  );
}
