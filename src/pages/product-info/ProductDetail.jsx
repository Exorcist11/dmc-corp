import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Ratings } from "@/components/ui/rating";
import { useEffect, useState } from "react";
import { SlHeart } from "react-icons/sl";
import { VscHeartFilled } from "react-icons/vsc";
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [favorite, setFavorite] = useState({
    status: "",
    action: "",
  });
  let defaultCart = [];
  const [reviews, setReviews] = useState([]);
  const account = JSON.parse(localStorage.getItem("account"));

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Rise - Cửa hàng trang sức DMC-Group";
    window.scrollTo(top);
  });
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const { path_product } = useParams();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:9999/product_by_path/${path_product}`
        );
        setProduct(response.data.record);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, [path_product]);

  useEffect(() => {
    const getNewProduct = async () => {
      await axios
        .get("http://127.0.0.1:9999/product")
        .then((res) => setNewProduct(res.data.record))
        .catch((err) => console.log(err));
    };
    getNewProduct();
  }, []);

  useEffect(() => {
    const getReview = async () => {
      await axios
        .get(`http://127.0.0.1:9999/get_review/${product.product_id}`)
        .then((res) => setReviews(res.data.record))
        .catch((err) => console.log(err));
    };
    getReview();
  }, [product.product_id]);

  useEffect(() => {
    const getFavorite = async () => {
      await axios
        .post("http://127.0.0.1:9999/favorite_product", {
          account_id: account?.account_id,
          product_id: product?.product_id,
        })
        .then((res) => setFavorite(res.data));
    };
    getFavorite();
  }, [product?.product_id]);

  const handleRemoteFavorite = async (product_id) => {
    await axios
      .post("http://127.0.0.1:9999/delete_wish_list", {
        account_id: account?.account_id,
        product_id: product_id,
      })
      .then(() => setFavorite({ ...favorite, action: false }))
      .then(() =>
        toast("Đã xoá sản phẩm khỏi yêu thích!", {
          icon: "⭕",
        })
      )
      .catch((err) => console.log(err));
  };

  const handleAddFavorite = async (product_id) => {
    if (account) {
      await axios
        .post("http://127.0.0.1:9999/add_to_wishlist", {
          account_id: account?.account_id,
          product_id: product_id,
        })
        .then(() => setFavorite({ ...favorite, action: true }))
        .then(() => toast.success("Đã thêm sản phẩm vào yêu thích!"))
        .catch((err) => console.log(err));
    } else {
      alert("hekpo");
    }
  };

  const handleBuy = async (product_id, account_id) => {
    await axios
      .post("http://127.0.0.1:9999/add_to_cart", { product_id, account_id })
      .then(() => {
        navigate("/order/product");
      })
      .catch((err) => console.log(err));
  };

  const handleAddCart = async (product_id) => {
    if (account) {
      const account_id = account.account_id;
      await axios
        .post("http://127.0.0.1:9999/add_to_cart", { product_id, account_id })
        .then(() => {
          toast.success("Thêm mới sản phẩm thành công!");
        })
        .catch((err) => console.log(err));
    } else {
      let storage = localStorage.getItem("cart");
      if (storage) {
        defaultCart = JSON.parse(storage);
      }

      let item = defaultCart.find((c) => c.product.product_id === product_id);
      if (item) {
        item.quantity += 1;
      } else {
        defaultCart.push({ product: product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(defaultCart));
    }
  };
  // localStorage.removeItem("cart");

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
              <BreadcrumbLink href={`/product/${product?.path_category}`}>
                {product?.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{product?.product_name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-2 px-10 gap-3 mb-5">
        <div className="col-span-1 grid grid-cols-2 gap-4 grid-rows-3">
          {product.images ? (
            product.images.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                className="object-cover object-center h-full border"
              />
            ))
          ) : (
            <img
              src="https://curnonwatch.com/wp-content/uploads/2024/02/G.Rise1111.png"
              alt=""
              className="object-cover object-center h-full"
            />
          )}
        </div>

        <div className="row-span-1 px-10 flex flex-col gap-3">
          <div className="border-b pb-3 gap-2 flex flex-col">
            <h1 className="text-[#807da2]">{product?.category}</h1>
            <h1 className="text-6xl font-bold">{product?.product_name}</h1>
            <div className="flex gap-2 items-center">
              <Ratings
                rating={product?.rate ? product.rate : 0}
                totalstars={5}
                size={14}
                fill={true.toString()}
                variant="default"
              />
              <h1>{product?.rate}</h1>
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
            <h1>{parseInt(product?.price).toLocaleString("vi-VN")} VND</h1>
          </div>

          <div className="border-b pb-3 gap-4 flex flex-col">
            <div className="grid grid-cols-3">
              <h1>Kích thước:</h1>
              <div className="border font-semibold text-black w-20 flex items-center justify-center text-sm">
                {product.size}
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
                {product.material}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <h1>Xuất xứ:</h1>
              <div className="w-20 flex items-center justify-center text-sm">
                {product.nation}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                className="rounded-none"
                onClick={() =>
                  handleBuy(product.product_id, account.account_id)
                }
              >
                Thanh toán ngay
              </Button>
              <div className="flex items-center gap-5">
                <Button
                  className="rounded-none w-11/12 border-black"
                  variant="outline"
                  onClick={() => handleAddCart(product.product_id)}
                >
                  Thêm giỏ hàng
                </Button>
                {favorite?.action === true ? (
                  <VscHeartFilled
                    size={30}
                    className="cursor-pointer"
                    onClick={() => handleRemoteFavorite(product?.product_id)}
                  />
                ) : (
                  <SlHeart
                    size={30}
                    className="cursor-pointer"
                    onClick={() => handleAddFavorite(product?.product_id)}
                  />
                )}
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
            <MdEditor
              style={{ height: "auto", border: "none" }}
              renderHTML={(text) => mdParser.render(text)}
              value={product.description_markdown}
              view={{ menu: false, md: false, html: true }}
            />
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

      {reviews.length > 0 ? (
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
              {reviews.map((item, index) => (
                <CarouselItem key={index} className="basis-1/4">
                  <Card className="h-56 bg-[#f9f7f5]">
                    <CardContent className="p-6 flex flex-col gap-3 justify-between h-full">
                      <div className="flex flex-col gap-3">
                        <Ratings
                          rating={item.rate}
                          totalstars={5}
                          size={14}
                          fill={true.toString()}
                          variant="yellow"
                        />
                        <h1 className="font-bold">{item.title}</h1>
                      </div>
                      <p className="text-sm">{item?.content}</p>
                      <div className="flex justify-between items-center text-xs">
                        <h3 className="font-medium">{item?.username}</h3>
                        <h3 className="text-[#807d7c]">{item?.time}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : (
        ""
      )}

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
            {newProduct?.map((item, index) => (
              <CarouselItem key={index} className="basis-1/4 h-[500px]">
                <div className="flex flex-col gap-3 justify-center group">
                  <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow ">
                    <div className="h-96">
                      <img
                        className="h-full w-full object-cover transition-transform duration-500  group-hover:scale-105 object-center"
                        src={item?.images[0]}
                        alt={item?.product_name}
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
                    <h1
                      className="font-semibold hover:opacity-75 cursor-pointer"
                      onClick={() => navigate(`/${item?.path_product}`)}
                    >
                      {item?.product_name}
                    </h1>
                    <h1>{parseInt(item.price).toLocaleString("vi-VN")} VND</h1>
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
