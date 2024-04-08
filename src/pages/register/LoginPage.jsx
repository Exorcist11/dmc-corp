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
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    let errs = [];

    if (!account?.username) {
      errs.push("Tài khoản không được để trống!");
    } else if (!account?.password) {
      errs.push("Mật khẩu không được để trống!");
    }

    await axios
      .post("http://127.0.0.1:9999/login", account)
      .then((res) => {
        localStorage.setItem("user_id", res?.data.info.account_id);
        localStorage.setItem("user_name", res?.data.info.username);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    setErrors(errs);
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
        {errors?.map((error) => (
          <Alert variant="destructive" key={error}>
            <SlBan />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
}
