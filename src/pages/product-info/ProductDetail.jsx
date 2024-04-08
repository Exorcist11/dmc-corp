import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Ratings } from "@/components/ui/rating";
import { useEffect } from "react";
import { SlHeart } from "react-icons/sl";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiShieldCheckLight } from "react-icons/pi";
import { MdCurrencyExchange } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { LiaCartPlusSolid } from "react-icons/lia";

export default function ProductDetail() {
  useEffect(() => {
    document.title = "Rise - Cửa hàng trang sức DMC-Group";
  });
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="flex flex-col">
      <div className="px-10 py-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-2 px-10 gap-3 mb-5">
        <div className="col-span-1 grid grid-cols-2 gap-4">
          <img
            src="https://curnonwatch.com/wp-content/uploads/2024/02/G.Rise1111.png"
            alt=""
            className="object-cover object-center"
          />
          <img
            src="https://curnonwatch.com/wp-content/uploads/2024/02/ANN_8626-e1708398277706.jpg"
            alt=""
            className="object-cover object-center"
          />
          <img
            src="https://curnonwatch.com/wp-content/uploads/2024/02/ANN_8626-e1708398277706.jpg"
            alt=""
            className="object-cover object-center"
          />
          <img
            src="https://curnonwatch.com/wp-content/uploads/2024/02/ANN_8626-e1708398277706.jpg"
            alt=""
            className="object-cover object-center"
          />
          <img
            src="https://curnonwatch.com/wp-content/uploads/2024/02/ANN_8626-e1708398277706.jpg"
            alt=""
            className="object-cover object-center"
          />
          <img
            src="https://curnonwatch.com/wp-content/uploads/2024/02/ANN_8626-e1708398277706.jpg"
            alt=""
            className="object-cover object-center"
          />
        </div>

        <div className="row-span-1 px-10 flex flex-col gap-3">
          <div className="border-b pb-3 gap-2 flex flex-col">
            <h1 className="text-7xl font-bold">Rise</h1>
            <div className="flex gap-2 items-center">
              <Ratings
                rating={4.5}
                totalstars={5}
                size={14}
                fill={true.toString()}
                variant="default"
              />
              <h1>4.5</h1>
              <h1
                className="text-[#908fa4] text-sm underline cursor-pointer"
                onClick={() => {
                  const reviewSection =
                    document.getElementById("review-section");
                  if (reviewSection) {
                    window.scrollTo({
                      top: reviewSection.offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                See review
              </h1>
            </div>
            <h1>2.123.456 VND</h1>
          </div>

          <div className="border-b pb-3 gap-4 flex flex-col">
            <div className="grid grid-cols-3">
              <h1>Kích thước mặt:</h1>
              <div className="border font-semibold text-black w-20 flex items-center justify-center text-sm">
                40mm
              </div>
              <Dialog>
                <DialogTrigger>
                  <h1 className="uppercase underline text-sm cursor-pointer hover:font-medium text-right">
                    Bảng kích cỡ
                  </h1>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  Size of product
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-3">
              <h1>Chất liệu:</h1>
              <div className="border font-semibold text-black w-20 flex items-center justify-center text-sm">
                Saphire
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button className="rounded-none">Thanh toán ngay</Button>
              <div className="flex items-center gap-5">
                <Button
                  className="rounded-none w-11/12 border-black"
                  variant="outline"
                >
                  Thêm giỏ hàng
                </Button>
                <SlHeart size={30} />
              </div>
            </div>
            <div className="text-sm text-[#807d7c] flex flex-col gap-2">
              <div className="flex  gap-2 items-center">
                <PiShieldCheckLight />
                Bảo hành 10 năm
              </div>
              <div className="flex gap-2 items-center">
                <MdCurrencyExchange />
                Miễn phí đổi trả trong vòng 3 ngày
              </div>
              <div className="flex  gap-2 items-center">
                <LiaShippingFastSolid />
                FREE SHIPPING đơn hàng &gt; 700K
              </div>
              <div className="flex  gap-2 items-center">
                <SlBadge />
                Cam kết chính hãng 100% (Bồi thường 500% nếu phát hiện hàng giả)
              </div>
            </div>
          </div>

          <div className="border-b pb-3 gap-2 flex flex-col">
            <h1 className="uppercase font-semibold">Thông tin chi tiết</h1>
          </div>
          <div className="border-b pb-3 gap-2 flex flex-col py-4 justify-center items-center text-sm ">
            <p>
              Đồng hồ nam Curnon Kashmir Rise mang vẻ đẹp cuốn hút, mạnh mẽ, đầy
              nam tính của người đàn ông; Dây kim loại, Mặt kính Sapphire chống
              trầy xước, Chống nước 3ATM…
            </p>
          </div>
          <Tabs defaultValue="shipping" className="w-full mb-5">
            <div className="border-b gap-2 flex flex-col">
              <TabsList className="grid w-full grid-cols-3 bg-white">
                <TabsTrigger
                  value="shipping"
                  className="data-[state=active]:border-b-2 ease-in-out duration-200 rounded-none border-black data-[state=active]:shadow-none data-[state=active]:rounded-none "
                >
                  Vận chuyển
                </TabsTrigger>
                <TabsTrigger
                  value="buy"
                  className="data-[state=active]:border-b-2 ease-in-out duration-200 rounded-none border-black data-[state=active]:shadow-none data-[state=active]:rounded-none "
                >
                  Thanh toán
                </TabsTrigger>
                <TabsTrigger
                  value="return"
                  className="data-[state=active]:border-b-2 ease-in-out duration-200 rounded-none border-black data-[state=active]:shadow-none data-[state=active]:rounded-none "
                >
                  Đổi trả bảo hành
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="shipping" className="text-sm">
              <Card className="border-none shadow-none">
                <CardContent className="space-y-2 py-3 ">
                  <h1 className="font-medium">Phí vận chuyển:</h1>

                  <li className="ml-5">
                    <label htmlFor="" className="uppercase font-semibold">
                      Miễn phí vận chuyển
                    </label>{" "}
                    với đơn hàng 700,000đ trở lên
                  </li>
                  <li className="ml-5">
                    <label htmlFor="" className="uppercase font-semibold">
                      30,000đ
                    </label>{" "}
                    với đơn hàng &lt; 700,000đ
                  </li>
                  <h1 className="font-medium">Thời gian vận chuyển:</h1>
                  <li className="ml-5">Nội thành Hà Nội: 1-2 ngày</li>
                  <li className="ml-5">Miền Trung: 3-5 ngày</li>
                  <li className="ml-5">Miền Nam: 5-7 ngày</li>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="buy" className="text-sm">
              <Card className="border-none shadow-none">
                <CardContent className="space-y-2 py-3 ">
                  <h1 className="font-medium">Hình thức thanh toán:</h1>
                  <li className="ml-5">Thanh toán khi nhận hàng</li>
                  <li className="ml-5">Thanh toán online qua ngân hàng</li>
                  <li className="ml-5">Thanh toán online qua VN-Pay</li>
                  <h1 className="font-medium">Hotline liên hệ:</h1>
                  <li className="ml-5">
                    ĐT/Zalo: 0919934251 - Nguyễn Xuân Dũng
                  </li>
                  <li className="ml-5">
                    Facebook:{" "}
                    <a
                      htmlFor="facebook"
                      className="cursor-pointer hover:text-blue-700"
                      target="_blank"
                      href="https://www.facebook.com/D.Exorcist.09/"
                    >
                      https://www.facebook.com/D.Exorcist.09/
                    </a>
                  </li>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="return" className="text-sm">
              <Card className="border-none shadow-none">
                <CardContent className="space-y-2 py-3 ">
                  <h1 className="font-medium">Chính sách bảo hành:</h1>
                  <li className="ml-5">
                    <label htmlFor="" className="uppercase font-semibold">
                      hoàn tiền 500%
                    </label>{" "}
                    nếu phát hiện hàng giả
                  </li>
                  <li className="ml-5">
                    <label htmlFor="" className="uppercase font-semibold">
                      Miễn phí
                    </label>{" "}
                    đổi trả trong vòng 3 ngày
                  </li>
                  <li className="ml-5">
                    <label htmlFor="" className="uppercase font-semibold">
                      Đổi mới 1-1
                    </label>{" "}
                    nếu lỗi từ nhà sản xuất
                  </li>
                  <h1 className="font-medium">Hotline liên hệ:</h1>
                  <li className="ml-5">
                    ĐT/Zalo: 0919934251 - Nguyễn Xuân Dũng
                  </li>
                  <li className="ml-5">
                    Facebook:{" "}
                    <a
                      htmlFor="facebook"
                      className="cursor-pointer hover:text-blue-700"
                      target="_blank"
                      href="https://www.facebook.com/D.Exorcist.09/"
                    >
                      https://www.facebook.com/D.Exorcist.09/
                    </a>
                  </li>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="bg-[#ecebea] h-14 grid grid-cols-3" id="review-section">
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

      <div className="flex flex-col gap-5 px-16 py-10 border-b">
        <Carousel className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl uppercase font-semibold">
              Đánh giá của khách hàng
            </h1>
            <div className="flex gap-3 items-center">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <Card className="h-56 bg-[#f9f7f5]">
                  <CardContent className="p-6 flex flex-col gap-3 ">
                    <Ratings
                      rating={4.5}
                      totalstars={5}
                      size={14}
                      fill={true.toString()}
                      variant="yellow"
                    />
                    <h1 className="font-bold">Amazing</h1>
                    <p className="text-sm">
                      Với mặt số tối giản, chiếc đồng hồ này dễ dàng kết hợp với
                      nhiều phong cách trang phục khác nhau, tạo sự linh hoạt
                      cho người sử dụng.
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <h3 className="font-medium">Nguyễn Xuân Dũng</h3>
                      <h3 className="text-[#807d7c]">28/09/2023</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex flex-col gap-5 px-16 py-10 border-b">
        <Carousel plugins={[plugin.current]} className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl uppercase font-semibold">Sản phẩm mới</h1>
            <div className="flex gap-3 items-center">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>

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
      </div>
    </div>
  );
}