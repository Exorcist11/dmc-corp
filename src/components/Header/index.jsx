import { SlUser, SlBag, SlMagnifier } from "react-icons/sl";

import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import Cart from "../Cart/Cart";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import CartNotLogin from "../Cart/CartNotLogin";

export default function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const account = JSON.parse(localStorage.getItem("account"));
  const menus = [
    { name: "Đồng hồ", link: "dong-ho" },
    { name: "Vòng tay", link: "vong-tay" },
    { name: "Dây chuyền", link: "day-chuyen" },
    { name: "Nhẫn", link: "nhan" },
  ];

  return (
    <Sheet>
      <div className="h-20 flex justify-between items-center px-10 border-b-[1px] border-gray-300 flex-shrink-0 fixed top-0 z-30 left-0 right-0 bg-white w-screen">
        <div className="text-xl cursor-pointer" onClick={() => navigate("/")}>
          DMC-Corp
        </div>

        <div>
          <div className="flex uppercase gap-7 list-none w-full font-semibold text-sm">
            <div
              className="cursor-pointer uppercase  hover:font-semibold"
              onClick={() => navigate("/product/best-seller")}
            >
              Best Seller
            </div>

            <HoverCard openDelay={0}>
              <HoverCardTrigger>
                <div className="cursor-pointer uppercase  hover:font-semibold">
                  Trang sức
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col items-center w-screen mt-5">
                <div>
                  {menus.map((item, index) => (
                    <div key={index}>
                      <div
                        className="hover:bg-slate-300 cursor-pointer w-[500px] text-center py-3 px-2"
                        onClick={() => navigate(`/product/${item.link}`)}
                      >
                        {item.name}
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>

            <div
              className="cursor-pointer uppercase  hover:font-semibold"
              onClick={() => navigate("/blog")}
            >
              Blog
            </div>

            <div
              className="cursor-pointer uppercase "
              onClick={() => navigate("/about-us")}
            >
              Về chúng tôi
            </div>
          </div>
        </div>

        <div className="flex gap-7 uppercase">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <SlMagnifier />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tìm kiếm</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-screen flex flex-col justify-center items-center mt-5">
              <DropdownMenuLabel>Tìm kiếm sản phẩm</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="w-3/4">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nhập tên sản phẩm tìm kiếm"
                  className="text-center"
                />
              </div>
              <DropdownMenuItem className="my-4">
                <Button onClick={() => navigate(`/search?value=${search}`)}>
                  Tìm kiếm
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              account ? navigate(`/account`) : navigate("/login")
            }
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <SlUser />
                </TooltipTrigger>
                <TooltipContent>
                  {!account ? <h1>Đăng nhập</h1> : <h1>Tài khoản</h1>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <SheetTrigger className="flex gap-2 items-center cursor-pointer">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <SlBag />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Giỏ hàng</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SheetTrigger>
        </div>
      </div>

      {account ? (
        <SheetContent className="h-full flex flex-col justify-between">
          <Cart />
        </SheetContent>
      ) : (
        <div>
          <SheetContent className="h-full">
            <CartNotLogin />
          </SheetContent>
        </div>
      )}
    </Sheet>
  );
}
