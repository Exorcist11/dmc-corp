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

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({
    account_id: "",
    cart_id: "",
    cart_total: 0,
    create_at: "",
    update_at: "",
    product: [],
  });
  const account = JSON.parse(localStorage.getItem("account"));

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
  }, [account.account_id]);

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

  return (
    <div className="h-full flex flex-col justify-between">
      {cart.product.length < 1 ? (
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
                  <h1>
                    {parseInt(cart.cart_total).toLocaleString("vi-VN")} VND
                  </h1>
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
