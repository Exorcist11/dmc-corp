import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { SlCalender } from "react-icons/sl";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

export default function UserPage() {
  useEffect(() => {
    document.title = "Thông tin cá nhân";
  });
  const [date, setDate] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-semibold text-xl">Thông tin cá nhân</h1>

      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">Tài khoản</h1>
        <Input className="bg-[#edf1f5]" disabled value={"aaa"} />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">Họ tên</h1>
        <Input className="" />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">Số điện thoại</h1>
        <Input className="" />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">Email</h1>
        <Input className="" />
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

      <Button className="h-12">Lưu thay đổi</Button>
    </div>
  );
}
