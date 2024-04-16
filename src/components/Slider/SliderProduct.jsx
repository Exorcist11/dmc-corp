import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { LiaCartPlusSolid } from "react-icons/lia";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SliderProduct({ title }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const navigate = useNavigate();
  return (
    <Tabs defaultValue="best" className="w-full">
      <div className="px-10">
        <div className="py-10 flex justify-between items-center">
          <h1 className="font-bold uppercase text-2xl">{title}</h1>

          <div>
            <TabsList>
              <TabsTrigger value="best">
                <div className="rounded-full uppercase">
                  <h1>Tất cả</h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="watch">
                <div className="rounded-full uppercase">
                  <h1>Đồng hồ</h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="bracelet">
                <div className="rounded-full uppercase">
                  <h1>Vòng tay</h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="chain">
                <div className="rounded-full uppercase">
                  <h1>Dây chuyền</h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="ring">
                <div className="rounded-full uppercase">
                  <h1>Nhẫn</h1>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="best">
          <Carousel
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="h-full">
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/4 h-[500px]">
                  <div className="flex flex-col gap-3 justify-center group">
                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow ">
                      <div className="h-96">
                        <img
                          className="h-full w-full object-cover transition-transform duration-500  group-hover:scale-105 object-center"
                          src="https://curnonwatch.com/wp-content/uploads/2024/03/FRONT-Kim-Ngu%CC%9Bu-2048x2048.jpg"
                          alt=""
                        />
                      </div>
                      {/* Đổi img */}
                      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent  group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div> */}
                      <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-end px-9 text-center transition-all duration-300 group-hover:translate-y-0 pb-5 font-semibold">
                        <button className="rounded-full bg-white  hover:shadow text-black py-2 px-3.5 font-com text-xs capitalize flex gap-1 justify-center items-center">
                          Thêm vào giỏ hàng <LiaCartPlusSolid size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="text-sm flex flex-col gap-3">
                      <h1 className="font-semibold hover:opacity-75 cursor-pointer">
                        Zodiac
                      </h1>
                      <h1>124.000 VND</h1>
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
