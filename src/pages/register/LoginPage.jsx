import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SlBan } from "react-icons/sl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";

export default function LoginPage() {
  useEffect(() => {
    document.title = "Tài khoản";
  });
  const navigate = useNavigate();

  const [account, setAccount] = useState();
  const [errors, setErrors] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (account?.username && account?.password) {
        const response = await axios.post(
          "http://127.0.0.1:9999/login",
          account
        );
        if (response.data.status === 200) {
          localStorage.setItem("account", JSON.stringify(response?.data.info));
          const account = JSON.parse(localStorage.getItem("account"));
          if (account.role_id === "R1") {
            navigate("/");
          } else {
            navigate("/dashboard");
          }
        } else {
          setErrors(response.data.message);
        }
      } else {
        setErrors("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      }
    } catch (error) {
      if (error.request.status === 401) {
        setErrors("Sai mật khẩu!");
      } else if (error.request.status === 404) {
        setErrors("Tài khoản không tồn tại!");
      } else {
        setErrors("Lỗi kêt nối!");
      }
    }
  };

  return (
    <div className="m-10 flex flex-col items-center gap-3">
      <h1>Đăng nhập</h1>
      <div className="flex flex-col gap-5 w-2/5 items-center">
        <Input
          placeholder="Tên đăng nhập"
          type="Text"
          name="username"
          onChange={handleChange}
        />
        <Input
          placeholder="Mật khẩu"
          type="Password"
          name="password"
          onChange={handleChange}
        />
        <h1
          className="text-sm underline hover:font-medium cursor-pointer"
          onClick={() => navigate("/forget")}
        >
          Quên mật khẩu?
        </h1>
        <Button
          variant="secondary"
          className="hover:bg-slate-300 w-full"
          onClick={handleSubmit}
        >
          Đăng nhập
        </Button>
        <h1
          className="text-sm underline hover:font-medium cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Tạo tài khoản
        </h1>
        <h1
          className="text-sm underline hover:font-medium cursor-pointer"
          onClick={() => navigate("/")}
        >
          Quay lại cửa hàng
        </h1>
        {errors ? (
          <Alert variant="destructive" key={errors}>
            <SlBan />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errors}</AlertDescription>
          </Alert>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
