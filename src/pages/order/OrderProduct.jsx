import axios from "axios";
import { useEffect, useState } from "react";
import {
  CiLocationOn,
  CiDollar,
  CiCreditCard2,
  CiCircleRemove,
} from "react-icons/ci";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import { IoIosRemove, IoIosAdd } from "react-icons/io";
import {
  LiaShippingFastSolid,
  LiaAngleDoubleRightSolid,
} from "react-icons/lia";
import { PiShieldCheckLight } from "react-icons/pi";
import { MdCurrencyExchange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaAmazonPay } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BsPlusLg } from "react-icons/bs";

export default function OrderProduct() {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    address_id: "",
    district: "",
    full_name: "",
    note: "",
    phone_number: "",
    province: "",
    ward: "",
  });
  const account = JSON.parse(localStorage.getItem("account"));
  const [lstAddress, setLstAddress] = useState([]);
  const [payment, setPayment] = useState("cash");

  const [cart, setCart] = useState("");

  useEffect(() => {
    document.title = "Thanh toán giỏ hàng";
  });

  useEffect(() => {
    const listAddress = async () => {
      if (account) {
        await axios
          .get(`http://127.0.0.1:9999/default_address/${account.account_id}`)
          .then((res) => setAddress(res.data.list_address[0]))
          .catch((err) => console.log(err));
      }
    };
    listAddress();
  }, []);

  useEffect(() => {
    const getCart = async () => {
      if (account) {
        await axios
          .get(`http://127.0.0.1:9999/settings_cart/${account.account_id}`)
          .then((res) => setCart(res.data))
          .catch((err) => console.log(err));
      } else {
        console.log("Chưa đăng nhập");
      }
    };
    getCart();
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      await axios
        .get(`http://127.0.0.1:9999/address/${account.account_id}`)
        .then((res) => setLstAddress(res.data.list_address))
        .catch((err) => console.log(err));
    };
    getAddress();
  }, []);

  const handleRemove = async (product_id, cart_id) => {
    try {
      await axios.patch("http://127.0.0.1:9999/remove_product", {
        product_id,
        cart_id,
      });
      setCart((prevCart) => {
        const updatedProductList = prevCart.product
          .map((item) => {
            if (item.product_id === product_id) {
              const updatedAmount = item.amount - 1;

              if (updatedAmount === 0) {
                return null;
              }

              return { ...item, amount: updatedAmount };
            }
            return item;
          })
          .filter((item) => item !== null);

        const updatedCartTotal = updatedProductList.reduce(
          (total, item) => total + item.price * item.amount,
          0
        );

        const updatedCart = {
          ...prevCart,
          product: updatedProductList,
          cart_total: updatedCartTotal,
        };

        return updatedCart;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (product_id, cart_id) => {
    await axios
      .post("http://127.0.0.1:9999/remove_product", {
        product_id,
        cart_id,
      })
      .then(() => {
        setCart((prevCart) => {
          const productRemove = prevCart.product.filter(
            (item) => item.product_id !== product_id
          );
          const cartTotal = productRemove.reduce(
            (total, item) => total + item.price * item.amount,
            0
          );
          return {
            ...prevCart,
            product: productRemove,
            cart_total: cartTotal,
          };
        });
      });
  };

  function generateCustomId(prefix) {
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomChars = "";
    for (let i = 0; i < 6; i++) {
      randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `${prefix}-${timestamp}-${randomChars}`;
  }

  const handleAdd = async (product_id, account_id) => {
    await axios
      .post("http://127.0.0.1:9999/add_to_cart", { product_id, account_id })
      .then(() => {
        setCart((prevCart) => {
          const newProductList = prevCart.product.map((item) => {
            if (item.product_id === product_id) {
              return { ...item, amount: item.amount + 1 };
            }
            return item;
          });

          const newCartTotal = newProductList.reduce(
            (total, item) => total + item.price * item.amount,
            0
          );

          return {
            ...prevCart,
            product: newProductList,
            cart_total: newCartTotal,
          };
        });
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    if (payment === "vn-pay") {
      const order_id = generateCustomId("ORDER");
      await axios
        .post("http://127.0.0.1:9999/create_payment", {
          bank_code: "",
          total: cart.cart_total,
          cart_id: cart?.cart_id,
          account_id: cart?.account_id,
          address_id: address?.address_id,
          order_id: order_id,
        })
        .then((response) => {
          window.location.href = response.data.payment_url;
          axios
            .post("http://127.0.0.1:9999/checkout_cart", {
              cart_id: cart?.cart_id,
              account_id: cart?.account_id,
              address_id: address?.address_id,
              payment: "vn-pay",
              order_id: order_id,
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => {
          console.error("There was an error creating the payment!", error);
        });
    } else {
      await axios
        .post("http://127.0.0.1:9999/checkout_cart", {
          cart_id: cart?.cart_id,
          account_id: cart?.account_id,
          address_id: address?.address_id,
          payment: payment,
        })
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="flex items-center w-full h-full">
      <div className="h-full w-3/5 border-r py-3 px-5 flex flex-col gap-2">
        <h1 className="font-semibold uppercase text-xl">
          Thông tin thanh toán
        </h1>
        <div className="flex items-center gap-3 text-sm">
          <CiLocationOn />
          <h1>Địa chỉ nhận hàng</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="border-[1px] px-4 py-2 rounded-lg text-sm flex flex-col gap-1 w-3/4">
            <div className="flex justify-between">
              <h1>
                {address?.full_name} | {address?.phone_number}
              </h1>
            </div>
            <div>{address?.note}</div>
            <div>
              {address?.ward} - {address?.district} - {address?.province}
            </div>
          </div>
          <div className="cursor-pointer">
            <Dialog>
              <DialogTrigger>
                <LiaAngleDoubleRightSolid size={40} />
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <RadioGroup
                  className="w-full"
                  defaultValue={lstAddress[0]?.address_id}
                >
                  {lstAddress?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 w-full">
                      <RadioGroupItem
                        value={item?.address_id}
                        id={item?.address_id}
                        onClick={() => {
                          setAddress({
                            address_id: item?.address_id,
                            district: item?.district,
                            full_name: item?.full_name,
                            note: item?.note,
                            phone_number: item?.phone_number,
                            province: item?.province,
                            ward: item?.ward,
                          });
                        }}
                      />
                      <div className="border-[1px] px-4 py-2 rounded-lg text-sm flex flex-col gap-2 w-4/5">
                        <div className="flex justify-between">
                          <h1>
                            {item?.full_name} | {item?.phone_number}
                          </h1>
                        </div>
                        <div>{item?.note}</div>
                        <div>
                          {item?.ward} - {item?.district} - {item?.province}
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex items-center gap-3 text-sm justify-center text-blue-600 cursor-pointer">
                  <BsPlusLg />
                  <h1>Thêm mới địa chỉ</h1>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <h1 className="font-semibold uppercase text-xl">
          Hình thức thanh toán
        </h1>
        <RadioGroup
          defaultValue="cash"
          className="w-full"
          onValueChange={(value) => setPayment(value)}
        >
          <div className="flex items-center space-x-2 ">
            <RadioGroupItem value="cash" id="r1" />
            <div className="flex items-center gap-3 border p-4 rounded-md w-72">
              <CiDollar size={24} />
              <Label htmlFor="r1" className="cursor-pointer">
                Thanh toán khi nhận hàng
              </Label>
            </div>
          </div>

          <div className="flex items-center space-x-2 ">
            <RadioGroupItem value="banking" id="r2" />
            <div className="flex items-center gap-3 border p-4 rounded-md w-72">
              <CiCreditCard2 size={24} />
              <Label htmlFor="r2" className="cursor-pointer">
                Thanh toán chuyển khoản
              </Label>
            </div>
          </div>

          <div className="flex items-center space-x-2 ">
            <RadioGroupItem value="vn-pay" id="r3" />
            <div className="flex items-center gap-3 border p-4 rounded-md w-72">
              <FaAmazonPay size={24} />
              <Label htmlFor="r3" className="cursor-pointer">
                Thanh toán VNPAY
              </Label>
            </div>
          </div>
          <div
            className={`${
              payment === "banking" ? "" : "hidden"
            } flex items-center justify-center gap-5`}
          >
            <img
              src="/public/banking.jpg"
              alt="QR"
              className=" h-96 object-cover object-center"
            />
          </div>
        </RadioGroup>
        <Button
          className="w-full font-semibold text-lg"
          type="submit"
          onClick={() => handleSubmit()}
        >
          Thanh toán
        </Button>
        <div className="text-sm grid grid-cols-3">
          <div className="flex justify-center items-center gap-2">
            <PiShieldCheckLight />
            Bảo hành 10 năm
          </div>
          <div className="flex justify-center items-center gap-2">
            <MdCurrencyExchange />
            Miễn phí đổi trả trong vòng 3 ngày
          </div>
          <div className="flex justify-center items-center gap-2">
            <LiaShippingFastSolid />
            FREE SHIPPING đơn hàng &gt; 700K
          </div>
        </div>
      </div>

      <div className="w-2/5 h-full py-3 px-5 flex flex-col justify-between">
        <div>
          {cart.product?.map((item, index) => (
            <div className="py-3 w-full flex flex-col gap-3 px-3" key={index}>
              <div className="grid grid-cols-3">
                <div className="col-span-1">
                  <img
                    src={item?.image}
                    alt={item.product_name}
                    className="w-32 h-32 object-cover object-center"
                  />
                </div>

                <div className="col-span-2 flex flex-col justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-medium">
                        {item?.product_name} - {item?.size}
                      </h3>
                      <CiCircleRemove
                        size={20}
                        className="cursor-pointer"
                        onClick={() =>
                          handleDeleteProduct(item.product_id, cart.cart_id)
                        }
                      />
                    </div>
                    <div className="text-xs text-[#807D7C]">
                      {item?.category}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-sm">
                      {parseInt(item?.price).toLocaleString("vi-VN")} VND
                    </h3>
                    <div className="border rounded-lg px-2 py-[2px] flex items-center gap-1">
                      <IoIosRemove
                        size={20}
                        className="cursor-pointer"
                        onClick={() =>
                          handleRemove(item.product_id, cart.cart_id)
                        }
                      />
                      <input
                        type="number"
                        className="focus:outline-none text-right w-10  font-semibold hover:text-black focus:text-black  md:text-basecursor-default flex items-center outline-none"
                        name="custom-input-number"
                        value={item.amount}
                        min="0"
                        max={"100"}
                        readOnly={true}
                      ></input>
                      <IoIosAdd
                        size={20}
                        color={
                          item.total === item.total_product ? "" : "#807D7C"
                        }
                        className={`cursor-pointer`}
                        onClick={() =>
                          handleAdd(item.product_id, cart.account_id)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 border-t pt-3">
            <div className="w-full text-sm">
              <div className="flex items-center justify-between">
                <h1>Tạm tính</h1>
                <h1>{parseInt(cart.cart_total).toLocaleString("vi-VN")} VND</h1>
              </div>
            </div>

            <div className="w-full text-sm">
              <div className="flex items-center justify-between">
                <h1>Giao hàng</h1>
                <h1>
                  {cart.cart_total > 700000
                    ? "Giao hàng miễn phí"
                    : `30.000 VND`}
                </h1>
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between font-medium">
                <h1>Tổng</h1>
                <h1>
                  {cart.cart_total > 700000
                    ? parseInt(cart.cart_total).toLocaleString("vi-VN")
                    : `${parseInt(cart.cart_total + 30000).toLocaleString(
                        "vi-VN"
                      )}`}{" "}
                  VND
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
