import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { SlCalender, SlCheck } from "react-icons/sl";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";

export default function UserPage() {
  useEffect(() => {
    document.title = "Thông tin cá nhân";
  });
  const { toast } = useToast();
  const account = JSON.parse(localStorage.getItem("account"));

  const [date, setDate] = useState("");
  const [data, setData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
  });
  const handleInput = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const getInfomation = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:9999/settings/${account.account_id}`
        );
        setData(response.data.infor);
      } catch (error) {
     
        console.log(error);
      }
    };
    getInfomation();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .patch(
        `http://127.0.0.1:9999/settings/${account.account_id}`,
        data
      )
      .then(() =>
        toast({
          action: (
            <div className="w-full flex items-center gap-3">
              <SlCheck /> <span>Cập nhật thông tin thành công!</span>
            </div>
          ),
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-semibold text-xl">Thông tin cá nhân</h1>

      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">Tài khoản</h1>
        <Input
          className=""
          readOnly={true}
          value={account.username}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">Họ tên</h1>
        <Input
          className=""
          onChange={handleInput}
          name="full_name"
          value={data?.full_name}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">Số điện thoại</h1>
        <Input
          className=""
          onChange={handleInput}
          name="phone_number"
          defaultValue={data?.phone_number}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">Email</h1>
        <Input
          className=""
          onChange={handleInput}
          name="email"
          defaultValue={data?.email}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">Ngày sinh</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "gap-3 justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <SlCalender />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button className="" onClick={handleSubmit}>
        Lưu thay đổi
      </Button>
    </div>
  );
}
