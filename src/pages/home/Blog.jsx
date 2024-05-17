import Autoplay from "embla-carousel-autoplay";
import React, { useEffect } from "react";
import { CiCalendar, CiUser } from "react-icons/ci";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  useEffect(() => {
    document.title = 'Tin tức sản phẩm'
  })
  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <img
          src="/public/bannerBlog.png"
          alt=""
          className="object-center object-fill h-[300px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex justify-center items-center text-center flex-col gap-3 text-white px-44">
          <img
            src="/public/whynotLogo.svg"
            alt=""
            className="h-[115px] w-96 text-sm"
          />
          <h1>
            Với mục đích truyền cảm hứng đến cho các bạn trẻ, đây là nơi tâm sự,
            trò chuyện, chia sẻ những điều người trẻ đang trăn trở, những câu
            chuyện truyền cảm hứng mang tinh thần &quot;Why not?&quot;, với hy
            vọng giúp các bạn thay đổi cách nhìn cũng như cách giải quyết mọi
            vấn đề trong cuộc sống.
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <h1
          className="text-3xl font-me
         uppercase"
        >
          Bài viết gần đây
        </h1>
      </div>
      <div className="px-10 flex justify-center flex-col items-center gap-5">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-full">
            <CarouselItem className="basis-1/3 cursor-pointer">
              <div className="flex flex-col gap-3">
                <img
                  src="https://curnonwatch.com/blog/wp-content/uploads/2023/03/streetwear-la-gi-500x300.jpg"
                  alt=""
                />
                <h1 className="text-xl">
                  Street Wear Là Gì? Mix & Match Phong Cách Streetwear 2023
                </h1>
                <div className="text-sm flex items-center gap-2">
                  <CiCalendar />
                  <h1>March 23, 2023</h1>
                  <CiUser />
                  <h1>Dũng Nguyễn</h1>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <div className="flex flex-col gap-3">
                <img
                  src="https://curnonwatch.com/blog/wp-content/uploads/2023/03/streetwear-la-gi-500x300.jpg"
                  alt=""
                />
                <h1 className="text-xl">
                  Street Wear Là Gì? Mix & Match Phong Cách Streetwear 2023
                </h1>
                <div className="text-sm flex items-center gap-2">
                  <CiCalendar />
                  <h1>March 23, 2023</h1>
                  <CiUser />
                  <h1>Dũng Nguyễn</h1>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <div className="flex flex-col gap-3">
                <img
                  src="https://curnonwatch.com/blog/wp-content/uploads/2023/03/streetwear-la-gi-500x300.jpg"
                  alt=""
                />
                <h1 className="text-xl">
                  Street Wear Là Gì? Mix & Match Phong Cách Streetwear 2023
                </h1>
                <div className="text-sm flex items-center gap-2">
                  <CiCalendar />
                  <h1>March 23, 2023</h1>
                  <CiUser />
                  <h1>Dũng Nguyễn</h1>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div>
          <Button>Xem tất cả</Button>
        </div>
      </div>

      <div className="flex justify-center flex-col items-center py-10 gap-3 text-sm">
        <h1
          className="text-3xl font-me
         uppercase"
        >
          BE PART OF LIFE
        </h1>
        <h1>
          &quot;Đời người chỉ sống có một lần. Phải sống sao cho khỏi xót xa ân
          hận vì những năm tháng đã sống hoài sống phí&quot;
        </h1>
        <h1>- Nikolai Alexeevich Ostrovsky - Thép đã tôi thế đấy</h1>
      </div>
    </div>
  );
}
