import { SlUser, SlBag, SlMagnifier } from "react-icons/sl";

import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

import Cart from "../Cart/Cart";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <Sheet>
      <div className="h-20 flex justify-between items-center px-10 border-b-[1px] border-gray-300 flex-shrink-0 fixed top-0 z-30 left-0 right-0 bg-white w-screen">
        <div>
          <div className="flex uppercase gap-7 list-none w-full">
            <HoverCard>
              <HoverCardTrigger>
                <div className="cursor-pointer uppercase text-base hover:font-semibold">
                  Trang sức
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col gap-3 w-screen mt-5">
                <div
                  className="hover:bg-slate-300 cursor-pointer border-b py-3 px-2"
                  onClick={() => navigate("/product/nhan")}
                >
                  Nhẫn
                </div>
                <div
                  className="hover:bg-slate-300 cursor-pointer border-b py-3 px-2"
                  onClick={() => navigate("/product/day-chuyen")}
                >
                  Dây chuyền
                </div>
                <div
                  className="hover:bg-slate-300 cursor-pointer border-b py-3 px-2"
                  onClick={() => navigate("/product/vong-tay")}
                >
                  Vòng tay
                </div>
              </HoverCardContent>
            </HoverCard>

            <div
              className="cursor-pointer uppercase text-base hover:font-semibold"
              onClick={() => navigate("/product/dong-ho")}
            >
              Đồng hồ
            </div>

            <div className="cursor-pointer uppercase text-base hover:font-semibold">
              Về chúng tôi
            </div>
          </div>
        </div>

        <div className="text-xl cursor-pointer" onClick={() => navigate("/")}>
          DMC-Corp
        </div>

        <div className="flex gap-7 uppercase">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {/* <div className="flex gap-2 items-center cursor-pointer">
                <Input
                  icon={<SlMagnifier />}
                  placeholder="Tìm kiếm sản phẩm"
                  className="rounded-full"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setIsDropdownOpen(!!e.target.value);
                  }}
                />
              </div> */}
              <div className="flex gap-2 items-center cursor-pointer">
                <h1>Tìm kiếm </h1>
                <SlMagnifier />
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
              localStorage.getItem("user_name")
                ? navigate(`/account`)
                : navigate("/login")
            }
          >
            {!localStorage.getItem("user_name") ? (
              <h1>Đăng nhập</h1>
            ) : (
              <h1>Tài khoản</h1>
            )}
            <SlUser />
          </div>

          <SheetTrigger className="flex gap-2 items-center cursor-pointer">
            <h1>Giỏ hàng</h1>
            <SlBag />
          </SheetTrigger>
        </div>
      </div>

      <SheetContent className="h-full flex flex-col justify-between">
        <Cart />
      </SheetContent>
    </Sheet>
  );
}
