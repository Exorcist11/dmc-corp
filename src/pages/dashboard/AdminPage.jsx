import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AdminPage() {
  useEffect(() => {
    document.title = "Trang quản lý";
  });
  return (
    <div>
      {" "}
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right col-span-1">
            Name
          </Label>
          <Input id="name" value="" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" value="" className="col-span-3" />
        </div>
      </div>
    </div>
  );
}
