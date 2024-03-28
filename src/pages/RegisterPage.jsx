import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SlBan } from "react-icons/sl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";

export default function RegisterPage() {
  useEffect(() => {
    document.title = "Tạo tài khoản";
  });

  let [err, setErr] = useState([]);
  const navigate = useNavigate();
  const [account, setAccount] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
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
    } else if (account?.password !== account?.re_password) {
      errs.push("Không trùng mật khẩu!");
    } else {
      await axios
        .post("http://127.0.0.1:9999/register", account)
        .then(() => navigate("/"))
        .catch((error) => errs.push(error?.response.data.message));
    }

    setErr(errs);
  };

  return (
    <div>
      <div className="m-10 flex flex-col items-center gap-3">
        <h1>Tạo tài khoản</h1>
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
          <Input
            placeholder="Xác nhận mật khẩu"
            type="Password"
            name="re_password"
            onChange={handleChange}
          />

          <Button
            variant="secondary"
            className="hover:bg-slate-300 w-full"
            onClick={handleSubmit}
          >
            Tạo tài khoản
          </Button>

          <h1
            className="text-sm underline hover:font-medium cursor-pointer"
            onClick={() => navigate("/")}
          >
            Quay lại cửa hàng
          </h1>

          {err?.map((error) => (
            <Alert variant="destructive" key={error}>
              <SlBan />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
}
