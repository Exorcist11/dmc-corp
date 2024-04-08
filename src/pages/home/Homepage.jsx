import { Button } from "@/components/ui/button";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiShieldCheckLight } from "react-icons/pi";
import { MdCurrencyExchange } from "react-icons/md";
import { SlLink } from "react-icons/sl";

import SliderProduct from "@/components/Slider/SliderProduct";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const menuCategory = [
    {
      name: "Đồng hồ",
      linkImg: "https://curnonwatch.com/wp-content/uploads/2024/03/1-1.jpg",
      navTo: "/product/watch",
    },
    {
      name: "Vòng tay",
      linkImg:
        "https://curnonwatch.com/wp-content/uploads/2024/03/Vo%CC%80ng-tay-1.png",
      navTo: "",
    },
    {
      name: "Dây chuyền",
      linkImg: "https://curnonwatch.com/wp-content/uploads/2024/03/4.png",
      navTo: "",
    },
    {
      name: "Nhẫn",
      linkImg: "https://curnonwatch.com/wp-content/uploads/2024/03/5.png",
      navTo: "",
    },
    {
      name: "Quà tặng",
      linkImg: "https://curnonwatch.com/wp-content/uploads/2024/03/6.png",
      navTo: "",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex flex-col justify-between p-20">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-5xl ">DMC DIAMOND</h1>
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
          src="https://curnonwatch.com/wp-content/uploads/2024/03/14-1.jpg"
          alt="banner"
          className="col-span-2"
          loading="lazy"
        />
      </div>

      <div className="grid grid-cols-5 h-80">
        {menuCategory?.map((item, index) => (
          <div
            onClick={() => navigate(`${item?.navTo}`)}
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
          src="https://curnonwatch.com/wp-content/uploads/2024/01/Cover-1-2048x2048.jpg"
          alt=""
        />
        <img
          src="https://curnonwatch.com/wp-content/uploads/2024/01/design_all-ngang-scaled-e1705391247827.jpg"
          alt=""
        />
        <img
          src="https://curnonwatch.com/wp-content/uploads/2024/01/IG.jpg"
          alt=""
        />
        <img
          src="https://curnonwatch.com/wp-content/uploads/2024/01/Cover-1-SJ-scaled-e1705391904636.jpg"
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
          <img
            src="https://curnonwatch.com/wp-content/uploads/2024/02/Everly-white-silver-2-1.jpg"
            alt=""
          />
          <img
            src="https://curnonwatch.com/wp-content/uploads/2024/02/Ellen-SIDE4363.png"
            alt=""
          />
          <img
            src="https://curnonwatch.com/wp-content/uploads/2024/02/Eleni4563773.png"
            alt=""
          />
          <img
            src="https://curnonwatch.com/wp-content/uploads/2024/02/T2-6-min.76545.png"
            alt=""
          />
        </div>
        <img
          src="https://curnonwatch.com/wp-content/uploads/2024/01/ANN9861-scaled-e1705394776499.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
