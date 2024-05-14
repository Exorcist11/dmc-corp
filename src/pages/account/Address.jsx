import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
  const [wardID, setWardID] = useState("");
  const [address, setAddress] = useState([]);
  const [input, setInput] = useState();
  const [infoAddress, setInfoAddress] = useState([]);
  const rowPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowPerPage);
  const account = JSON.parse(localStorage.getItem("account"));
  const getProvince = async () => {
    await axios
      .get("http://127.0.0.1:9999/provinces")
      .then((res) => setProvince(res.data.provinces))
      .catch((err) => console.log(err));
  };

  const getAddress = async () => {
    if (account) {
      await axios
        .get(`http://127.0.0.1:9999/address/${account.account_id}`)
        .then((res) => setAddress(res.data.list_address))
        .catch((err) => console.log(err));
    }
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
    if (account.account_id) {
      getAddress();
    }
  }, [account.account_id]);

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

  const handleClick = async () => {
    await axios
      .post(
        `http://127.0.0.1:9999/address/${account.account_id}`,
        {
          full_name: input.full_name,
          phone_number: input.phone_number,
          province: provinceID,
          district: districtID,
          ward: wardID,
          note: input.note,
        }
      )
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  const handleGetAddress = async (address_id) => {
    if (address_id) {
      await axios
        .get(`http://127.0.0.1:9999/settings_address/${address_id}`)
        .then((res) => setInfoAddress(res.data.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    handleGetAddress();
  }, []);

  const handleDelete = async (address_id) => {
    await axios
      .delete(`http://127.0.0.1:9999/settings_address/${address_id}`)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-3 justify-between h-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Sổ địa chỉ</h1>
        {address?.length > 0 ? (
          address?.slice(startIndex, endIndex).map((item, index) => (
            <div
              className="border-[1px] p-4 rounded-lg text-sm flex flex-col gap-2"
              key={index}
            >
              <div className="flex justify-between">
                <h1>
                  {item?.full_name} | {item?.phone_number}
                </h1>
                <Dialog>
                  <div>
                    <DialogTrigger>
                      <label
                        htmlFor="edit"
                        className="hover:font-semibold hover:underline cursor-pointer"
                        onClick={() => handleGetAddress(item?.address_id)}
                      >
                        Cập nhật
                      </label>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className="">Cập nhật địa chỉ</DialogTitle>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-4  ">
                          <div className="gap-2 flex flex-col">
                            <Label htmlFor="name" className="text-left">
                              Họ tên
                            </Label>
                            <Input
                              id="full_name"
                              name="full_name"
                              placeholder="Nhập họ và tên"
                              className=""
                              value={infoAddress?.full_name}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="gap-2 flex flex-col">
                            <Label htmlFor="name" className="text-left">
                              Số điện thoại
                            </Label>
                            <Input
                              id="phone_number"
                              name="phone_number"
                              placeholder="Số điện thoại"
                              onChange={handleChange}
                              className=""
                              value={infoAddress?.phone_number}
                            />
                          </div>

                          <Select
                            onValueChange={(value) => setProvinceID(value)}
                          >
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

                          <Select
                            onValueChange={(value) => setDistrictID(value)}
                          >
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

                        <Select onValueChange={(value) => setWardID(value)}>
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
                            id="note"
                            name="note"
                            placeholder="Toà nhà, số nhà, tên đường"
                            className=""
                            onChange={handleChange}
                            value={infoAddress?.note}
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button onClick={handleClick}>Lưu địa chỉ</Button>
                      </DialogFooter>
                    </DialogContent>{" "}
                    |{" "}
                    <label
                      htmlFor="delete"
                      className="hover:font-semibold hover:underline cursor-pointer"
                      onClick={() => handleDelete(item?.address_id)}
                    >
                      Xoá
                    </label>
                  </div>
                </Dialog>
              </div>
              <div>{item?.note}</div>
              <div>
                {item?.ward} - {item?.district} - {item?.province}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">Không có địa chỉ nào.</div>
        )}
      </div>
      <Dialog>
        <div className="flex flex-col gap-3">
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
            Thêm địa chỉ
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
                    name="full_name"
                    placeholder="Nhập họ và tên"
                    className=""
                    onChange={handleChange}
                  />
                </div>

                <div className="gap-2 flex flex-col">
                  <Label htmlFor="name" className="text-left">
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    placeholder="Số điện thoại"
                    onChange={handleChange}
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

              <Select onValueChange={(value) => setWardID(value)}>
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
                  id="note"
                  name="note"
                  placeholder="Toà nhà, số nhà, tên đường"
                  className=""
                  onChange={handleChange}
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleClick}>Lưu địa chỉ</Button>
            </DialogFooter>
          </DialogContent>

          <Pagination>
            <PaginationContent>
              <PaginationItem className="cursor-pointer">
                <PaginationPrevious
                  className={
                    startIndex === 0
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                  onClick={() => {
                    setStartIndex(startIndex - rowPerPage);
                    setEndIndex(endIndex - rowPerPage);
                  }}
                />
              </PaginationItem>

              <PaginationItem className="cursor-pointer">
                <PaginationNext
                  className={
                    endIndex > address?.length
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                  onClick={() => {
                    setStartIndex(startIndex + rowPerPage);
                    setEndIndex(endIndex + rowPerPage);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Dialog>
    </div>
  );
}
