import {
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartNotLogin() {
  const navigate = useNavigate();
  let defaultCart = [];

  const [cart, setCart] = useState([]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  useEffect(() => {
    const storageCart = JSON.parse(localStorage.getItem("cart"));
    if (storageCart) {
      setCart(storageCart);
    }
  }, []);

  const handleDeleteProduct = (product_id) => {
    let storageCart = JSON.parse(localStorage.getItem("cart"));
    if (storageCart) {
      const updatedCart = storageCart.filter(
        (item) => item.product.product_id !== product_id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const handleRemove = async (product_id) => {
    let storageCart = JSON.parse(localStorage.getItem("cart"));
    if (storageCart) {
      const updatedCart = storageCart
        .map((item) => {
          if (item.product.product_id === product_id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const handleAdd = async (product_id) => {
    let storage = localStorage.getItem("cart");
    if (storage) {
      defaultCart = JSON.parse(storage);
    }

    let item = defaultCart.find((c) => c.product.product_id === product_id);
    if (item) {
      item.quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(defaultCart));
    setCart(defaultCart);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {cart.length < 1 ? (
        <div className="h-full">
          <SheetHeader className="border-b py-4">
            <SheetTitle className="uppercase">Giỏ hàng</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col items-center justify-center ">
            <img src="/public/cart-empty.png" alt="cart-empty" />
            <h1>Giỏ hàng trống</h1>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col justify-between">
          <div className="overflow-auto hover:overflow-auto">
            <SheetHeader className="border-b py-4">
              <SheetTitle className="uppercase">Giỏ hàng</SheetTitle>
            </SheetHeader>

            {cart.map((item, index) => (
              <div className="py-3 w-full flex flex-col gap-3 px-3" key={index}>
                <div className="grid grid-cols-3">
                  <div className="col-span-1">
                    <img
                      src={item?.product.images[0]}
                      alt={item.product.product_name}
                      className="w-32 h-32 object-cover object-center"
                    />
                  </div>

                  <div className="col-span-2 flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="font-medium">
                          {item?.product.product_name} - {item?.product.size}
                        </h3>
                        <CiCircleRemove
                          size={20}
                          className="cursor-pointer"
                          onClick={() =>
                            handleDeleteProduct(item.product.product_id)
                          }
                        />
                      </div>
                      <div className="text-xs text-[#807D7C]">
                        {item?.product.category}
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-sm">
                        {parseInt(item?.product.price).toLocaleString("vi-VN")}{" "}
                        VND
                      </h3>
                      <div className="border rounded-lg px-2 py-[2px] flex items-center gap-1">
                        <IoIosRemove
                          size={20}
                          className="cursor-pointer"
                          onClick={() => handleRemove(item.product.product_id)}
                        />
                        <input
                          type="number"
                          className="focus:outline-none text-right w-10  font-semibold hover:text-black focus:text-black  md:text-basecursor-default flex items-center outline-none"
                          name="custom-input-number"
                          value={item.quantity}
                          min="0"
                          max={"100"}
                          readOnly={true}
                        ></input>
                        <IoIosAdd
                          size={20}
                          // color={
                          //   item.total === item.total_product ? "" : "#807D7C"
                          // }
                          className={`cursor-pointer`}
                          onClick={() => handleAdd(item.product.product_id)}
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
                  <h1>
                    {parseInt(calculateTotal()).toLocaleString("vi-VN")} VND
                  </h1>
                </div>
              </div>

              <div className="w-full text-sm">
                <div className="flex items-center justify-between">
                  <h1>Giao hàng</h1>
                  <h1>
                    {calculateTotal() > 700000
                      ? "Giao hàng miễn phí"
                      : `30.000 VND`}
                  </h1>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center justify-between font-medium">
                  <h1>Tổng</h1>
                  <h1>
                    {calculateTotal() > 700000
                      ? parseInt(calculateTotal()).toLocaleString("vi-VN")
                      : `${parseInt(calculateTotal() + 30000).toLocaleString(
                          "vi-VN"
                        )}`}{" "}
                    VND
                  </h1>
                </div>
              </div>
            </div>

            <SheetFooter className="">
              <SheetClose asChild>
                <Button
                  className="w-full"
                  type="submit"
                  onClick={() => navigate("/order/product")}
                >
                  Thanh toán ngay
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </div>
      )}
    </div>
  );
}
