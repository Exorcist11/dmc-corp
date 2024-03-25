import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  useEffect(() => {
    document.title = "Tài khoản";
  });
  const navigate = useNavigate()
  return (
    <div className="m-10 flex flex-col items-center gap-3">
      <h1>Đăng nhập</h1>
      <div className="flex flex-col gap-5 w-2/5 items-center">
        <Input placeholder="Tên đăng nhập" type="Text" />
        <Input placeholder="Mật khẩu" type="Text" />
        <h1 className="text-sm underline hover:font-medium cursor-pointer" onClick={() => navigate('/forget')}>
          Quên mật khẩu?
        </h1>
        <Button variant="secondary" className="hover:bg-slate-300 w-full">
          Đăng nhập
        </Button>
        <h1 className="text-sm underline hover:font-medium cursor-pointer" onClick={() => navigate('/register')}>
          Tạo tài khoản
        </h1>
        <h1 className="text-sm underline hover:font-medium cursor-pointer" onClick={() => navigate('/')}>
          Quay lại cửa hàng
        </h1>
      </div>
    </div>
  );
}
