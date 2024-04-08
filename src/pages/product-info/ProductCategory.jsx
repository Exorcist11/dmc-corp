import { BsPlusLg } from "react-icons/bs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlEqualizer, SlShuffle } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ProductCategory() {
  return (
    <div className="flex flex-col">
      <img
        src="https://1minutesaigon.com/wp-content/uploads/2022/04/BABY-g-1.png"
        alt=""
        className="w-full h-[360px] object-cover object-center"
      />
      <div className="grid grid-cols-5 px-10">
        <div className="col-span-1 border-r flex flex-col gap-3 py-5">
          <h1 className="uppercase font-semibold text-xl">Danh mục</h1>
          <div className="uppercase flex flex-col gap-3 text-sm px-5">
            <div className="flex justify-between items-center cursor-pointer ">
              <h1 className="">Casio</h1>
              <BsPlusLg color="#656c77" size={17} />
            </div>
            <div className="flex justify-between items-center cursor-pointer ">
              <h1 className="">Casio</h1>
              <BsPlusLg color="#656c77" size={17} />
            </div>
            <div className="flex justify-between items-center cursor-pointer ">
              <h1 className="">Casio</h1>
              <BsPlusLg color="#656c77" size={17} />
            </div>
            <div className="flex justify-between items-center cursor-pointer ">
              <h1 className="">Casio</h1>
              <BsPlusLg color="#656c77" size={17} />
            </div>
          </div>
        </div>

        <div className="p-5 col-span-4 flex flex-col gap-3">
          <div className="w-full">
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

          <div className="flex items-center justify-between text-[#88898d] text-sm">
            <div className="flex items-center gap-3">
              <div className="flex gap-3 items-center hover:underline cursor-pointer">
                <SlEqualizer size={14} />
                Filter
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex gap-3 items-center hover:underline cursor-pointer">
                    <SlShuffle size={14} />
                    Sắp xếp
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h1>11 sản phẩm</h1>
          </div>

          <div className="grid grid-cols-4 gap-2 justify-center">
            <div className="flex flex-col gap-2">
              <img
                src="https://curnonwatch.com/wp-content/uploads/2024/02/1_Brown4.876543.png"
                alt=""
                className="object-cover object-center h-[360px]"
              />
              <h1 className="font-semibold">Range</h1>
              <h1 className="">1.888.888 VND</h1>
            </div>
            <div className="flex flex-col gap-2">
              <img
                src="https://curnonwatch.com/wp-content/uploads/2024/02/1_Brown4.876543.png"
                alt=""
                className="object-cover object-center h-[360px]"
              />
              <h1 className="font-semibold">Range</h1>
              <h1 className="">1.888.888 VND</h1>
            </div>
            <div className="flex flex-col gap-2">
              <img
                src="https://curnonwatch.com/wp-content/uploads/2024/02/1_Brown4.876543.png"
                alt=""
                className="object-cover object-center h-[360px]"
              />
              <h1 className="font-semibold">Range</h1>
              <h1 className="">1.888.888 VND</h1>
            </div>
            <div className="flex flex-col gap-2">
              <img
                src="https://curnonwatch.com/wp-content/uploads/2024/02/1_Brown4.876543.png"
                alt=""
                className="object-cover object-center h-[360px]"
              />
              <h1 className="font-semibold text-sm">Range</h1>
              <h1 className="text-sm">1.888.888 VND</h1>
            </div>

            <div className="flex flex-col gap-2">
              <img
                src="https://curnonwatch.com/wp-content/uploads/2024/02/1_Brown4.876543.png"
                alt=""
                className="object-cover object-center h-[360px]"
              />
              <h1 className="font-semibold text-sm">Range</h1>
              <h1 className="text-sm">1.888.888 VND</h1>
            </div>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}