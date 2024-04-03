import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";


export default function Address() {
  const [province, setProvince] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [provinceID, setProvinceID] = useState("");
  const [districtID, setDistrictID] = useState("");
  const [wards, setWards] = useState([]);
  const getProvince = async () => {
    await axios
      .get("http://127.0.0.1:9999/provinces")
      .then((res) => setProvince(res.data.provinces))
      .catch((err) => console.log(err));
  };
  const getDistrict = async () => {
    if (provinceID) {
      await axios
        .get(`http://127.0.0.1:9999/provinces/${provinceID}`)
        .then((res) => setDistrict(res.data.districts))
        .catch((err) => console.log(err));
    }
  };
  const getWard = async () => {
    if (districtID && provinceID) {
      await axios
        .get(`http://127.0.0.1:9999/provinces/${provinceID}/${districtID}`)
        .then((res) => setWards(res.data.ward))
        .then((err) => console.log(err));
    }
  };
  useEffect(() => {
    document.title = "Sổ địa chỉ";
    getProvince();
  }, []);

  useEffect(() => {
    if (provinceID) {
      getDistrict();
    }
  }, [provinceID]);

  useEffect(() => {
    if (districtID && provinceID) {
      getWard();
    }
  }, [districtID]);

  const handleClick = () => {
    alert('click')
  }
  return (
    <Dialog>
      <div className="flex flex-col gap-3 justify-between h-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Sổ địa chỉ</h1>
          <div className="border-[1px] p-4 rounded-lg text-sm flex flex-col gap-2">
            <div className="flex justify-between">
              <h1>Devil May Cry | 0919934251</h1>
              <div>
                <label
                  htmlFor="Sửa"
                  className="hover:font-semibold hover:underline cursor-pointer"
                >
                  Cập nhật
                </label>{" "}
                |{" "}
                <label
                  htmlFor="Xoá"
                  className="hover:font-semibold hover:underline cursor-pointer"
                >
                  Xoá
                </label>
              </div>
            </div>
            <div>Số nhà 55, Tân Giao</div>
            <div>Thăng Long - Nông Cống - Thanh Hoá</div>
          </div>

          <div className="border-[1px] p-4 rounded-lg text-sm flex flex-col gap-2">
            <div className="flex justify-between">
              <h1>Devil May Cry | 0919934251</h1>
              <div>
                <label
                  htmlFor="Sửa"
                  className="hover:font-semibold hover:underline cursor-pointer"
                >
                  Cập nhật
                </label>{" "}
                |{" "}
                <label
                  htmlFor="Xoá"
                  className="hover:font-semibold hover:underline cursor-pointer"
                >
                  Xoá
                </label>
              </div>
            </div>
            <div>Số nhà 55, Tân Giao</div>
            <div>Thăng Long - Nông Cống - Thanh Hoá</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <DialogTrigger>
            <Button className="w-full">Thêm địa chỉ</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="">Thêm địa chỉ mới</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4  ">
                <div className="gap-2 flex flex-col">
                  <Label htmlFor="name" className="text-left">
                    Họ tên
                  </Label>
                  <Input
                    id="full_name"
                    placeholder="Nhập họ và tên"
                    className=""
                  />
                </div>

                <div className="gap-2 flex flex-col">
                  <Label htmlFor="name" className="text-left">
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone_number"
                    placeholder="Số điện thoại"
                    className=""
                  />
                </div>

                <Select onValueChange={(value) => setProvinceID(value)}>
                  <div className="gap-2 flex flex-col">
                    <Label htmlFor="name" className="text-left">
                      Tỉnh/ Thành phố
                    </Label>
                    <SelectTrigger>
                      <SelectValue placeholder="Tỉnh/ Thành phố" />
                    </SelectTrigger>

                    <SelectContent>
                      {province?.map((item, index) => (
                        <SelectItem value={item?.code} key={index}>
                          {item?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </div>
                </Select>

                <Select onValueChange={(value) => setDistrictID(value)}>
                  <div className="gap-2 flex flex-col">
                    <Label htmlFor="name" className="text-left">
                      Quận/ Huyện
                    </Label>
                    <SelectTrigger>
                      <SelectValue placeholder="Quận/ Huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts?.map((item, index) => (
                        <SelectItem value={item?.code} key={index}>
                          {item?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </div>
                </Select>
              </div>

              <Select>
                <div className=" gap-4 flex flex-col">
                  <Label htmlFor="name" className="text-left">
                    Phường/ Xã
                  </Label>
                  <SelectTrigger>
                    <SelectValue placeholder="Phường/ Xã" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards?.map((item, index) => (
                      <SelectItem value={item?.code} key={index}>
                        {item?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </div>
              </Select>

              <div className=" gap-4 flex flex-col">
                <Label htmlFor="name" className="text-left">
                  Địa chỉ chi tiết
                </Label>
                <Input
                  id="name"
                  placeholder="Toà nhà, số nhà, tên đường"
                  className=""
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleClick}>Lưu địa chỉ</Button>
            </DialogFooter>
          </DialogContent>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
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
    </Dialog>
  );
}
