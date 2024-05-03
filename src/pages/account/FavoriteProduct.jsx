import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FavoriteProduct() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get(
          `http://127.0.0.1:9999/get_wish_list/${localStorage.getItem(
            "user_id"
          )}`
        )
        .then((res) => setProduct(res.data.record))
        .catch((err) => console.log(err));
    };
    getProduct();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <h1>Danh sách sản phẩm yêu thích</h1>
      <div className="grid grid-cols-5 gap-2 text-sm mt-3">
        {product?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => navigate(`/${item?.path_product}`)}
          >
            <img
              src={item?.image}
              className="w-40 h-40 object-cover object-center"
            />
            <h1 className="font-semibold">{item?.product_name}</h1>
            <h1>{parseInt(item?.price).toLocaleString("vi-VN")} VND</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
