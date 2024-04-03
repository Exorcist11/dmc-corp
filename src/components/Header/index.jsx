import { SlUser, SlBag, SlMagnifier } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Sheet>
      <div className="h-20 flex justify-between items-center px-10 border-b-[1px] border-gray-300 flex-shrink-0  fixed top-0 z-30 left-0 right-0 bg-white">
        <NavigationMenu>
          <NavigationMenuList className="flex uppercase gap-7 list-none w-full">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="cursor-pointer uppercase text-base ">
                Nam Giới
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <HoverCard>
                  <HoverCardTrigger>Nam</HoverCardTrigger>
                  <HoverCardContent className="w-28 h-11">abc</HoverCardContent>
                </HoverCard>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="cursor-pointer uppercase text-base">
                Nữ giới
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-full">
                ád
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="cursor-pointer uppercase text-base">
                Về chúng tôi
              </NavigationMenuTrigger>
              <NavigationMenuContent>aaa</NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="text-xl">DMC-Corp</div>

        <div className="flex gap-7 uppercase">
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

          <div className="flex gap-2 items-center cursor-pointer">
            <h1>Tìm kiếm </h1>
            <SlMagnifier />
          </div>
        </div>
      </div>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Giỏ hàng</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div>Content</div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
